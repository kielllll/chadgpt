import { addApiKey as dbAddApiKey } from '@/server/apikey'

export async function addApiKey(formData: FormData, callback?: () => void) {
  try {
    // const data = JSON.parse(JSON.stringify(formData))
    // console.log('apikey.ts: TEST DEBUG ==== ', data)
    await dbAddApiKey(formData.get('apiKey') as string)

    callback?.()
  } catch (error: any) {
    console.log(error)
    throw new Error('apikey.ts: addApiKey: ' + error)
  }
}
