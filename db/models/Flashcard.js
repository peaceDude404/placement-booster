const mongoose = require('mongoose')
const schema = mongoose.Schema
const flashSchema = new schema({
    subject:String,
    heading:String,
    mainContent:String,
    points:[String],
})

const Flashcard = mongoose.model("Flashcard",flashSchema);
module.exports = Flashcard;