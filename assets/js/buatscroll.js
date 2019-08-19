$(document).ready(function(){
    $("#scroll").click(function(){
        var scroll= document.getElementById("a");
        //scroll.scrollIntoView();
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function(){     
   
    });
});