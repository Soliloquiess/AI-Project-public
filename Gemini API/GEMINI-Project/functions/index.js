const { onRequest } = require("firebase-functions/v2/https");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
exports.sayHello = onRequest(
  { cors: true },
  async (req, res) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = "Write a story about a magic backpack."
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // console.log(text);
    res.status(200).send(text);
  }
);