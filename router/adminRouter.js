const { checkAuthenticated, isAdmin } = require('./middlewares/auth');
const Question = require('./../db/models/questions');
const User = require('../db/models/user');
const Flashcard = require('../db/models/Flashcard');
const router = require('express').Router();

router.get('/',isAdmin,(req,res)=>{
    res.render("admin");
})

router.get('/add-question',isAdmin,(req,res)=>{
    res.render('add-question');
})
router.post('/add-question',isAdmin,async (req,res)=>{
    const {question,op1,op2,op3,op4,correct,subject} = req.body;
    if(!question || !op1 || !op2 || !op3 || !op4 || !correct){
        res.send("fill all fields");
    }
    else
    {
    const question = new Question(req.body);
        try{
            await question.save();
            console.log(question);
            res.render('add-question');
        }
        catch(e){
            res.send(e);
        }
    }
})



router.post('/add-flash',isAdmin,async (req,res)=>{
    console.log(req.body);
    const data = req.body;
    // res.send("added");
    const points = [];
    if(data.p1)points.push(data.p1);
    if(data.p2)points.push(data.p2);
    if(data.p3)points.push(data.p3);
    try{
        const flash = new Flashcard({mainContent:data.main,subject:data.subject,points:points,heading:data.heading});
        await flash.save();
        res.redirect('/admin/add-flash-cards');
    }
    catch(e){
        res.send(e);
    }
})

router.get('/add-flash-cards',isAdmin,(req,res)=>{
    res.render('add-flash');
})


module.exports = router;