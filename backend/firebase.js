// const admin = require("firebase-admin");
// const path = require("path");
// const fs = require("fs");

// // Resolve the path to the Firebase config JSON file
// const serviceAccountPath = "./firebaseConfig.json";

// if (!fs.existsSync(serviceAccountPath)) {
//   console.error("❌ Firebase config file not found at:", serviceAccountPath);
//   process.exit(1);
// }

// try {
//   // Read and parse the JSON file
//   const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
//   console.log("✅ Firebase config file loaded successfully!");

//   // Initialize Firebase only if it's not already initialized
//   if (!admin.apps.length) {
//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     });
//     console.log("🎉 Firebase initialized successfully!");
//   }

// } catch (error) {
//   console.error("❌ Error initializing Firebase:", error);
//   process.exit(1);
// }

// // Export the initialized Firebase instance
// const db = admin.firestore();

// module.exports = { admin, db };
const admin = require("firebase-admin");
require("dotenv").config();

if (!process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PROJECT_ID) {
  console.error("❌ Missing Firebase environment variables");
  process.exit(1);
}

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // Fixes new line issues
      }),
    });
    console.log("🎉 Firebase initialized successfully!");
  }
} catch (error) {
  console.error("❌ Error initializing Firebase:", error);
  process.exit(1);
}

const db = admin.firestore();
module.exports = { admin, db };
