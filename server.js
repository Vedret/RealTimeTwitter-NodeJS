const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressHbs = require('express-handlebars');
const hbs = require('hbs');
const config=require('./config/secret.js'); 
const session = require('express-session');
const flash=require('express-flash');
const passport=require('passport');
const MongoStore=require('connect-mongo')(session);
const cookieParser=require('cookie-parser');
const passportSocketIo=require('passport.socketio');

const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);
const sessionStore= new MongoStore({url:config.database , autoReconnect:true});
const port= process.env.PORT ||3000;
mongoose.connect(config.database,{useNewUrlParser: true},(err)=>{

    if(err){
       return  console.log('Unable to connect to mogo DB');
    }
        console.log('Connected to MongoDb server');
    });

    
app.engine('.hbs',expressHbs({defaultLayout:'layout',extname:'.hbs'}));
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    resave : true,
    saveUninitialized:true,
    secret:config.secret,
    store:sessionStore
}));
app.use(flash());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.user=req.user;
    next();
})

io.use(passportSocketIo.authorize({
    cookieParser:cookieParser,
    key:'connect.sid',
    secret:config.secret,
    store:sessionStore,
    success:onAuthorizeSuccess,
    fail:onAuthorizeFail

}));

function onAuthorizeSuccess(data,accept){
    console.log("Successful login");
    accept();
}

function onAuthorizeFail(data,message,err,accept){
    console.log("Fail login");
    if(err) accept(new Error(message));
}

require('./realtime/io')(io);



const mainRoutes=require('./routes/main');
const userRoutes=require('./routes/user');

app.use(mainRoutes);
app.use(userRoutes);

http.listen(port,(err)=>{
    if(err) console.log(err);
    console.log(`Server Running on port ${port}`);
});
