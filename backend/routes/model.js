const admin = require("firebase-admin");
const db = admin.firestore();
const modelsCollection = db.collection("models");

// Function to fetch all models
async function getModels() {
    const snapshot = await modelsCollection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Function to upload a model link to Firebase
async function uploadModel(name, description, driveLink) {
    const newModel = {
        name,
        description,
        url: driveLink, // No conversion needed
        uploadDate: new Date()
    };

    await modelsCollection.add(newModel);
    return { message: "Model uploaded successfully", model: newModel };
}

module.exports = { getModels, uploadModel };
