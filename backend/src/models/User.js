const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    }
});

UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this.id}, 'jwt_token', {expiresIn: '2h'});
    return token;
}

const User = mongoose.model("users", UserSchema);

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        username: Joi.string().required().label("Username"),
        password: passwordComplexity().required().label("Password"),
    })
    return schema.validate(data);
}

module.exports = { User, validate }