var HeadObj = document.getElementsByTagName("head");
var PageJSURL = "js/";
if (HeadObj) {
    var HeadscriptObj = HeadObj[0].getElementsByTagName("script");
    if (HeadscriptObj) {
        for (var i = 0; i < HeadscriptObj.length; i++) {
            if (HeadscriptObj[i].src.toLowerCase().indexOf("frontjs.js")!=-1) {
                if (PageJSURL.toLowerCase().indexOf("://")) {
                    PageJSURL = HeadscriptObj[i].src;
                    PageJSURL = PageJSURL.substr(0, PageJSURL.length - 10);
                }
                break;
            }
        }
    }
}

document.write("<script src=\"js/event.js\" auto=\"true\" type=\"text/javascript\"></script>");
document.write("<script src=\"js/option.js\" auto=\"true\" type=\"text/javascript\"></script>");
document.write("<script src=\"js/function.js\" auto=\"true\" type=\"text/javascript\"></script>");
document.write("<script src=\"js/jquery-1.4.2.min.js\" auto=\"true\" type=\"text/javascript\"></script>");
document.write("<script src=\"js/Setup_Config.js?Time=\" auto=\"true\" type=\"text/javascript\"></script>");
document.write("<script src=\"js/SyCms.js\" auto=\"true\" type=\"text/javascript\"></script>");

var isIE = navigator.userAgent.indexOf('MSIE') != -1;
//Tab标签
//第一个参数为包着内容及标签的外DIV的ID或者是CLASS格式为("#id名称")
//第二个参数为标签的名称Class  或者是ul li  标签格式为<a href="#内容的ID" more></a>
//第三个参数是A的样式名称，
//第四个参数为内容的名称Class  或者是ul li
//Type为0单击。1为鼠标经过
function TabFun(ObjName, TabName, TabCss, ContentName, Type,more) {
    var Obj = $(ObjName);
    if (Obj.length > 0) {
        Obj.find(ContentName).hide();
        Obj.find(TabName + ":first").addClass(TabCss).show();
        if (more) {
            Obj.find(more).attr("href", Obj.find(TabName + ":first").attr("more"));
        }
        Obj.find(ContentName + ":first").show();
        if (Type == "1") {
            Obj.find(TabName).bind("mouseover", function() {
                Obj.find(TabName).removeClass(TabCss);
                if (more) {
                    Obj.find(more).attr("href", $(this).attr("more"));
                }
                $(this).addClass(TabCss);
                Obj.find(ContentName).hide();
                var activeTab = $(this).attr("href");
                activeTab = activeTab.substr(activeTab.indexOf("#"));
                Obj.find(activeTab).show();
                $(this).blur();
                return false;
            });
        } else {
            Obj.find(TabName).bind("click", function() {
                Obj.find(TabName).removeClass(TabCss);
                if (more) {
                    Obj.find(more).attr("href", $(this).attr("more"));
                }
                $(this).addClass(TabCss);
                Obj.find(ContentName).hide();
                var activeTab = $(this).attr("href");
                activeTab = activeTab.substr(activeTab.indexOf("#"));
                Obj.find(activeTab).show();
                $(this).blur();
                return false;
            });
        }
    }
}
///执行AJAX函数
///第一个参数 地址
///第二个参数 传递参数
///第三个参数 函数或者是返回值的ID或者是CLASS JQUERY对象格式
///第四个参数 同上，只是是错误参数
function AjaxFun(Url, Data, Function, ErrorFunction) {
    var url = location.href;
    if(UrlEqual(url,Url)) {
        DoMainAjaxFun(Url, Data, Function, ErrorFunction);
    }else{
        $.getScript(Url + (Url.indexOf("?")==-1?"?":"&") + Data+"&otherurl=1&Time="+Math.random(),function()
        {
            if(typeof (Function) == "function")
            {
                Function();
            }
        });
    }
}

//判断两个地址是否相同
function UrlEqual(url1, url2) {
    if (url2.indexOf("://") != -1) {
        var Url1_1 = url1;
        var Url2_1 = url2;
        var Url1_i = url1.indexOf("://");
        var Url2_i = url2.indexOf("://");
        if (Url1_i != -1) {
            Url1_1 = url1.substring(Url1_i + 3);
        }
        if (Url2_i != -1) {
            Url2_1 = url2.substring(Url2_i + 3);
        }
        Url1_i = Url1_1.indexOf("/");
        Url2_i = Url2_1.indexOf("/");
        if (Url1_i != -1) {
            Url1_1 = Url1_1.substring(0, Url1_i);
        }
        if (Url2_i != -1) {
            Url2_1 = Url2_1.substring(0, Url2_i);
        }
        if (Url1_1.toLowerCase() == Url2_1.toLowerCase()) {
            return true;
        }
        else {
            return false;
        }
    } else {
        return true;
    }
}

///js AJAX分页
function SYCmsPage(Page, ObjI, TemUrl, QueryString, ObjClassName) {
    var obj = $(ObjClassName ? ObjClassName : ".SYCms_Tem_PageList");
    if (obj.length >= ObjI) {
        obj.eq(ObjI).html("Loading......");
        AjaxFun(TemUrl, QueryString + "&View=ajax&Page=" + Page + "&Obji=" + ObjI);
    }
}
///分页显示
function SYCmsPageView(ObjI, Html, ObjClassName) {
    var obj = $(ObjClassName ? ObjClassName : ".SYCms_Tem_PageList");
    if (obj.length >=ObjI) {
        var Tobj=obj.eq(ObjI);
        Tobj.html("").before(Html);
        Tobj.remove();
    }
}

///执行代码之后返回HTML  Ajax配置使用
function RunJavaScript(Html, Function, NoScript) {
    var regExp = /<script[^>]*>([\s\S]*?)<\/script>/gi;
    var ajaxjavascript1 = /<script.+?>/gi;
    var ajaxjavascript2 = /<\/script>/gi;
    var returnValue = Html.replace(regExp, "");
    javarun = Html.replace("\n", "").replace("\r", "").match(regExp);
    var jlzrun = "";
    if (javarun != null) {
        for (var j = 0; j < javarun.length; j++)
            jlzrun = jlzrun + javarun[j];
    }
    if (jlzrun != "" && !NoScript) {
        jlzrun = jlzrun.replace(ajaxjavascript1, "");
        jlzrun = jlzrun.replace(ajaxjavascript2, "");
        setTimeout(function() {
            eval(jlzrun);
            jlzrun = null;
            IECollectGarbage();
        }, 30);       //1秒后执行
    }
    regExp = null;
    ajaxjavascript1 = null;
    ajaxjavascript2 = null;
    return returnValue;
}
//Ajax调入 地址   传送数据    弹出窗口显示内容   函数/#.格式的字段串    要显示的上级DIV     Window
function DoMainAjaxFun(Url, Data, Function, ErrorFunction) {
    var yUrl = Url;
    if (Url.indexOf("?") == -1) {
        Url += "?time=" + Math.random();
    } else {
        Url += "&time=" + Math.random();
    };
    $.ajax({
        type: "POST",
        url: Url,
        data: Data,
        cache: false,
        dataType: "html",
        success: function (html) {
            if (Function) {
                if (typeof (Function) == "string") {
                    html = RunJavaScript(html, Function);
                    if (html.length > 0) {
                        $(Function).show().html(html);
                    }
                } else if (typeof (Function) == "function") {
                    (Function)(RunJavaScript(html, Function));
                }
            } else {
                RunJavaScript(html);
            }
        },
        error: function (html) {
            if (ErrorFunction) {
                if (typeof (ErrorFunction) == "function") {
                    ErrorFunction();
                }
            }
        }
    });
    yUrl = null;
}