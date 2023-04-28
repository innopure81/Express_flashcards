const express = require('express');
const router = express.Router();

router.use('/one', (req, res, next)=>{
    req.message = 'This message made it!';
    console.log('1st log: '+req.message);
    //next();
    const err = new Error('Oh noes!');
    err.status = 500;
    next(err);
});

router.use('/one', (req, res, next)=>{
    console.log(req.message);
    next();
});

router.get('/', (req, res)=>{
    const name = req.cookies.username;
    if(name){
    res.render('index',{name: name});
    }else{res.redirect('/hello');}
})

// router.get('/hello', (req, res)=>{
//     res.send('<h1>I am a web developer!</h1>');
// })
router.post('/goodbye', (req, res)=>{
    res.clearCookie('username');
    res.redirect('/hello');
})

router.get('/hello', (req, res)=>{
    res.render('hello')
});

router.post('/hello', (req, res)=>{
    console.dir(req.body); //The request object is a JavaScript bundle of data from the incoming HTTP request.
    res.cookie('username', req.body.username);
    //res.render('hello', {name: req.body.username});
    res.redirect('/');
});

module.exports = router;