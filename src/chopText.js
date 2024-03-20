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
// function splitTextIntoSegments(text, wordsPerSegment = 500, outputDirectory = ".", companyName) {
//   const words = text.split(/\s+/);
//   let segmentIndex = 0;

//   for (let i = 0; i < words.length; i += wordsPerSegment) {
//     const segmentWords = words.slice(i, i + wordsPerSegment);
//     const segmentText = segmentWords.join(" ");
//     writeSegmentToFile(segmentText, segmentIndex, outputDirectory, companyName);
//     segmentIndex++;
//   }
// }

function splitTextIntoSegments(text, wordsPerSegment = 500, outputDirectory = ".", companyName) {
  // common sentence endings that will or will not be split by
  const sentenceEndings = /(?<!\b(?:Mr|Mrs|Ms|Dr|Jr|Sr|vs)\.)(?<!\b\p{L}\.)(?<=\.|\?|!)\s+/gu;
  const sentences = text.split(sentenceEndings);

  let currentSegment = [];
  let currentWordCount = 0;
  let segmentIndex = 0;

  sentences.forEach((sentence) => {
    const wordCount = sentence.split(/\s+/).length;
    if (currentWordCount + wordCount > wordsPerSegment && currentSegment.length > 0) {
      // the current segment is full so write it to file
      const segmentText = currentSegment.join(" ").trim();
      writeSegmentToFile(segmentText, segmentIndex, outputDirectory, companyName);
      segmentIndex++;
      currentSegment = []; // reset for next segment
      currentWordCount = 0;
    }

    // add current sentence to segment
    currentSegment.push(sentence);
    currentWordCount += wordCount;
  });

  // write the last segment if it has content
  if (currentSegment.length > 0) {
    const segmentText = currentSegment.join(" ").trim();
    writeSegmentToFile(segmentText, segmentIndex, outputDirectory, companyName);
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
