import { NextApiResponse, NextApiRequest } from "next";
import { Configuration, OpenAIApi } from "openai";
const clientToken = process.env.CHAT_TOKEN;
if (!clientToken) {
  throw new Error("No chat token!");
}

const configuration = new Configuration({
  apiKey: clientToken,
});

console.log(clientToken);

export default async function handler(req: any, res: any) {
  console.log("Inside!");
  try {
    const openai = new OpenAIApi(configuration);
    const { message } = req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      // instruction: prompt,
      max_tokens: 1000,
      temperature: 0.3,
    });
    const data = response.data.choices[0].text;
    const splittedData = data?.split("\n");
    res.send(splittedData);
  } catch (error: any) {
    console.log(error.message);
  }
}
