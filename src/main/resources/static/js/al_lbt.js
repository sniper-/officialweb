jQuery.fn.BgPicList = function (settings) {
    var defaults = {
		piclist_l:null,			//向左箭头
		piclist_r:null,			//向右箭头
		piclist_a:null,			//小点
		piclist_li:null,			//轮播图元素
		time:3000			//时间
    };
    $.extend(defaults, defaults, settings);
	
	//初始化
	var setIn;
	var list_index=0;
	var now_index=0;
	var length=$(defaults.piclist_li).length
	var html_a="";
	for(i=0;i<length;i++){
		html_a+="<a>&nbsp;</a>";
	};
	$(defaults.piclist_a).html(html_a);
	$(defaults.piclist_li).eq(0).fadeIn(0);
	$(defaults.piclist_a + " a").eq(0).addClass("one");
	
	//导航点击事件
	$(defaults.piclist_a).on("click","a",function(){
		fun_move(2,$(this).index());
		return false;
	});
	
	//左箭头点击事件
	$(defaults.piclist_l).bind("click",function(){
		fun_move(0);
		return false;
	});
	
	//右箭头点击事件
	$(defaults.piclist_r).bind("click",function(){
		fun_move(1);
		return false;
	});
	
	//运动事件
	function fun_move(lr,n){
		
		clearInterval(setIn);
		$(defaults.piclist_li).stop(true,true);

		//获取事件类型
		if(lr===0){
			list_index--;
			if(list_index<0){
				list_index=length-1
			};
		}else if(lr===1){
			list_index++;
			if(list_index>length-1){
				list_index=0
			};
		}else if(lr===2){
			list_index=n
		}
		
		//动作
		$(defaults.piclist_li).eq(list_index).css("z-index","110");
		$(defaults.piclist_li).eq(list_index).fadeIn(800,function(){
			$(defaults.piclist_li).css({"z-index":"100"});
			$(defaults.piclist_li).eq(now_index).css({"display":"none"});
			now_index=list_index;
			$(defaults.piclist_a + " a").removeClass("one");
			$(defaults.piclist_a + " a").eq(list_index).addClass("one");
			setIn=setTimeout(function(){fun_move(1);},defaults.time);
		});

	};
	
	//自动开始执行
	setIn=setTimeout(function(){fun_move(1);},defaults.time);

};
