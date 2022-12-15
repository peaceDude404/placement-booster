const mongoose = require('mongoose')
const schema = mongoose.Schema
const questionSchema = new schema({
    subject:String,
    question:String,
    op1:String,
    op2:String,
    op3:String,
    op4:String,
    correct:Number
})

const Question = mongoose.model("Question",questionSchema);
module.exports = Question;