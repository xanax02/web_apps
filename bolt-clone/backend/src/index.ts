require("dotenv").config();
import express from "express";

import Anthropic from "@anthropic-ai/sdk";
// import { MAX_TOKENS } from "./constants";
import { TextBlock } from "@anthropic-ai/sdk/resources/messages";
import { basePrompt as nodeBasePrompt } from "./defaults/node";
import { basePrompt as reactBasePrompt } from "./defaults/react";
import { BASE_PROMPT } from "./prompts";

const anthropic = new Anthropic();
const app = express();
app.use(express.json());

app.post("/template", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt || prompt.trim().length === 0)
      throw new Error("Prompt cant be empty");

    const response = await anthropic.messages.create({
      messages: [{ role: "user", content: prompt }],
      model: "claude-3-haiku-20240307",
      max_tokens: 200,
      system:
        "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra.",
      temperature: 0,
    });

    const appTypeFromLLM = (response.content[0] as TextBlock).text;

    if (appTypeFromLLM === "react") {
      res.json({
        prompts: [BASE_PROMPT, reactBasePrompt],
      });
      return;
    } else if (appTypeFromLLM === "node") {
      res.json({
        prompts: [BASE_PROMPT, nodeBasePrompt],
      });
      return;
    }

    res.status(403).json({ message: "You cant access this" });
    return;
  } catch (error) {
    if (error instanceof Error) res.status(500).json({ error: error.message });
    else res.status(500);
    return;
  }
});

app.listen(3000, () => console.log("server running at port 3000"));

// async function main() {
//     const msg = anthropic.messages.stream({
//         // model: "claude-sonnet-4-20250514",
//         model: "claude-3-haiku-20240307",
//         // model: "claude-3-5-sonnet-20241022",
//         max_tokens: 200,
//         temperature: 0,
//         messages: [{ role: "user", content: "Create a very small landing page having only 3 section and very very little content" }],
//       });

//     msg.on('text', (text) => {
//       console.log(text);
//     })
// }

// main();

// TODO
// system prompt
// user prmopts

// add templates for differnt apps
// for next, vite, node
