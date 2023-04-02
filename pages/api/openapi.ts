import { NextApiResponse, NextApiRequest } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

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
    });
    const data = response.data.choices[0].text;
    const splittedData = data?.split("\n");
    console.log(splittedData);
    res.send(splittedData);
  } catch (error: any) {
    console.log(error.message);
  }
}
