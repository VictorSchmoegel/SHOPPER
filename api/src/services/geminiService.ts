const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const path = require('path');
const dotenv = require("dotenv");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const fileManager = new GoogleAIFileManager(process.env.API_KEY);
const filePath = path.join(__dirname, '../assets/jetpack.jpg');

async function uploadImg() {
  const uploadResponse = await fileManager.uploadFile(filePath, {
    mimeType: "image/jpeg",
    displayName: "jetpack drawing",
  });

  console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);

  const getResponse = await fileManager.getFile(uploadResponse.file.name);
  console.log(`Retrieved file ${getResponse.displayName} as ${getResponse.uri}`);

  const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri,
      }
    },
    { text: "Describe this image." },
  ]);
  // console.log(result.response.text());
  // return result.response.text();
}

uploadImg();
module.exports = uploadImg;