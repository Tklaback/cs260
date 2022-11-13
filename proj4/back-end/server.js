const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost:27017/test', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

const userSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: String,
    password: String,
    message: String,
});

userSchema.virtual('id')
.get(function() {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true
});

const User = mongoose.model('User', userSchema)

app.get('/api/users', async (req, res) => {
    const db = await User.find();
    res.send(db);
});

app.get('/api/user/:id', (req, res) => {
    try {
        User.find({_id: req.params.id}, (error, data) => {
            if (error){
                console.log("not found!")
            }else{
                res.send(data);
                return;
            }
        })
    }catch(error){
        console.log("HERE")
        res.sendStatus(400);
    }
})

app.get('/api/user', (req, res) => {
    User.find({email: req.query.email}, (error, data) => {
        if (error){
            console.log("NOT FOUND!");
            res.sendStatus(500)
        }
        else{
            if (data.length !== 0){
                if (data[0].password && req.query.password === data[0].password){
                    res.send(data);
                    return;
                }
            }
            res.send(false);
        }
    });
})

app.post('/api/user', async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password
    })
    try{
        if (!newUser.name || !newUser.phoneNumber || !newUser.email || !newUser.password){
            res.send(false);
            return;
        }
        await newUser.save();
        res.send(newUser);
    }catch(error){
        console.log("OH NO! from server")
        res.sendStatus(400);
    }
})

app.put('/api/user/messageField', async (req, res) => {
    try {
        const result = await User.findOneAndUpdate({_id: req.body._id},{message: req.body.message});
        console.log(result.message);
        res.send(result.message);
    }catch (error){
        console.log("HERE!");
        res.sendStatus(400);
    }
})

app.delete('api/user/:id', async (req, res) => {
    try{
        const result = await User.deleteOne({ _id: req.params.id });
        console.log("delete!")
        res.send(result);
    }catch(error){
        console.log("delete!")
    }
})

app.delete('/api/users', async (req, res) => {
    try{
        const db = await User.find();
        db.map(async (element) => {
            await User.deleteOne({
                _id: element.id
            })
        })
    }catch(error){
        console.log("DID NOT WORK!")
    }
});

app.listen(3000, () => console.log("LISTENING ON 3000"));