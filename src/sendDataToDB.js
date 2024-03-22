import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import "dotenv/config";
import fs from "fs";

const serviceAccountJSON = fs.readFileSync("ezterms2-firebase-adminsdk-i6jp7-1a646f4b8c.json");
const serviceAccount = JSON.parse(serviceAccountJSON);

const app = initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(app);

async function sendJSONToFirebase(companyName) {
  try {
    const combinedResponse = JSON.parse(fs.readFileSync(`combinedResponses/combinedResponse_${companyName}.json`));

    const updateDbRef = db.collection("backend-test").doc(companyName);

    await updateDbRef.set({
      Danger: combinedResponse["Danger"],
      Caution: combinedResponse["Caution"],
      Safe: combinedResponse["Safe"],
    });
  } catch (error) {
    console.error("Error sending data to firestore:", error);
  }
}

// test
const companyName = "linkedin";
sendJSONToFirebase(companyName);
