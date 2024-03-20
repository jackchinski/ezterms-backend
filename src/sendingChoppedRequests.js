import fs from "fs";
import path from "path";
import "dotenv/config";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

function readPromptFromFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

const promptFilePath = "prompts/prompt.txt";
const promptText = readPromptFromFile(promptFilePath);

// // ** this section to be refined still
// let companyName = "linkedin"; // TODO: change for others
// fs.mkdirSync(`splitResponses/${companyName}`);
// const outputDirectory = `splitResponses/${companyName}`;
// const openaiApiKey = process.env.OPENAI_API_KEY;
// // ** end here refinement

async function callOpenAIWithSplitText(privacyPolicySegment) {
  const openai = new OpenAI(apiKey);

  //combine the prompt with the privacy policy segment
  const combinedText = `${promptText}\n\n${privacyPolicySegment}`;
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: combinedText }],
      model: "gpt-4",
    });
    console.log(completion.choices[0].message.content);
    let categorizedTerms = completion.choices[0].message.content;
    //TODO: make file to write out all of the completions
    fs.writeFileSync("splitResponses/linkedin/linkedin_segment_4.txt", categorizedTerms, "utf-8");
  } catch (e) {
    console.log("Failed with error", e);
  }
}

// ====== TESTING
const privacyPolicyFirst = fs.readFileSync("splitTerms/linkedin/linkedin_segment_4.txt");
callOpenAIWithSplitText(privacyPolicyFirst);
// =========
