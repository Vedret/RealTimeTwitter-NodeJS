const router = require('express').Router();
const User = require('../models/user');

router.get('/',(req,res,next) => {
    if(req,res){
        res.render('main/home');
    }else{
        res.render('main/landing');
    }
   
   
});

router.get('/add-new-user',(req,res,next)=>{
    let user = new User();
    user.email='wedret@donkey.com',
    user.name='Toma',
    user.password='123',
    user.save(function(err){
        if(err)return next(err),
        res.json("Successfully saved");
    })
});

module.exports=router;