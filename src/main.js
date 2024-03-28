import { runSplitter } from "./chopText.js";
import { processCompanyTerms } from "./sendingChoppedRequests.js";
import { combineJSONObjects } from "./combiningResponses.js";
import { sendJSONToFirebase } from "./sendDataToDB.js";
/**
 * WELCOME TO THE EZTERMS BACKED
 * This will be the main file that is ran that will run through all the steps.
 * =====
 * SETUP:
 * 1) upload the T&C document into the fullTermsAndConditions folder and name it <company name.txt> no spaces
 * =====
 *
 * STEP1: runSplitter from chopText.js
 * STEP2: processCompanyTerms from sendingChippedRequests.js
 * STEP3: combineJSONObjects from combiningResponses.js
 * STEP4: sendJSONToFirebase sendDataToDB.js
 */

// TODO: fill company name as you have named the T&C contract
async function main(companyName) {
  console.log("== STARTING SPLITTER == ");
  await runSplitter(companyName);
  console.log("== STARTING PROCESSING OF TERMS ==");
  await processCompanyTerms(companyName);
  console.log("== COMBINING RESPONSES == ");
  await combineJSONObjects(companyName);
  console.log("== SENDING COMBINED RESPONSE TO DB");
  await sendJSONToFirebase(companyName);
}

main("amazon").then(() => console.log("All processes completed successfully!"));
