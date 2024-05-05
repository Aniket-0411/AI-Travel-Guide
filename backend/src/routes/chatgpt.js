const router = require("express").Router();
const { OpenAI } = require("openai");

require("dotenv").config();

// client = new OpenAI(
//   api_key = process.env.CHATGPT_API_KEY
// );

router.get("/", async(req, res) =>{
  try{ 
    user_prompt = req.body.prompt

    completion = client.chat.completions.create(
      model = "gpt-3.5-turbo",
      messages=[
        {"role": "system",
          "content": "You are a Travel Guide. Fulfill any requests regarding travelling. Politely decline any other requests beside travelling"
        },
        {
          "role" : "user",
          "content": `${user_prompt}`
        }
      ]
    )

    res.status(200).json(completion.choices[0].message)
  }catch(error){
    console.log("=====ERROR=====\n", error)
    res.status(500).json(error)
  }
})

module.exports = router;