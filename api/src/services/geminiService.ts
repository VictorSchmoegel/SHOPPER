const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function getResponse() {
  const message = await model.generateContent("Hello, how are you?");
  const response = await message.response;
  const text = response.text();
  console.log(text);
}

getResponse();