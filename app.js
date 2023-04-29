const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const Coding = require('./models/coding');
const app = express();

const config = require('./config.js');
const uri = config.mongoUrl;

async function connect() {
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
        await Coding.create([
            {
                "question": "TEST:What language are Express apps written in?",
                "hint": "TEST:It starts with a \"J\"",
                "answer": "TEST:JavaScript"
            }
        ]);
        console.log(await Coding.find());
    } catch (error){
        console.error(error);
    }
}

connect();


app.use(bodyParser.urlencoded({extended: false})); //To create a body property on the req object
app.use(cookieParser());
//const colors = [ 'red', 'orange', 'yellow', 'green', 'blue', 'purple'];
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

const mainRoutes = require('./routes');
app.use(mainRoutes);
const cardRoutes = require('./routes/cards.js');
app.use('/cards', cardRoutes);

app.use((req, res, next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    res.locals.error = err;
    res.status(err.status);//res.status(500);
    res.render('error');
})

app.listen(3000, ()=>{
    console.log('The app is running on localhost:3000!')
});