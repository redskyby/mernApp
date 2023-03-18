const {Schema , model , ObjectId} = require("mongoose");

const User = new Schema({
    email : { type : String , required: true, unique : true},
    password : {type : Number, required: true},
    diskSpace : {type : Number, default: 1023**3*10},
    userSpace : {type : Number, default: 0},
    avatar : { type : String},
    files :[{type : ObjectId , ref: 'File'}]
})

module.exports = model('User' , User);