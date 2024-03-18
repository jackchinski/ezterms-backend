import "dotenv/config";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("OpenAI API key is not set. Please set the OPENAI_API_KEY environment variable.");
  process.exit(1);
}

const openai = new OpenAI(apiKey);

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Welcome to Ezterms!" }],
    model: "gpt-3.5-turbo",
  });
  console.log(completion.choices[0]);
  console.log("===COMPLETION===");
  console.log(completion);
}

main();
