const router=require('express').Router();
const User = require('../models/user');
const passport=require('passport');
const passportConfig=require('../config/passport');

router.route('/signup')
    .get((req,res,next)=>{
        res.render('accounts/signup',{message: req.flash('errors')})
    })
    .post((req,res,next)=>{
        User.findOne({email:req.body.email},function(err,callBack){
            if(callBack){
                req.flash('errors','Account with that email already exist');
                res.redirect('/signup');
            }else{
                let user= new User();
                user.name=req.body.name;
                user.email=req.body.email;
                user.password=req.body.password;
                user.photo=user.gravatar();
                user.save(function(err){
                    req.login(user,function(err){
                    if(err) return next(err);
                    res.redirect('/');
                    });
                });
            }
        });
    });

    router.route('/login')
    .get((req,res,next)=>{
        if(req.user) res.redirect('/');
        res.render('accounts/login',{message:req.flash('loginMessage')});
    })
    .post(passport.authenticate('local-login',{
        successRedirect:'/',
        failureRedirect:'/login',
        failureFlash:true

    }));

    router.get('/logout',(req,res,next)=>{
        req.logout();
        res.redirect('/');
        
    })
    module.exports=router;