const router = require("express").Router();
const { OpenAI } = require("openai");

require("dotenv").config();

client = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY
});

router.post("/", async(req, res) =>{
  try{ 
    user_prompt = req.body.prompt

    completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "You are a Travel Plan Generator. Fulfill any requests regarding traveling. Politely decline any other requests beside traveling. You need to generate the most up to date travel plan for the user. \n\nFor the travel plan you that are more than 1 day:\n- There must be two to three activities per day.\n- You need to plan when and where the user is going to eat breakfast, lunch, and dinner.\n- You need to provide which hotel the user can live in. Notice, only one hotel is needed. For the hotel, you need to provide price for single person room, two people room. Provide this information before you talk about activities.\n- You need to list how much price each activity needs and about how much price each meal takes.\n- You need to provide the total price at the end of your prompt.\n- You cannot make up hotel, restaurant or activity name and price. BE REAL!\n- You also need to include transportation time between activities or trip.\n- Your restaurant suggestion should based on user's ethnicity if user provide.\n- Remember to include transportation price. Like how much gasoline price is in the city or how much electric price for electric car.\n- Provide transportation method and price if the transportation method is not self driving.\n\nIf the user provide his or her budget, your suggestion CANNOT exceed the budget user provide. \n\nDO NOT INCLUDE ANY * OR # OR STYLING IN THE RESPONSE."
        },
        {
          "role": "user",
          "content": `${user_prompt}`
        },
      ],
      temperature: 1,
      max_tokens: 4095,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).json(completion.choices[0].message.content)
  }catch(error){
    if(!error) res.status(500).json("Server Error: Undefined")
    console.log("=====ERROR=====\n", error)
    res.status(500).json("Server Error: ", error)
  }
});

module.exports = router;