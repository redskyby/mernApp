const Routes = require("express");
const User = require("../models/User");
const {check, validationResult} = require("express-validator")
const config = require("config")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = new Routes();
const authMiddleware = require('../middleware/auth.middleware');
const fileService = require('../services/fileService');
const File = require('../models/File');

const client = require('../redisClient');



router.post('/registration',
    [
        check('email', "Uncorrect email").isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12').isLength({min:3, max:12})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Uncorrect request", errors})
            }
            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if(candidate) {
                return res.status(400).json({message: `User with email ${email} already exist`})
            }
            const hashPassword = await bcrypt.hash(password, 8)
            const user = new User({email, password: hashPassword})
            await user.save()
            await fileService.createDir(new File({user:user.id, name: ''}))
            res.json({message: "User was created"})
        } catch (e) {
            console.log(e)
            res.send({message: "Server error66"})
        }
    })

router.post('/login',
    async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(404).json({message: "User don't found."});
            }

            const isPassValid = bcrypt.compareSync(password, user.password);
            if (!isPassValid) {
                return res.status(400).json({message: "Invalid password."});
            }

            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"});
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    userSpace: user.userSpace,
                    avatar: user.avatar
                }
            });
        } catch (e) {
            console.log(e);
            res.send({message: "Server error.97"});
        }
    })

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {


            const user = await User.findOne({_id: req.user.id});
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"});
            
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    userSpace: user.userSpace,
                    avatar: user.avatar
                }
            });
        } catch (e) {
            console.log(e);
            res.send({message: "Server error"});
        }
    })


module.exports = router