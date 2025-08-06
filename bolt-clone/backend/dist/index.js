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
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const anthropic = new sdk_1.default();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const msg = yield anthropic.messages.stream({
            // model: "claude-sonnet-4-20250514",
            model: "claude-3-haiku-20240307",
            // model: "claude-3-5-sonnet-20241022",
            max_tokens: 200,
            temperature: 0,
            messages: [{ role: "user", content: "Create a very small landing page having only 3 section and very very little content" }],
        });
        msg.on('text', (text) => {
            console.log(text);
        });
    });
}
main();
