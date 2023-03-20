const  Routes = require("express");
const User = require("../models/User");
const router = new Routes();


router.post('/registration' , (req , res) =>{
    try {
        const {email , password} = req.body;


    }catch (e) {
        console.log(e);
        res.send({message : "Server error."});
    }
})