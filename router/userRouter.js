const router = require('express').Router();
const User = require('./../db/models/user')
const Question = require('./../db/models/questions')
const Flashcard = require('./../db/models/Flashcard')
const {checkAuthenticated,loginCheck} = require('./middlewares/auth')

router.get('/',checkAuthenticated,(req,res)=>{
    res.render('home',{user:req.user});
})
router.get('/take-test',(req,res)=>{
    res.render("test",{user:req.user});
})
router.post('/get-question',(req,res)=>{
    // console.log(req.body);
    Question.count().exec(function (err, count) {

        var random = Math.floor(Math.random() * 7)
        Question.findOne({subject:req.body.subject}).skip(random).exec(
          function (err, result) {
            res.send(result)
          })
      })
})

router.post('/savescore',checkAuthenticated,async(req,res)=>{
    try{
        const user = await User.findById(req.user.id);
        console.log(user);
        user.scores.push({subject:req.body.subject,marks:req.body.score});
        const u = await user.save();
        console.log(u);
    }
    catch(e){
        console.log(e);
    }
    console.log(req.user,req.body);
    res.render('login');
    
})
// Flash handler
router.post('/get-flash',async (req,res)=>{
    try {
        const flashs = await Flashcard.find({subject:req.body.subject});
        res.send(flashs);
    } catch (e) {
        res.status(501);
    }
})

router.get('/flashcards',(req,res)=>{
    res.render('flashs');
})

router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });


router.get('/about',(req,res)=>{
    res.render('about');
})

module.exports = router;