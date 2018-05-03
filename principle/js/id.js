/**
 * Created by wangzheng on 2016/7/8.
 */

function LMObject(){
}
var $=function(selector){

    var a=selector.substring(0,1);

    var lmObject=new LMObject();

    if(a=="#"){
       lmObject.data=document.getElementById(selector.substring(1,selector.length));
        return lmObject;
    }
};

LMObject.prototype={
    
    text:function(text){
       this.data.innerText=text;
    }
};