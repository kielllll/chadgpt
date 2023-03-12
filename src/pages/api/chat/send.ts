import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const OpenAI = require("openai-api");
  const OPENAI_API_KEY = process.env.SERVER_OPENAI_API_KEY;
  const openai = new OpenAI(OPENAI_API_KEY);

  const gptResponse = await openai.complete({
    engine: "davinci",
    prompt: "Hello",
    temperature: 0.9,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
    bestOf: 1,
    n: 1,
    stream: false,
    stop: ["\n", "testing"],
  });

  console.log(gptResponse.data);

  res.status(200).json({ response: "Hello World" });
}
