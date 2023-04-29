const express = require('express');
const router = express.Router();
const Coding = require('../models/coding');
//const {data} = require('../data/flashcardData.json');//const data = require('../data/flashcardData.json').data;
//const {cards} = data;// const cards = data.cards;

router.get('/', async (req, res)=>{
    try {
        const cards = await Coding.find();
        const numOfCards = cards.length;
        const randomId = Math.floor(Math.random()*numOfCards);
        
        res.redirect(`cards/${randomId}`);
    } catch (error){
            console.error(error);
    }
})

router.get('/:id', async (req, res)=>{ //res.locals.prompt = "Who's beried in Grant's tomb?";  
    const {side} = req.query;
    const {id} = req.params;
    const name = req.cookies.username;

    if(!side){
        return res.redirect(`/cards/${id}?side=question`) //Th return keyword will stop the rest of the functions below.
    }

    const cards = await Coding.find();
    const text = cards[id][side];
    const {hint} = cards[id];
    const templateData = {id, text, name, side};
    if(side ==='question'){
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Q';
    }else if(side==='answer'){
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'A';
    }
    res.render('card', templateData);// {prompt: cards[req.params.id].question, hint:cards[req.params.id].hint}
});

module.exports = router;