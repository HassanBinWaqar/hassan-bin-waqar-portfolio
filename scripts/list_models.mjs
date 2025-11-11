import { GoogleGenerativeAI } from '@google/generative-ai';

async function main(){
  const key = process.env.GEMINI_API_KEY;
  if(!key){
    console.error('GEMINI_API_KEY not set in env.');
    process.exit(1);
  }
  const client = new GoogleGenerativeAI(key);
  try{
    console.log('client keys:', Object.keys(client));
    // Try common method names if present
    if (typeof client.listModels === 'function') {
      const models = await client.listModels();
      console.log(JSON.stringify(models, null, 2));
    } else if (typeof client.getModels === 'function') {
      const models = await client.getModels();
      console.log(JSON.stringify(models, null, 2));
    } else {
      console.error('No listModels/getModels method found on client.');
    }
  }catch(err){
    console.error('Error listing models:', err);
    process.exit(2);
  }
}

main();
