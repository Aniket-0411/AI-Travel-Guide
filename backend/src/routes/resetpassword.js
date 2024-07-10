const router = require("express").Router();
const { User, validate } = require("../models/User");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// URL Testing endpoint http://localhost:3001/resetpassword/

router.post("/", async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email exists in the database
        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "Email not found" });

        // Generate a random password reset token (you need to implement this)
        const resetToken = await generateResetToken();                      //wait for token to generate

        // Update the user document in the database with the reset token
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        // Send password reset email
        const resetLink = `${process.env.REACT_APP_CLIENT_URL}/set-password/${resetToken}`; // Change the URL to your frontend reset password page
        
        
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
                name: 'no-reply AI Travel Guide',
                address: process.env.EMAIL_USER,
            },
            to: email,
            subject: 'Password Reset Request',
            html: `<p>You are receiving this email because you (or someone else) has requested the reset of the password for your account.</p>
                   <p>Please click on the following link, or paste this into your browser to complete the process:</p>
                   <p><a href="${resetLink}">${resetLink}</a></p>
                   <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`
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

router.post("/:resetToken", async (req, res) => {
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

function generateResetToken() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(20, (err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer.toString('hex'));
            }
        });
    });
}