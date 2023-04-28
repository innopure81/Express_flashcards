const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

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