const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

require("dotenv").config(); // Add .env file with keys in /src folder

const accountRoutes = require('./routes/Accounts')
const chatRoutes = require('./routes/chatgpt')
const resetPasswordRoutes = require('./routes/resetpassword')

const PORT = 3001;

const app = express();
app.use(cors({ origin: process.env.REACT_APP_CLIENT_URL, credentials: true }));
app.use(express.json());
app.use("/accounts", accountRoutes);
app.use("/chat", chatRoutes)
app.use("/resetpassword", resetPasswordRoutes)

mongoose.connect(
    'mongodb+srv://cmpe-280:Top1LmxG1HNXG5e2@cmpe280-project.ldcbhdl.mongodb.net/?retryWrites=true&w=majority&appName=cmpe280-project',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
    }
).then(() => console.log("DB Connected"))
 .catch(err => {
     console.error("DB Connect Failed!", err);
 });


app.listen(process.env.PORT || PORT, (err) => {
    if(err){
        console.log("Error", err);
    }
    else{
        console.log(`App listening on port ${PORT}`);
    }
})

app.get("/",(req,res) =>{
    res.json("Server is running")
})