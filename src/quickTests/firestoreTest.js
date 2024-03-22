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

const aTuringRef = db.collection("users").doc("aturing");

await aTuringRef.set({
  first: "Alan",
  middle: "Mathison",
  last: "Turing",
  born: 1912,
});


