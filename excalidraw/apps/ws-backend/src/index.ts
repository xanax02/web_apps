import WebSocket, { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decode = jwt.verify(token, JWT_SECRET);

    if (typeof decode === "string") {
      return null;
    }

    if (!decode || !decode.userId) {
      return null;
    }

    return decode.userId;
  } catch (e) {
    return null;
  }
}

wss.on("connection", function connection(ws, request) {
  //connection close on error
  ws.on("error", (data) => {
    console.log("error", data);
    ws.close();
  });

  const url = request.url;
  const queryParams = new URLSearchParams(url?.split("?")[1]); // why this
  const token = queryParams.get("token") || "";

  const userId = checkUser(token);

  if (!userId) {
    ws.close();
    return;
  }

  //if user is athenticated than put user in state
  users.push({
    ws,
    rooms: [],
    userId,
  });

  ws.on("message", async function message(data: unknown) {
    // why this unknown
    const parsedData = JSON.parse(data as string);

    //join room
    if (parsedData?.type === "join_room") {
      const user = users.find((u) => u.ws === ws);
      if (!user) return;
      user?.rooms.push(parsedData?.roomId);
    }

    //leave room
    if (parsedData.type === "leave_room") {
      const user = users.find((u) => u.ws === ws);
      if (!user) return;
      user.rooms = user?.rooms?.filter((room) => room !== parsedData?.room);
    }

    //chat
    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.messasge;

      await prismaClient.chat.create({
        data: {
          roomId,
          message,
          userId,
        },
      });

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message,
              roomId,
            })
          );
        }
      });
    }
  });
});
