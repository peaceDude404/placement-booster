const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const schema = mongoose.Schema
const userSchema = new schema({
    name:{
        type:String,
        required:true,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    scores:[{
        subject:String,
        marks:Number
    }],
    userType:String
})


userSchema.pre('save',async function(next){
    var user = this;
    if(!user.isModified('password')){
        return next();
    }
    user.password = await bcrypt.hash(user.password,10);
    next();
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password

    return userObject
}

const User = mongoose.model("User",userSchema);
module.exports = User;