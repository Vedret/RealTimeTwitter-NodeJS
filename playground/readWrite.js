let fs= require('fs');

fs.readFile('redMe.txt','UTF8',function(err,data){
    if (err){
        console.log(err);
    }
    fs.writeFileSync('writeMe.txt',data);
})