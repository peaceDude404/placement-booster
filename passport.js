const User = require('./db/models/user')
const bcrypt = require('bcrypt');

module.exports = function(passport){
    var localStrategy = require('passport-local').Strategy
 passport.use('user',new localStrategy({usernameField:'email'},(username,password,done)=>{
    User.findOne({email:username},(err,data)=>{
        if(err) throw err;
        if(!data)
        {
            return done(null,false,{message:"no such user is exited"})
        }
        bcrypt.compare(password,data.password,(err,match)=>{
            if(err)
            {
                return done(null,false);
            }
            else if (!match)
            {
                return done(null,false,{message:"password doesn't matched"})
            }
            if(match)
            {
                return done(null,data);
            }
        })
    })
 }))
 

 passport.serializeUser((user,cb)=>{
     cb(null,user.id)
 })

 passport.deserializeUser((id,cb)=>{
     User.findById(id,(err,user)=>{
        user.password=undefined
         cb(err,user)
     })
 })
}