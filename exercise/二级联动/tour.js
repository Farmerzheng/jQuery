/**
 * 乐美公司工具库, 可以在组件库和页面代码中使用。
 * 该文件描述了若干库函数
 * 1. 日志
 * 2. 取url查询参数
 * 3. ...
 *
 *
 * Created by 豆连军 on 2016-08-22.
 * MODIFIED BY linizou on 2016-12-5.
 */
//config part
//for test
//window.NemoConf={apiServer:'http://101.200.194.25:8083/cits/'
//    ,picServer:'http://101.200.194.25:8083/'};
//for online

window.NemoConf={apiServer:'http://www.ac.citsmice.com.cn/'
    ,picServer:'http://www.ac.citsmice.com.cn/'};


// 定义命名空间
window.Nemo = window.Nemo || {};
window.Nemo.config = window.NemoConf ;

//Nemo.config.apiServer='http://101.200.194.25:8083/cits/';

/**
 * 弹出模态警告框
 * @param title  {string}   标题
 * @param msg   {string}   消息体
 * @param callback {function}  回调函数，参数为按钮点击结果false类型: true-确定按钮 false-取消按钮
 */
window.Nemo.showModalAlert = function (title, msg, callback) {
    var sHtml =
['    <div class="modal fade" id="ncModalAlert">',
'    <div class="modal-dialog modal-sm">',
'    <div class="modal-content">',
'    <div class="modal-header">',
'    <button type="button" class="close" data-dismiss="modal"><span>&times;</span><span >Close</span></button>',
'    <h4 class="modal-title">'+title+'</h4>',
'    </div>',
'    <div class="modal-body">',
'    <p class="modal-msg">'+msg+'</p>',
'    </div>',
'    <div class="modal-footer">',
'    <button type="button" class="btn btn-primary nc-ok" data-dismiss="modal">确定</button>',
'    <button type="button" class="btn btn-default nc-cancel" data-dismiss="modal">取消</button>',
'    </div>',
'    </div><!-- /.modal-content -->',
'    </div><!-- /.modal-dialog -->',
'    </div><!-- /.modal --> '].join("")



    if ($("#ncModalAlert").length == 0) {
        $("body").append(sHtml);
    }else{
        $("#ncModalAlert .modal-title").text(title) ;
        $("#ncModalAlert .modal-msg").text(msg) ;
    }
    document.querySelector("#ncModalAlert .nc-ok").onclick = function(){
        callback(true) ;
    }
    document.querySelector("#ncModalAlert .nc-cancel").onclick = function(){
        callback(false) ;
    }
    $("#ncModalAlert").modal("show");

}

/**
 * 解析并获得url查询参数
 * @param a  url网址
 * @returns {string} 查询参数值
 */
window.Nemo.getParameterByName =  function (a,url) {
    a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var c = new RegExp("[\\?&]" + a + "=([^&#]*)"), b = c.exec(location.search);
    if(url){
        b = c.exec(url);
    }
    return b == null ? "" : decodeURIComponent(b[1].replace(/\+/g, " "))
}

/**
 * 生成日志信息
 * 用法：Nemo.log()
 */
window.Nemo.log= (function(){
    var s = ''+(new Date()).valueOf()+Math.floor(Math.random()*100000); // 时间戳
    return function(){
        var p = 1,
            c = Nemo.getParameterByName("c") || 0,
            a = "",
            f = encodeURIComponent(location.href),
            t = (new Date()).valueOf(); // 时间戳
        var url = "//sta.nemo-tec.com/v.gif?a="+a+"&s="+s+"&p="+p+"&c="+c+"&f="+f+"&_m="+t ;
        var img=new Image();
        img.src=  url ;
    } ;
})() ;

/**
 * 乐美后台通信函数(jsonp)
 * @param data {object} 上传参数集合
 * @param ajaxBtn {string|Element} 上传按钮
 * @param fnSuccess  {function}  成功后的回调函数, 参数为返回的json对象
 * @param fnError {function}  失败后的回调函数
 */
window.Nemo.tourajax = function (url,data,fnSuccess,fnError,method){

    var msg = "ok" ;

    method=method|| "get";

    var timeout = 5000 ; // 5秒超时

    var backtime = 3000 ; // 3秒恢复按钮状态

    fnSuccess = fnSuccess || function(){} ;

    fnError = fnError || function(){} ;

    //config url + request url .
    // url = Nemo.config.apiServer+url ;

    var dataType = "jsonp";

     //对$.ajax網絡請求函數进行再封装    
    $.ajax({
        
        dataType: dataType,
        url: url,
        data: data,
        timeout: timeout,
        type:method,

        success: function(data,textStatus,jqXHR){
            console.log(data);
            if(data.code==200)
            {
              // fnSsuccess:  function (responseText){

              //   }

                fnSuccess(data.rz) ;

            }else if(data.code==300){
                if(typeof(data.rz)== "string")
                //TODO modal window
                if(data.rz=="sessionid错误"){
                    alert("sessionid错误，请先登录！！！");
                    window.location.href="index.html";
                }else{
                    alert(data.rz);
                }
            }
       },
        complete : function(jqXHR, textStatus){//请求完成后最终执行参数
            var msg = "失败" ;
            switch (textStatus){
                case "success" :
                    msg = "成功" ;
                    break ;
                case "notmodified" :
                    msg = "未修改" ;
                    break ;
                case "nocontent" :
                    msg = "无内容" ;
                    break ;
                case "error" :
                    msg = "错误" ;
                    break ;
                case "timeout" :
                    msg = "超时" ;
                    break ;
                case "abort" :
                    msg = "被取消" ;
                    break ;
                case "parsererror" :
                    msg = "数据解析错误" ;
                    break ;
            }
            if(msg != "成功"){
                fnError() ;
            }
        }
    });//$.ajax end
    console.log("tourajax called!");
}


/**
 * 乐美后台通信函数(jsonp)
 * @param data {object} 上传参数集合
 * @param ajaxBtn {string|Element} 上传按钮
 * @param fnSuccess  {function}  成功后的回调函数, 参数为返回的json对象
 * @param fnError {function}  失败后的回调函数
 */
window.Nemo.ajax = function (data,ajaxBtn,fnSuccess,fnError){
    var msg = "ok" ;
    var timeout = 5000 ; // 5秒超时
    var backtime = 3000 ; // 3秒恢复按钮状态

    fnSuccess = fnSuccess || function(){} ;
    fnError = fnError || function(){} ;


    var url = Nemo.config.apiServer ;
    if((typeof data) == "string"){
        url = data ;
        data = {} ;
    }else{
        if(!data || !(data.action)){
            // data必须有数据，且action参数必须有
            var sBtnCaption = $(ajaxBtn).text() ;
            msg = "通信参数不正确！";
            $(ajaxBtn).text(msg)
                .addClass("nc-ajaxBtn-error")
            setTimeout(function(){
                $(ajaxBtn).removeClass("nc-ajaxBtn-error") ;
                $(ajaxBtn).text(sBtnCaption)
            },backtime) ;
            return false ;
        }
        data.format = data.format || "jsonp" ; // 默认为jsonp通信方式

    }
    var dataType = "jsonp" ;

    $(ajaxBtn).addClass("nc-ajaxBtn-processing")
    $.ajax({
        dataType: dataType,
        url: url,
        data: data,
        timeout: timeout,
        success: function(data,textStatus,jqXHR){
            $(ajaxBtn).addClass("nc-ajaxBtn-success")
            setTimeout(function(){
                $(ajaxBtn).removeClass("nc-ajaxBtn-success") ;
                $(ajaxBtn).text(sBtnCaption)
            },backtime) ;
            fnSuccess(data) ;
        },
        complete : function(jqXHR, textStatus) { //请求完成后最终执行参数
            $(ajaxBtn).removeClass("nc-ajaxBtn-processing")
            var msg = "失败" ;
            switch (textStatus) {
                case "success" :
                    msg = "成功" ;
                    break ;
                case "notmodified" :
                    msg = "未修改" ;
                    break ;
                case "nocontent" :
                    msg = "无内容" ;
                    break ;
                case "error" :
                    msg = "错误" ;
                    break ;
                case "timeout" :
                    msg = "超时" ;
                    break ;
                case "abort" :
                    msg = "被取消" ;
                    break ;
                case "parsererror" :
                    msg = "数据解析错误" ;
                    break ;
            }
            if(msg != "成功"){
                var sBtnCaption = $(ajaxBtn).text() ;
                $(ajaxBtn).text(msg) ;
                $(ajaxBtn).addClass("nc-ajaxBtn-error")
                setTimeout(function(){
                    $(ajaxBtn).removeClass("nc-ajaxBtn-error") ;
                    $(ajaxBtn).text(sBtnCaption)
                },backtime) ;
                fnError() ;
            }
        }
    });
}

/**
 * 乐美SOYA交易通信函数
 * @param action {string} 接口ID
 * @param data {object} 接口参数集合, jsonp模式需要加callback参数
 * @param fnSuccess  {function}  成功后的回调函数, 参数为返回的json对象
 * @param fnError {function}  失败后的回调函数
 * @param isSync {boolean} 是否异步方式: false -- 默认值, 不适用于jsonp
 *
 */
window.Nemo.doAction = function (action,data,fnSuccess,fnError,isSync){
    /**
     * 参数检查 begin
     */
    if(!action){
        console.log("action参数不能为空！")
        return false ;
    }
    data = ((typeof data) == "object")? data : {} ;
    fnSuccess = ((typeof fnSuccess) == "function")? fnSuccess : (function(){}) ;
    fnError = ((typeof fnError) == "function")? fnError : (function(){}) ;
    isSync = !!isSync ;
    /**
     * 参数检查 end
     */

    var msg = "ok" ;
    var timeout = Nemo.config.ajaxTimeOut; // 通信超时
    var url = Nemo.config.apiServer ; // 接口服务器网址


    data.format = "json" ;
    data.action = action ;
    var dataType = data.callback ? "jsonp": "json" ;
    var callback = data.callback ;
    delete data.callback ;

    $.ajax({
        dataType: dataType,
        url: url,
        data: data,
        jsonpCallback: callback,
        cache: false,
        async: !isSync,
        timeout: timeout,
        success: function(data,textStatus,jqXHR){
            fnSuccess(data) ;
        },
        complete : function(jqXHR, textStatus) { //请求完成后最终执行参数
            var msg = "失败" ;
            switch (textStatus) {
                case "success" :
                    msg = "成功" ;
                    break ;
                case "notmodified" :
                    msg = "未修改" ;
                    break ;
                case "nocontent" :
                    msg = "无内容" ;
                    break ;
                case "error" :
                    msg = "错误" ;
                    break ;
                case "timeout" :
                    msg = "超时" ;
                    break ;
                case "abort" :
                    msg = "被取消" ;
                    break ;
                case "parsererror" :
                    msg = "数据解析错误" ;
                    break ;
            }
            if(msg != "成功"){
                fnError(msg) ;
            }
        }
    }) ;
}
/**
 * 是否手机移动设备
 * @returns {boolean}   true:是 false: 否
 */
window.Nemo.isMobile = function(){
    var is_mobi =navigator.userAgent.toLowerCase().match(/(ipod|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;
    return is_mobi ;
}


// 兼容各种浏览器的添加事件和移除事件函数。
;(function (){

    function fixEvent(event) {
        event.preventDefault = fixEvent.preventDefault;
        event.stopPropagation = fixEvent.stopPropagation;
        return event;
    };
    fixEvent.preventDefault = function() {
        this.returnValue = false;
    };
    fixEvent.stopPropagation = function() {
        this.cancelBubble = true;
    };

    function handleEvent(event) {
        var returnValue = true;
        event = event || fixEvent(window.event);
        var handlers = this.events[event.type];
        for (var i in handlers) {
            this.$$handleEvent = handlers[i];
            if (this.$$handleEvent(event) === false) {
                returnValue = false;
            }
        }
        return returnValue;
    };

    function addEvent(element, type, handler) {
        if (!handler.$$guid) handler.$$guid = addEvent.guid++;
        if (!element.events) element.events = {};
        var handlers = element.events[type];
        if (!handlers) {
            handlers = element.events[type] = {};
            if (element["on" + type]) {
                handlers[0] = element["on" + type];
            }
        }
        handlers[handler.$$guid] = handler;
        element["on" + type] = handleEvent;
    }

    addEvent.guid = 1;
    window.Nemo.addEvent = addEvent ;

    function removeEvent(element, type, handler) {
        if (element.events && element.events[type]) {
            delete element.events[type][handler.$$guid];
        }
    }
    window.Nemo.removeEvent = removeEvent ;

}) ()

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (prefix){
        return this.slice(0, prefix.length) === prefix;
    };
}

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}
