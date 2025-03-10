require("dotenv").config(); // Load environment variables

const express = require("express");
require("./firebase"); // Ensure Firebase is initialized
const cors = require("cors");
const { getModels, uploadModel } = require("./routes/model");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const admin = require("firebase-admin");

const { db} = require("./firebase"); // ✅ Import Firebase from firebase.js


const app = express();
app.use(express.json());
app.use(cors());

// Configure Cloudinary using .env variables
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.get("/models", async (req, res) => {
    console.log("Received request to /models");
    try {
        const models = await getModels();
        console.log("Models fetched successfully:", models);
        res.json(models);
    } catch (error) {
        console.error("Error fetching models:", error);
        res.status(500).json({ error: "Failed to fetch models" });
    }
});

app.post("/upload", async (req, res) => {
    console.log("Received request to /upload with body:", req.body);
    try {
        const { name, description, driveLink } = req.body;
        if (!name || !driveLink) {
            console.warn("Missing required fields in request:", req.body);
            return res.status(400).json({ error: "Name and Drive link are required" });
        }

        console.log("Uploading model with:", { name, description, driveLink });
        const result = await uploadModel(name, description, driveLink);
        console.log("Model uploaded successfully:", result);
        res.json(result);
    } catch (error) {
        console.error("Error uploading model:", error);
        res.status(500).json({ error: "Failed to upload model" });
    }
});
// Function to delete model
async function deleteModel(id) {
    try {
        const modelRef = db.collection("models").doc(id);
        const doc = await modelRef.get();

        if (!doc.exists) {
            return null; // Model not found
        }

        await modelRef.delete(); // Delete the document
        return { id };
    } catch (error) {
        console.error("Error deleting model:", error);
        throw error;
    }
}

app.delete("/delete/:id", async (req, res) => {
    console.log("Received request to delete model with ID:", req.params.id);

    try {
        const id = req.params.id;
        const result = await deleteModel(id);

        if (!result) {
            return res.status(404).json({ error: "Model not found" });
        }

        res.json({ message: "Model deleted successfully", id });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete model" });
    }
});




app.post("/upload-file", async (req, res) => {
    try {
        const { fileUrl } = req.body; // Receive Dropbox file URL from request

        if (!fileUrl) {
            return res.status(400).json({ error: "File URL is required" });
        }

        // Upload file to Cloudinary from the given URL
        const result = await cloudinary.uploader.upload(fileUrl, {
            resource_type: "raw"
        });

        res.json({ url: result.secure_url }); // Return Cloudinary link
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Failed to upload file" });
    }
});


module.exports = { deleteModel };

app.listen(5000, () => console.log("Server running on port 5000"));
