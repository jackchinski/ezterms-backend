import fs from "fs/promises";
import path from "path";

let combinedObject = {
  Danger: [],
  Caution: [],
  Safety: [],
};

export async function combineJSONObjects(companyName) {
  const directoryPath = `splitResponses/${companyName}/`;

  try {
    const files = await fs.readdir(directoryPath);
    console.log("files", files);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const fileContents = await fs.readFile(filePath, "utf-8");
      const jsonObj = JSON.parse(fileContents);

      for (let category in jsonObj) {
        if (jsonObj.hasOwnProperty(category)) {
          combinedObject[category] = combinedObject[category].concat(jsonObj[category]);
        }
      }
    }

    const combinedJSONString = JSON.stringify(combinedObject, null, 2);
    await fs.writeFile(`combinedResponses/combinedResponse_${companyName}.json`, combinedJSONString, "utf-8");
    console.log(`Combined JSON for ${companyName} written successfully.`);
  } catch (err) {
    console.error("Error processing files:", err);
  }
}

// combineJSONObjects("x");
