require("dotenv").config();

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

async function main() {
    const msg = anthropic.messages.stream({
        // model: "claude-sonnet-4-20250514",
        model: "claude-3-haiku-20240307",
        // model: "claude-3-5-sonnet-20241022",
        max_tokens: 200,
        temperature: 0,
        messages: [{ role: "user", content: "Create a very small landing page having only 3 section and very very little content" }],
      });
    
    msg.on('text', (text) => {
      console.log(text);
    })
}

main();


// TODO
// system prompt
// user prmopts

// add templates for differnt apps
  // for next, vite, node