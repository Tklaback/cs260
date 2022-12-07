const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');

const personalInfo = new Schema({
    email: { type: String, unique: false, required: false},
    phone: { type: String, unique: false, required: false},
    bio: { type: String, unique: false, required: false},
})

module.exports = personalInfo;