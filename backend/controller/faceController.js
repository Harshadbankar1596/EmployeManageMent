import * as faceapi from 'face-api.js';
import canvas from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Canvas, Image, ImageData, loadImage, createCanvas } = canvas;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const MODEL_PATH = path.join(__dirname, '..', 'models');
const IMAGE_FOLDER = path.join(__dirname, '..', 'public');

let labeledDescriptors = [];
let modelsLoaded = false; // Add flag to prevent reloading models

// Function to resize image for faster processing
function resizeImage(img, maxWidth = 640, maxHeight = 480) {
  const canvas = createCanvas(maxWidth, maxHeight);
  const ctx = canvas.getContext('2d');
  
  const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
  const newWidth = img.width * ratio;
  const newHeight = img.height * ratio;
  
  ctx.drawImage(img, 0, 0, newWidth, newHeight);
  return canvas;
}

async function loadModels() {
  if (modelsLoaded) return; // Skip if already loaded
  
  console.log("Loading models...");
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH);
  modelsLoaded = true;
  console.log("Models loaded successfully");
}

async function prepareLabeledDescriptors() {
  if (labeledDescriptors.length > 0) return; // Skip if already prepared
  
  console.log("Preparing labeled descriptors...");
  const files = fs.readdirSync(IMAGE_FOLDER);
  const descriptors = [];

  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png|gif)$/i)) { // Only process image files
      try {
        const imgPath = path.join(IMAGE_FOLDER, file);
        const img = await loadImage(imgPath);
        
        // Resize image for faster processing
        const resizedImg = resizeImage(img);
        
        const detection = await faceapi.detectSingleFace(resizedImg).withFaceLandmarks().withFaceDescriptor();

        if (detection) {
          descriptors.push({ label: file, descriptor: detection.descriptor });
          console.log(`Processed: ${file}`);
        }
        
        // Clean up memory
        if (global.gc) global.gc();
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    }
  }

  labeledDescriptors = descriptors;
  console.log(`Prepared ${labeledDescriptors.length} descriptors`);
}

export async function matchFace(req, res) {
  try {
    if (!modelsLoaded) {
      await loadModels();
      await prepareLabeledDescriptors();
    }

    const base64 = req.body.image.split(',')[1];
    const buffer = Buffer.from(base64, 'base64');
    const img = await loadImage(buffer);
    
    const resizedImg = resizeImage(img);

    const detection = await faceapi.detectSingleFace(resizedImg).withFaceLandmarks().withFaceDescriptor();
    if (!detection) {
      return res.status(400).json({ success: false, message: "No face detected" });
    }

    const inputDescriptor = detection.descriptor;

    for (const item of labeledDescriptors) {
      const distance = faceapi.euclideanDistance(inputDescriptor, item.descriptor);
      if (distance < 0.6) {
        return res.json({ success: true, match: item.label });
      }

    }

    res.json({ success: false, message: "No match found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
