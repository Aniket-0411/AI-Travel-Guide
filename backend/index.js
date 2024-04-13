const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config();

const PORT = 8080;

const app = express();
app.use(cors({credentials: true}));
app.use(express.json());

app.listen(PORT || process.env.PORT, (err) => {
    if(err){
        console.log("Error", err);
    }
    else{
        console.log(`App listening on port ${PORT}`);
    }
})