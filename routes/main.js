const router = require('express').Router();
const User = require('../models/user');
const Tweet = require('../models/tweet');
const async = require('async');

router.get('/',(req,res,next) => {
    if(req.user){

        Tweet.find({})
        .sort('-created')
        .populate('owner')
        .exec(function(err,tweets){
            if(err) return next (err);
            console.log(tweets);
            res.render('main/home',{tweets:tweets});
        });    
       
        
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

router.get('/user/:id',(req,res,next)=>{
    async.waterfall([
        function(callback){
            Tweet.find({owner:req.params.id})
            .populate('owner')
            .exec(function(err,tweets){
                callback(err,tweets);
            });
        },
        function(tweets,callback){
            User.findOne({_id:req.params.id})
            .populate('following')
            .populate('followers')
            .exec(function(err,user){
                res.render('main/user',{foundUser:user,tweets:tweets});
            });
        }
    ]);
});

module.exports=router;