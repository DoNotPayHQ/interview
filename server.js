const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "",
});
const openAI = new OpenAIApi(configuration);
const app = express();
const port = 3000;

app.use(cors());

const runGPT = async (messages, options) => {
  const data = await openAI.createChatCompletion({
    model: "gpt-4",
    messages,
    ...options,
  });

  if (data?.data?.choices.length === 0) {
    throw "No data";
  }
  return data.data.choices[0].message.content;
};

// Define routes
app.get("/", async (req, res) => {
  const data = await runGPT([
    {
      role: "system",
      content: "Hello, how are you?",
    },
  ]);
  console.log(data);
  res.send("Hello, World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
