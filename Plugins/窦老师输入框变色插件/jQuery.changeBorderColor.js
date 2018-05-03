/**
 * Created by wangzheng on 2016/4/27.
 */
jQuery.prototype.changeBorderColor=function(message){
    //选择并处理命中的Dom元素，挂接相应的事件
    //这里的this指的是jQuery对象
    var message=$("<span>"+message+"</span>");

    this.focusin(function(){
        $(this).parent().append(message);
    });
    this.focusout(function(){
        message.remove();
    })

}