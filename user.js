const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const Task=new Schema({
    data:String,
    start:Date,
    end:Date,
    project:Number
})

const User = new Schema({
    name:String,
    username:{
        type:String,
        unique:true,
    },
    email:{
        type:String,
        unique:true
    },
    pass:String,
    task:[Task]
});

User.plugin(uniqueValidator);
module.exports = mongoose.model('USer', User);