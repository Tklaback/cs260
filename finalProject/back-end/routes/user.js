const express = require('express')
const { set } = require('../database/models/personalInfo')
const { findById } = require('../database/models/user')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')


router.post('/signup', (req, res, err) => {
    const { username, password } = req.body;
    
    User.findOne({username: username}, (error, user) => {
        if (error){
            console.log("Routes.js post error")
        }else if (user) {
            res.json({error: "sorry, a uuser with that username already exists"})
        }
        else{
            const newUser = new User({
                username: username,
                password: password,
                email: '',
                firstName: '',
                lastName: '',
                phone: '',
                bio: '',
                friends: [],
            })
            newUser.save((error, savedUser) => {
                if (error) return res.json(error);
                return res.json(savedUser);
            })
        }
    })
})

router.get('/signin', (req, res, err) => {
    const { username, password } = req.query;
    User.findOne({username: username}, (error, user) => {
        if (error){
            console.log("Routes.js post error")
        }else if (user) {
            if (user.checkPassword(password)){
                res.send(user);
                return;
            }
            res.send(false);
        }else{
            res.json({error: "Sorry, that user is not in our database."})
        }
    })
})

router.put('/edit', async (req, res, err) => {
    const { _id, email, bio, firstName, lastName, phone } = req.body;
    try{
        await User.findOneAndUpdate({_id : _id}, {$set : 
            {
                email : email,
                firstName: firstName,
                lastName: lastName,
                bio: bio,
                phone: phone,
            }
        });
        const response = await User.findById({_id: _id})
        res.send(response);
    }catch(error){
        console.log("DID NOT WORK")
    }
    
        
    
})

router.delete('/', async (req, res, err) => {
    const { username } = req.body;
    try{
        const response = await User.deleteOne({"username" : username});
        res.send(response);
    }catch(error){
        console.log("Delete did not work");
    }
    
    
})

router.get('/users', async (req, res, err) => {
    try{
        const response = await User.find({username:{ $nin: req.query.username}});
        res.send(response);
    }catch(error){
        console.log(error);
    }
    
})

router.put('/friend', async (req, res, err) => {
    const { _id, friendId } = req.body;
    try{
        const friend = await User.findById(friendId);
        const user = await User.findOneAndUpdate({_id : _id}, {$addToSet : {friends : friend}})
        res.send(user);
    }catch(error){
        console.log("Couldn't add friend")
    }   
})

router.get('/friends', async (req, res, err) => {
    try{
        const friends = await User.findOne({username: req.query.username}, {friends: 1});
        res.send(friends);
    }catch(error){

    }
})

router.delete('/friend', async (req, res, err) => {
    const { username, friendUserName } = req.body;
    try{
        await User.findOneAndUpdate({username : username}, {$pull : {friends : { username: friendUserName}}});
        const friends = await User.findOne({username: username}, {friends: 1});
        res.send(friends);
    }catch(error){
        console.log("COULDNT REMOVE FRIEND")
    }
})

module.exports = router;