import OpenAI from 'openai'

export const chatCompletion = async (
  apiKey: string,
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  model: string = 'gpt-4o-mini'
) => {
  const openai = new OpenAI({
    apiKey,
  })

  return await openai.chat.completions.create({
    messages,
    model,
    stream: true,
  })
}
