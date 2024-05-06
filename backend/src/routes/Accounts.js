const router = require("express").Router();
const { User, validate } = require("../models/User");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


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

            const token = user.generateAuthToken();

            res.status(200).json({token: token, username: user.username});
    }
    catch (error){
        res.status(500).json({message: "Internal Server Error"});
        console.log(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne(
            {$or: [{ email: req.body.username_email }, { username: req.body.username_email }]}
        )
        if (!user)
            return res.status(401).json({message: "User does not exists!"})

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword)
            return res.status(401).json({message: "Invalid Email/Username or Password!"})

        const token = user.generateAuthToken();

        res.status(200).json({token: token, username: user.username});

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
});

// Email sending route
router.post("/send-email", async (req, res) => {
    try {
        const { data, recipientEmail } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: { 
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: {
                name: 'AI Travel Guide',
                address: process.env.EMAIL_USER,
            },
            to: recipientEmail,
            subject: 'Your Trip Itinerary',
            html: `<p>Test Data ${data}</p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).json({ success: false, message: 'Error sending email' });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ success: true, message: 'Password reset email sent successfully' });
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


router.post("/reset-password/:resetToken", async (req, res) => {
    try {
        const { resetToken } = req.params;
        const { newPassword } = req.body;

        // Find user by reset token
        const user = await User.findOne({ resetPasswordToken: resetToken, resetPasswordExpires: { $gt: Date.now() } });
        if (!user)
            return res.status(400).json({ message: "Invalid or expired reset token" });

        // Hash the new password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user's password and clear reset token
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
