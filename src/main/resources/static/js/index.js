// JavaScript Document

$(function(){
	$('#owl-demo').owlCarousel({
		items: 1,
		itemsMobile:[1000,1],
		autoPlay:3000
	});
});



var load_state = true;
$(function(){
load_an();
/*
	loadimg($("img[data-src!='']"),funloading_obj);	
	setTimeout(function(){
		if(load_state){
			load_an();
		}
	},5000);
	*/
})
//预加载load
function loadimg(arr,funLoading,funOnLoad,funOnError){
	var numLoaded=0,
	numError=0,
	isObject=Object.prototype.toString.call(arr)==="[object Object]" ? true : false;
 
	var arr=isObject ? arr.get() : arr;
	for(a in arr){
		var src=isObject ? $(arr[a]).attr("data-src") : arr[a];
		preload(src,arr[a]);
	};
 
	function preload(src,obj){
		var img=new Image();
		img.onload=function(){
			numLoaded++;
			funLoading && funLoading(numLoaded,arr.length,src,obj);
			funOnLoad && numLoaded==arr.length && funOnLoad(numError);
			img.onload=null;
		};
		img.onerror=function(){
			numLoaded++;
			numError++;
			funOnError && funOnError(numLoaded,arr.length,src,obj);
		}
		img.src=src;
	};
};
 
var funloading_obj=function(n,total,src,obj){
	$(obj).attr("src",src).remove("data-src");
	var bfb = Math.round(n/total*100)
	$(".progress_txt").text( bfb + "%" );
	$(".progress_bar").css({ "width":bfb + "%" });
	if(n == total && load_state){
		load_an();
	};
};

function load_an(){
	load_state = false;
	$(".in_body").addClass("in_box_one");
	/*
	$(".loading").fadeOut(600,function(){
			$(".in_body").addClass("in_box_one");
	})
	*/;	
	$("#BgPicList").BgPicList({ 
		piclist_l: "#BgPicList .piclist_l a",
		piclist_r: "#BgPicList .piclist_r a",
		piclist_a: "#BgPicList .piclist_a",
		piclist_li: "#BgPicList .pic_li",
		time: 6000
	});
}

