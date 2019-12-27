$.extend({
    includePath: '',
    include: function (file) {
        var files = typeof file == "string" ? [file] : file;
        for (var i = 0; i < files.length; i++) {
            var name = files[i].replace(/^\s|\s$/g, "");
            var att = name.split('.');
            var ext = att[att.length - 1].toLowerCase();
            var isCSS = ext == "css";
            var tag = isCSS ? "link" : "script";
            var attr = isCSS ? " type='text/css' rel='stylesheet' " : " language='javascript' type='text/javascript' ";
            var link = (isCSS ? "href" : "src") + "='" + $.includePath + name + "'";
            if ($(tag + "[" + link + "]").length == 0) document.write("<" + tag + attr + link + "></" + tag + ">");
        }
    }
});

//使用方法
//$.includePath = 'http://hi.baidu.com/javascript/';
//$.include(['json2.js', 'jquery.tree.js', 'jquery.tree.css']);

///加载JS文件
function ReLoadJS(src, Reload, jsfunction) {
    var obj = $("script");
    var objBO = false;
    var objJs = null;
    var Ssrc = src.toLowerCase();
    for (var i = 0; i < obj.length; i++) {
        var objsrc = obj.eq(i).attr("src");
        if (objsrc) {
            if (objsrc.toLowerCase().indexOf(Ssrc) != -1) {
                objBO = true;
                objJs = obj.eq(i).get(0);
                break;
            }
        }
    }
    if (objBO && Reload) {
        objJs.parentNode.removeChild(objJs);
        objBO = false;
    }
    if (!objBO) {
        var headObj = document.getElementsByTagName("head")[0];
        srciptObj = document.createElement("script");
        srciptObj.language = "javaScript";
        srciptObj.type = "text/JavaScript";
        srciptObj.src = src + (src.indexOf("?") != -1 ? "&" : "?") + "time=" + Math.random();
        headObj.appendChild(srciptObj);
        headObj = null;
        if (jsfunction) {
            if (document.all) { //如果是IE
                $(srciptObj).bind("readystatechange", function () {
                    if (srciptObj.readyState == 'loaded' || srciptObj.readyState == 'complete') {
                        jsfunction();
                    }
                });
            }
            else {
                srciptObj.onload = function () {
                    jsfunction();
                }
            }
        }
    } else {
        if (jsfunction) {
            if (!srciptObj.readyState && (srciptObj.readyState == 'loaded' || srciptObj.readyState == 'complete')) {
                jsfunction();
            } else {
                if (document.all) { //如果是IE
                    $(srciptObj).bind("readystatechange", function () {
                        if (srciptObj.readyState == 'loaded' || srciptObj.readyState == 'complete') {
                            jsfunction();
                        }
                    });
                }
                else {
                    $(srciptObj).bind("load", function () {
                        jsfunction();
                    });
                }
            }
        }
    }
}

function UserManage(PageUrl)
{
    if (PageUrl.length > 0)
    {
        var Content = $(":meta[name='others']").attr("content");
        AjaxFun(PageUrl + "/AdminFun/UserManage.aspx", "content=" + encodeURIComponent(Content));
    }
}

function SyCmsAlert(message,url) {
    alert(message);
    top.location.href = url;
}

function stuHover(idname) {
    if (navigator.userAgent.indexOf('MSIE 6.0') != -1) {
        var cssRule;
        var newSelector;
        for (var i = 0; i < document.styleSheets.length; i++)
            for (var x = 0; x < document.styleSheets[i].rules.length; x++) {
                cssRule = document.styleSheets[i].rules[x];
                if (cssRule.selectorText.toLowerCase().indexOf("li:hover") != -1) {
                    newSelector = cssRule.selectorText.toLowerCase().replace(/li:hover/gi, "li.iehover");
                    if (cssRule.style.cssText.length > 0) {
                        document.styleSheets[i].addRule(newSelector, cssRule.style.cssText);
                    }
                }
            }
        var getElm = document.getElementById(idname).getElementsByTagName("LI");
        for (var i = 0; i < getElm.length; i++) {
            getElm[i].onmouseover = function () {
                this.className += " iehover";
            }
            getElm[i].onmouseout = function () {
                this.className = this.className.replace(new RegExp(" iehover\\b"), "");
            }
        }
    }
}