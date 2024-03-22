import fs from "fs";

let jsonString =
  '{"Danger": [{"InfringementKeyword": "quick keywords", "summary": "shorter breakdown and why it matters / why it was flagged as this", "fullClause": "paste full clause here"}, {"InfringementKeyword": "this will be the next clause"}], "Caution": [{"InfringementKeyword": "do the same as in danger"}], "Safe": [{"InfringementKeyword": "do the same as in danger"}], "Other": [{"InfringementKeyword": "do the same as in danger"}]}';

let jsonString2 =
  '{"Danger": [{"InfringementKeyword": "quick keywords", "summary": "shorter breakdown and why it matters / why it was flagged as this", "fullClause": "paste full clause here"}, {"InfringementKeyword": "this will be the next clause"}], "Caution": [{"InfringementKeyword": "do the same as in danger"}], "Safe": [{"InfringementKeyword": "do the same as in danger"}], "Other": [{"InfringementKeyword": "do the same as in danger"}]}';


// Test to see if you can parse all of the strings that are returned from the ai model 
// all have passed for now  
for (let i = 1; i < 13; i++) {
  try {
    let jsonString3 = fs.readFileSync(`splitResponses/linkedin/linkedin_segment_${i}.txt`);
    let jsonObj = JSON.parse(jsonString3);
    console.log(i);
  } catch (e) {
    console.log(`Error processing file ${i}`, e);
  }
}
