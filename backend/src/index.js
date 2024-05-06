const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

require("dotenv").config(); // Add .env file with keys in /src folder

const accountRoutes = require('./routes/Accounts')
const chatRoutes = require('./routes/chatgpt')

const PORT = 3001;

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use("/accounts", accountRoutes);
app.use("/chat", chatRoutes)

try{
    mongoose.connect(
        'mongodb+srv://cmpe-280:Top1LmxG1HNXG5e2@cmpe280-project.ldcbhdl.mongodb.net/?retryWrites=true&w=majority&appName=cmpe280-project',
    );
    console.log("DB Connected");
}
catch (error) {
    console.log(error);
    console.log("DB Connect Failed!");
}

app.listen(PORT || process.env.PORT, (err) => {
    if(err){
        console.log("Error", err);
    }
    else{
        console.log(`App listening on port ${PORT}`);
    }
})