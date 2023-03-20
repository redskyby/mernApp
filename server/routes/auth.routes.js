const  Routes = require("express");
const User = require("../models/User");
const router = new Routes();
const bcrypt = require('bcrypt');

router.post('/registration' , async (req , res) =>{
    try {
        const {email , password} = req.body;

        const candidate = User.findOne({email});
        if(candidate){
            return res.status(400).json({message : `User with email ${email} already exist.`})
        }

        const hashPassword = await bcrypt.hash(password , 15);
        const user = new User({email , password : hashPassword});
        await user.save();
        return res.json({message : "User was created."});
    }catch (e) {
        console.log(e);
        res.send({message : "Server error."});
    }
})