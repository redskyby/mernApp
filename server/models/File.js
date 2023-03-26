const {Schema , model , ObjectId} = require("mongoose");


const File = new Schema({
    name : {type : String , require : true},
    type : {type : String , require : true},
    accessLink :{type : String },
    size: {type : Number , default : 0},
    path : {type : String , default: ''},
    user :{type : ObjectId , ref : 'User'},
    parent : {type : ObjectId , ref : 'File'},
    child : [{type : ObjectId , ref : 'File'}]
})

module.exports = model('File' , File)