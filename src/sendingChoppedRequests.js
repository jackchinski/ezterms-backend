import fs from "fs";
import path from "path";
import "dotenv/config";

function readPromptFromFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

const promptFilePath = "prompts/prompt.txt";
const promptText = readPromptFromFile(promptFilePath);

// ** this section to be refined still
let companyName = "linkedin"; // TODO: change for others
fs.mkdirSync(`splitResponses/${companyName}`);
const outputDirectory = `splitResponses/${companyName}`;
const openaiApiKey = process.env.OPENAI_API_KEY;
// ** end here refinement

async function callOpenAIWithSplitText(privacyPolicySegment) {
  // need to combine the prompt with the text that is passed here
  const combinedText = `${promptText}\n\n${privacyPolicySegment}`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: combinedText }],
    model: "gpt-3.5-turbo",
  });
  console.log(completion.data.choices[0].text);
}
