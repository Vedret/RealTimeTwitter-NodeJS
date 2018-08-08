const express=require('express');
const bodyParser = require('body-parser');
let app = express();

let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine','ejs');

app.get('/profile/:name',function(req,res){
    let data={
        name:'wedret',
        srNem:'GHB',
        hobies:[
            'drkanje',
            'jebanje',
            'jebačina'
        ]
      
    }
    res.render('profile',{person:req.params.name,data:data});
})

app.post('/login' ,urlencodedParser,function(req,res){
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    res.render('contact', {qs:req.query});
} );

app.listen(3030);
console.log('Connected to server');
