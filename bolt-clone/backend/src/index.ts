require("dotenv").config();

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

async function main() {
    const msg = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        temperature: 0,
        messages: [{ role: "user", content: "What is 2 + 2?" }],
      });
    
    console.log(msg);
}

main();