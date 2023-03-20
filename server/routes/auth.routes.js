const  Routes = require("express");
const User = require("../models/User");
const router = new Routes();


router.post('/registration' , (req , res) =>{
    try {
        const {email , password} = req.body;

        const candidate = User.findOne({email});
        if(candidate){
            return res.status(400).json({message : `User with email ${email} already exist.`})
        }
    }catch (e) {
        console.log(e);
        res.send({message : "Server error."});
    }
})