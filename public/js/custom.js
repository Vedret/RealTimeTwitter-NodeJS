$(function(){
    let socket =io();
   $('#sendTweet').submit(function(){
       let content =$('#tweet').val();
       socket.emit('tweet',{content:content});
       $('#tweet').val('');
       return false;
   })

  
});
