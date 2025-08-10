"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const node_1 = require("./defaults/node");
const react_1 = require("./defaults/react");
const prompts_1 = require("./prompts");
const anthropic = new sdk_1.default();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/template", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prompt = req.body.prompt;
        if (!prompt || prompt.trim().length === 0)
            throw new Error("Prompt cant be empty");
        const response = yield anthropic.messages.create({
            messages: [{ role: "user", content: prompt }],
            model: "claude-3-haiku-20240307",
            max_tokens: 200,
            system: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra.",
            temperature: 0,
        });
        const appTypeFromLLM = response.content[0].text;
        if (appTypeFromLLM === "react") {
            res.json({
                prompts: [prompts_1.BASE_PROMPT, react_1.basePrompt],
            });
            return;
        }
        else if (appTypeFromLLM === "node") {
            res.json({
                prompts: [prompts_1.BASE_PROMPT, node_1.basePrompt],
            });
            return;
        }
        res.status(403).json({ message: "You cant access this" });
        return;
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
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
