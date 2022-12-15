const express = require('express');
const path = require('path')
const cors = require('cors')
require('dotenv').config();
require('./db/connect')
const app = express();
app.use(cors());
const authRouter = require('./router/authRouter')
const adminRouter = require('./router/adminRouter')
const userRouter = require('./router/userRouter')
const port = process.env.PORT || 5000;


var Path = path.join(__dirname, '/public')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.json());
app.use(express.static(Path))
app.use(express.urlencoded({ extended: true }));

app.use(authRouter)
app.use('/admin',adminRouter);
app.use('/home',userRouter);

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/signup',(req,res)=>{
    res.render('signup');
})
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})

