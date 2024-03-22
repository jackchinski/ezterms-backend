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

const docRef = db.collection("backend-test").doc("alovelace");

await docRef.set({
  first: "Ada",
  last: "Lovelace",
  born: 1815,
});
