const router = require('express').Router();
const User = require('../db/models/user');
const bcrypt = require('bcrypt');
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')

router.use(cookieParser('secret'))
router.use(session({
    secret:process.env.SECRET,
    resave:true,
    saveUninitialized:true,
    maxAge:60*60*24*2*1000
}))

router.use(passport.initialize())
router.use(passport.session())

router.use(flash())

//Global variable

router.use((req,res,next)=>{
    res.locals.success_message = req.flash('success_message')
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error')
    next();
})

//passport.js
require('../passport')(passport)




router.get('/register',(req,res)=>{
    res.render("signup");
})
// post  request for registration
router.post('/register',async (req,res)=>{
    const {email,name,password,userType,secret} = req.body;
    if( !name || !password || !userType){
        res.send("please fill all fields");
    }
    else if(userType=='admin'){
        if(secret!=process.env.ADMIN_SECRET){
            res.send("secret key is incorrect");
        }
        else{
            try{
                var user = await User.findOne({email});
                if(user){
                    console.log(user);
                    res.send("user exits");
                }
                else{
                    user = new User({name,email,password,userType});
                    const result = await user.save();
                    res.redirect('/')
                }
    
            }
            catch(e){
                console.log(e);
                res.redirect('/login');
            }
        }
    }
    else
    { 
        try{
            var user = await User.findOne({email});
            if(user){
                console.log(user);
                res.send("user exits");
            }
            else{
                user = new User({name,email,password,userType});
                const result = await user.save();
                req.flash('success_message',"coaching registered successfully....")
                res.redirect('/')
            }

        }
        catch(e){
            console.log(e);
            res.redirect('/login');
            
        }
    }
})
router.get('/login',(req,res)=>{
    res.render('login');
})
router.post('/login',(req,res,next)=>{
    passport.authenticate('user',{
        failureRedirect:'/login',
        successRedirect:'/home',
        failureFlash:true
    })(req,res,next);
})

router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
module.exports = router;