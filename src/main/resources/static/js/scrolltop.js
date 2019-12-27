// JavaScript Document
  $(window).scroll(function(){
     var sc=$(window).scrollTop();
     var rwidth=$(window).width()
         if(sc>0){
    $("#top").css("opacity","1");
    }else{
   $("#top").css("opacity","0");
    }
    })
     
   $("#top").click(function(){
    var sc=$(window).scrollTop();
   $('body,html').animate({scrollTop:0},500);
    })  
   
