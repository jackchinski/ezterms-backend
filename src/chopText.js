import fs from "fs";
import path from "path";

// read text from file
function readTextFromFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

// save segment as a file
function writeSegmentToFile(segment, index, outputDirectory, companyName) {
  const fileName = `${companyName}_segment_${index + 1}.txt`;
  const filePath = path.join(outputDirectory, fileName);
  fs.writeFileSync(filePath, segment, "utf8");
}

// split the text
function splitTextIntoSegments(text, wordsPerSegment = 500, outputDirectory = ".", companyName) {
  const words = text.split(/\s+/);
  let segmentIndex = 0;

  for (let i = 0; i < words.length; i += wordsPerSegment) {
    const segmentWords = words.slice(i, i + wordsPerSegment);
    const segmentText = segmentWords.join(" ");
    writeSegmentToFile(segmentText, segmentIndex, outputDirectory, companyName);
    segmentIndex++;
  }
}

/*
   === BEFORE RUNNING === 
    1. MAKE SURE you pass the company name, and it matches the original .txt file in the folder with all the t&c files
    2. That the directory with the <companyName> directory does NOT exist yet 
    3. input AND output paths are correct, test using sampleText.txt and write like SAMPLEOUTPUT.txt
 */
function runSplitter(companyName) {
  fs.mkdirSync(`splitTerms/${companyName}`);
  const inputFilePath = `sampleTerms/${companyName}.txt`;
  const outputDirectory = `splitTerms/${companyName}/`;
  const text = readTextFromFile(inputFilePath);
  splitTextIntoSegments(text, 500, outputDirectory, companyName);
}

runSplitter("linkedin");
