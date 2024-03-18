import fs from "fs";
import path from "path";

// read text from file
function readTextFromFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

// save segment as a file
function writeSegmentToFile(segment, index, outputDirectory) {
  const fileName = `segment_${index + 1}.txt`;
  const filePath = path.join(outputDirectory, fileName);
  fs.writeFileSync(filePath, segment, "utf8");
}

// split the text
function splitTextIntoSegments(text, wordsPerSegment = 500, outputDirectory = ".") {
  const words = text.split(/\s+/);
  let segmentIndex = 0;

  for (let i = 0; i < words.length; i += wordsPerSegment) {
    const segmentWords = words.slice(i, i + wordsPerSegment);
    const segmentText = segmentWords.join(" ");
    writeSegmentToFile(segmentText, segmentIndex, outputDirectory);
    segmentIndex++;
  }
}
function runSplitter(companyName) {
  fs.mkdirSync(`splitTerms/${companyName}`);
  const inputFilePath = "sampleTerms/linkedin.txt";
  const outputDirectory = "splitTerms/linkedin/";
  const text = readTextFromFile(inputFilePath);
  splitTextIntoSegments(text, 500, outputDirectory);
}

runSplitter("linkedin");
