const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const path = require('path');
const dotenv = require("dotenv");
import Image from '../model/imageModel';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const fileManager = new GoogleAIFileManager(process.env.API_KEY);
const filePath = path.join(__dirname, '../assets/jetpack.jpg');

export const uploadImg = async (base64Image: string) => {
  try {
    const fileManager = new GoogleAIFileManager(process.env.API_KEY);

    const uploadResponse = await fileManager.uploadBase64(base64Image, {
      mimeType: "image/jpeg",
      displayName: "Image Upload",
    });
  
    console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);
  
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        }
      },
      { text: "Extract the value from this image." },
    ]);

    const measureValue = parseInt(result.response.text().match(/\d+/)[0], 10);

    const newImage = new Image({
      name: uploadResponse.file.displayName,
      uri: uploadResponse.file.uri,
      mimeType: uploadResponse.file.mimeType,
    });
    await newImage.save();

    return {
      image_url: newImage.uri,
      measure_value: measureValue,
      measure_uuid: newImage._id.toString(),
    };
  } catch (error) {
    console.error("Error processing the image:", error);
    throw error;
  }
};