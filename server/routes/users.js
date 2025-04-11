const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const needle = require('needle');
const _ = require('lodash');
const sendEmail = require('../utils/sendEmail');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const admin = require('../middleware/admin');
const {User} = require('../models/user');
const {Token} = require('../models/token');
const { default: mongoose } = require('mongoose');

router.get('/' , [auth,admin], async (req,res)=>{
    const users = await User.find();
    res.send(users);
})

router.get('/:name', auth, async(req,res)=>{
    const regex = /([a-zA-Z0-9]+)+$/;
    if(regex.test(req.params.name)){
        const user = await User.findOne({'username':req.params.name});
        return res.render('user', _.pick(user, ['name', 'email', 'role', 'username', 'website', '_id', 'credit'])); // Fixed line
    }
    res.status(400).send('Invalid Name');
})

router.post('/', async (req, res)=>{

    const user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('Invalid email or password');

    const newUser = new User(req.body);

    if(req.body.ref){
        await User.findOneAndUpdate({_id: req.body.ref}, { $inc: { credit: 1 } })
    }

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();

    res.send(newUser);
})

router.put('/:id', [auth, validateObjectId], async(req, res)=>{

    const user = await User.findOne({_id: req.params.id});

    let domain;
    await needle('get', req.body.url)
        .then(function(resp) { domain =  resp.body; })
        .catch(function() { return; })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.newPass, salt);

    await User.findOneAndUpdate({_id: req.params.id}, {
        $set: {
            name: req.body.name,
            email: req.body.email,
            website: req.body.url,
            password: user.password
        }
    })
    res.render('status', {status: 'Updated', domain}); // Fixed line
})

router.post('/otp', async(req,res)=>{
    const user = await User.findOne({username: req.body.username});
    if(!user.email) return res.status(404).send('User does not exist!');

    const generatedOTP = Math.floor(Math.random() * 9000 + 1000);

    const link = new Token({
        userId: user._id,
        token: generatedOTP,
        createdAt: Date.now()
    })

    const host = process.env.HOST || req.hostname;
    const resetLink = `http://${host}:3000/change-password?token=${link.token}&userId=${link.userId}`;

    await link.save();
    sendEmail(user.email, resetLink);

    res.send({status: 'created', user: user._id});
})

router.post('/verify', async(req,res)=>{
    const token = await Token.findOne({userId: req.body.user.userId}).sort({"createdAt": -1}).limit(1);
    if(!token) return res.status(401).send('Token has expired!');

    if(token.token !== req.body.user.token) return res.status(401).send('Access Denied!');

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password.value, salt);
    await User.findOneAndUpdate({_id: token.userId}, {
        $set: {
            password
        }
    })

    await Token.findOneAndRemove({userId: req.body.user.userId});
    res.send('Updated Successfully!');
})

router.delete('/:id', [auth, validateObjectId], async(req,res)=>{
    const user = await User.findByIdAndRemove({_id: req.params.id});

    if(!user) return res.status(404).send('The user with the given ID was not found')
    res.send("Deleted Successfully!");
})

module.exports = router;