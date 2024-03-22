import fs from "fs";
import path from "path";
import "dotenv/config";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI(apiKey);

function readPromptFromFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

const promptFilePath = "prompts/prompt.txt";
const promptText = readPromptFromFile(promptFilePath);

async function callOpenAIWithSplitText(privacyPolicySegment) {
  //combine the prompt with the privacy policy segment
  const combinedText = `${promptText}\n\n${privacyPolicySegment}`;
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: combinedText }],
      model: "gpt-4",
    });
    let categorizedTerms = completion.choices[0].message.content;
    return categorizedTerms;
  } catch (e) {
    console.log("Failed with error", e);
  }
}

export async function processCompanyTerms(companyName) {
  fs.mkdirSync(`splitResponses/${companyName}`); // create output path
  const inputDirectoryPath = `splitTerms/${companyName}/`; // input path for the split terms

  try {
    const splitTerms = fs.readdirSync(inputDirectoryPath);
    for (const file of splitTerms) {
      const filePath = path.join(inputDirectoryPath, file);
      const privacyPolicySegment = fs.readFileSync(filePath, "utf-8");

      try {
        const categorizedTerms = await callOpenAIWithSplitText(privacyPolicySegment);
        fs.writeFileSync(`splitResponses/${companyName}/${file}`, categorizedTerms, "utf-8");
      } catch (error) {
        console.error(`Error processing file: ${file}`, error);
      }
      console.log(`${filePath} COMPLETE`);
    }
  } catch (e) {
    console.error("Error reading directory or file: ", e);
  }
}

// ====== TESTING for single file
// processCompanyTerms("linkedin");
// =========
