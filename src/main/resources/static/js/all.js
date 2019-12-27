// JavaScript Document
	$(function(){//搜索按钮
		$('.but').on('click', function(e){
			  e.preventDefault();
			  $(this).parent().toggleClass('ss_one');
			});
	})
	
	$(function(){//搜索按钮
		$('.ewm').on('click', function(e){
			  e.preventDefault();
			  $(this).parent().toggleClass('ewm_one');
			});
	})



//手机导航

$(function(){
	$('.nav_but_box').on('click', function(e){
			  e.preventDefault();
			  $(this).parent().toggleClass('phone_nav_one');
			  $("body").toggleClass('hide');
	});
	
	$('.nav_more').children("b").on('click', function(e){
				  e.preventDefault();
				  e.stopPropagation();
				  $(this).parent().toggleClass('one');
				  $(this).parent().siblings().removeClass('one');
		});
		$('.nav_more li a').on('click', function(e){
			  e.stopPropagation();
	});
})


$(function(){	
	
	$(window).scroll(function(){
	    var top = $(window).scrollTop();   
        if (top > 10)                      
        {
			$(".nav_but_box").addClass("nav_but_box2");
        }
		else                              
		{
		    $(".nav_but_box").removeClass("nav_but_box2");
		}

	});
});
