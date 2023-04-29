const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const codingSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    hint: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Coding = mongoose.model('Coding', codingSchema, 'coding');

module.exports =  Coding;