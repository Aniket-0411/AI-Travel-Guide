const router = require("express").Router();
const { User, validate } = require("../models/User");
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const bcrypt = require('bcrypt');

// URL Testing endpoint http://localhost:3001/accounts/

router.post("/signup", async (req, res) => {
    try{
        const {error} = validate(req.body);
        if(error){
            const messages = [];
            error.details.forEach((detail) => {
                messages.push(detail.message);
            })
            return res.status(400).json({message: messages});
        }

        const userEmail = await User.findOne({email: req.body.email});
        if(userEmail)
            return res.status(409).json({message: "Email already exists"});

        const userUsername = await User.findOne({username: req.body.username});
        if(userUsername)
            return res.status(409).json({message: "Username already exists"});

            const salt = await bcrypt.genSalt(Number(12));
            const hash = await bcrypt.hash(req.body.password, salt);
            
            const user = await new User({...req.body, password: hash}).save();

            const data = {
                username: user.username,
            }

            res.status(201).json({data: data});
    }
    catch (error){
        res.status(500).json({message: "Internal Server Error"});
        console.log(error);
    }
})

module.exports = router;