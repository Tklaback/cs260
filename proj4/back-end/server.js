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

})

app.post('/api/user', async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    })
    try{
        await newUser.save();
        res.send(newUser);
    }catch(error){
        console.log("OH NO! from server")
        res.sendStatus(400);
    }
})

app.delete('api/user/:id', (req, res) => {
    console.log(req.params.id);
    // const found = await User.findById( req.params.id );
    // await User.deleteOne({ _id: req.body.id });
    res.send(found);
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