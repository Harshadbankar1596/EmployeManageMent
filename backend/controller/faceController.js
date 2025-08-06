// // import * as faceapi from 'face-api.js';
// // import canvas from 'canvas';
// // import fs from 'fs';
// // import path from 'path';
// // import { fileURLToPath } from 'url';

// // const { Canvas, Image, ImageData, loadImage, createCanvas } = canvas;
// // const __dirname = path.dirname(fileURLToPath(import.meta.url));

// // faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// // const MODEL_PATH = path.join(__dirname, '..', 'models');
// // const IMAGE_FOLDER = path.join(__dirname, '..', 'public');

// // let labeledDescriptors = [];
// // let modelsLoaded = false; 

// // function resizeImage(img, maxWidth = 640, maxHeight = 480) {
// //   const canvas = createCanvas(maxWidth, maxHeight);
// //   const ctx = canvas.getContext('2d');
  
// //   const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
// //   const newWidth = img.width * ratio;
// //   const newHeight = img.height * ratio;
  
// //   ctx.drawImage(img, 0, 0, newWidth, newHeight);
// //   return canvas;
// // }

// // async function loadModels() {
// //   if (modelsLoaded) return; // Skip if already loaded
// //   console.log("Loading models...");
// //   await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH);
// //   await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH);
// //   await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH);
// //   modelsLoaded = true;
// //   console.log("Models loaded successfully");
// // }

// // async function prepareLabeledDescriptors() {
// //   if (labeledDescriptors.length > 0) return; // Skip if already prepared
  
// //   console.log("Preparing labeled descriptors...");
// //   const files = fs.readdirSync(IMAGE_FOLDER);
// //   const descriptors = [];

// //   for (const file of files) {
// //     if (file.match(/\.(jpg|jpeg|png|gif)$/i)) { // Only process image files
// //       try {
// //         const imgPath = path.join(IMAGE_FOLDER, file);
// //         const img = await loadImage(imgPath);
        
// //         const resizedImg = resizeImage(img);
        
// //         const detection = await faceapi.detectSingleFace(resizedImg).withFaceLandmarks().withFaceDescriptor();

// //         if (detection) {
// //           descriptors.push({ label: file, descriptor: detection.descriptor });
// //           console.log(`Processed: ${file}`);
// //         }
        
// //         if (global.gc) global.gc();
// //       } catch (error) {
// //         console.error(`Error processing ${file}:`, error.message);
// //       }
// //     }
// //   }

// //   labeledDescriptors = descriptors;
// //   console.log(`Prepared ${labeledDescriptors.length} descriptors`);
// // }

// // export async function matchFace(req, res) {
// //   try {
// //     if (!modelsLoaded) {
// //       await loadModels();
// //       await prepareLabeledDescriptors();
// //     }

// //     const base64 = req.body.image;
// //     const buffer = Buffer.from(base64, 'base64');
// //     const img = await loadImage(buffer);
     
// //     const resizedImg = resizeImage(img);

// //     const detection = await faceapi.detectSingleFace(resizedImg).withFaceLandmarks().withFaceDescriptor();
// //     if (!detection) {
// //       return res.status(400).json({ success: false, message: "No face detected" });
// //     }

// //     const inputDescriptor = detection.descriptor;

// //     for (const item of labeledDescriptors) {
// //       const distance = faceapi.euclideanDistance(inputDescriptor, item.descriptor);
// //       if (distance < 0.6) {
// //         return res.json({ success: true, match: item.label });
// //       }

// //     }

// //     res.json({ success: false, message: "No match found" });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // }


// import * as faceapi from 'face-api.js';
// import canvas from 'canvas';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const { Canvas, Image, ImageData, loadImage, createCanvas } = canvas;
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// const MODEL_PATH = path.join(__dirname, '..', 'models');
// const IMAGE_FOLDER = path.join(__dirname, '..', 'public');

// let faceMatcher = null;
// let modelsLoaded = false;
// let labeledDescriptorsCache = null;

// async function loadModels() {
//   if (modelsLoaded) return;

//   console.time('Models Loaded In');
//   await Promise.all([
//     faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_PATH),
//     faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH),
//     faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH)
//   ]);
//   modelsLoaded = true;
//   console.timeEnd('Models Loaded In');
// }

// function resizeImage(img, maxWidth = 640, maxHeight = 480) {
//   // Fix: handle missing width/height
//   const srcWidth = img.width || img.naturalWidth;
//   const srcHeight = img.height || img.naturalHeight;
//   if (!srcWidth || !srcHeight) {
//     throw new Error('Image has invalid width or height');
//   }

//   const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight, 1);
//   const width = Math.round(srcWidth * ratio);
//   const height = Math.round(srcHeight * ratio);

//   const cnv = createCanvas(width, height);
//   const ctx = cnv.getContext('2d');
//   ctx.drawImage(img, 0, 0, width, height);
//   return cnv;
// }

// async function prepareLabeledDescriptors() {
//   console.log('Preparing labeled descriptors...');
//   const files = fs.readdirSync(IMAGE_FOLDER).filter(file => /\.(jpg|jpeg|png)$/i.test(file));
//   const labeledDescriptors = [];

//   for (const file of files) {
//     try {
//       const imgPath = path.join(IMAGE_FOLDER, file);
//       const img = await loadImage(imgPath);
//       const resized = resizeImage(img);
//       const detection = await faceapi
//         .detectSingleFace(resized)
//         .withFaceLandmarks()
//         .withFaceDescriptor();

//       if (detection && detection.descriptor) {
//         const label = path.parse(file).name;
//         labeledDescriptors.push(new faceapi.LabeledFaceDescriptors(label, [detection.descriptor]));
//         console.log(`Processed: ${file}`);
//       } else {
//         console.warn(`No face detected in ${file}`);
//       }
//     } catch (error) {
//       console.warn(`Failed on ${file}: ${error.message}`);
//     }
//   }

//   if (labeledDescriptors.length === 0) {
//     throw new Error('No labeled face descriptors found. Please add images to the public folder.');
//   }

//   labeledDescriptorsCache = labeledDescriptors;
//   faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
//   console.log(`${labeledDescriptors.length} labeled descriptors prepared`);
// }

// export async function matchFace(req, res) {
//   try {
//     if (!modelsLoaded) {
//       await loadModels();
//     }
//     if (!faceMatcher || !labeledDescriptorsCache) {
//       await prepareLabeledDescriptors();
//     }

//     let base64Data = null;
//     if (req.body && typeof req.body.image === 'string') {
//       // Accept both data URLs and raw base64
//       if (req.body.image.startsWith('data:image/')) {
//         base64Data = req.body.image.split(',')[1];
//       } else {
//         base64Data = req.body.image;
//       }
//     }
//     if (!base64Data) {
//       return res.status(400).json({ success: false, message: "Invalid image data" });
//     }

//     let buffer;
//     try {
//       buffer = Buffer.from(base64Data, 'base64');
//     } catch (e) {
//       return res.status(400).json({ success: false, message: "Failed to decode image data" });
//     }

//     let img;
//     try {
//       img = await loadImage(buffer);
//     } catch (e) {
//       return res.status(400).json({ success: false, message: "Failed to load image" });
//     }

//     let resized;
//     try {
//       resized = resizeImage(img);
//     } catch (e) {
//       return res.status(400).json({ success: false, message: "Failed to resize image" });
//     }

//     let detection;
//     try {
//       detection = await faceapi
//         .detectSingleFace(resized)
//         .withFaceLandmarks()
//         .withFaceDescriptor();
//     } catch (e) {
//       return res.status(500).json({ success: false, message: "Face detection error" });
//     }

//     if (!detection || !detection.descriptor) {
//       return res.status(400).json({ success: false, message: 'No face detected' });
//     }

//     if (!faceMatcher) {
//       return res.status(500).json({ success: false, message: 'Face matcher not initialized' });
//     }

//     let bestMatch;
//     try {
//       bestMatch = faceMatcher.findBestMatch(detection.descriptor);
//     } catch (e) {
//       return res.status(500).json({ success: false, message: 'Error matching face' });
//     }

//     if (bestMatch && bestMatch.label && bestMatch.label !== 'unknown') {
//       return res.json({ success: true, match: bestMatch.label });
//     }

//     return res.json({ success: false, message: 'No match found' });

//   } catch (err) {
//     console.error('Error in matchFace:', err);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// }

