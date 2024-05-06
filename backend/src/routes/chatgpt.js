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
      messages:[
        {"role": "system",
          "content": "You are a Travel Assistant. Fulfill any requests regarding traveling. Politely decline any other requests beside traveling"
        },
        {
          "role" : "user",
          "content": `${user_prompt}`
        }
      ]
   })

    res.status(200).json(completion.choices[0].message.content)
  }catch(error){
    if(!error) res.status(500).json("Server Error: Undefined")
    console.log("=====ERROR=====\n", error)
    res.status(500).json("Server Error: ", error)
  }
})

module.exports = router;