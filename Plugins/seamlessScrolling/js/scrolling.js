/**
 * Created by wangzheng on 2016/4/11.
 */

(function($){
    //为jQuery的原型对象添加方法
    $.fn.scroll=function(obj){

        //添加ul标签
        var oUl=$('<ul></ul>');

        oUl.css({"width":(obj.imgMargin+obj.imgWidth)*obj.imgSrcArr.length*2,"height":"100%","position":"absolute","left":0,"top":0,"list-style":"none","margin":0,"padding":0});


        //向ul标签添加li标签，li标签添加img标签
        for(var i= 0;i<obj.imgSrcArr.length;i++){
            var oLi=$('<li></li>');
            oLi.css({"height":"100%","width":obj.imgWidth,"float":"left","margin-left":obj.imgMargin});
            var oImg=$('<img>');
            oImg.attr("src",obj.imgSrcArr[i]);
            oImg.css({"width":"100%","height":"100%"});
            oLi.append(oImg);
            oUl.append(oLi);
        }

        //设置oUl的内容为两倍
        var html=oUl.html()+oUl.html();
        oUl.html(html);
        this.append(oUl);

//        让oUl滚动起来
        function scroll(){
            //oUl的左值偏移
            var oUlLeft=oUl.position().left;
            oUlLeft-=obj.speed;
            //重新设置oUl的left值
            oUl.css("left",oUlLeft);

            //如果滚动到最后，将oUl的left值设为零
            if(oUl.position().left<=-oUl.width()/2){
                oUl.css("left","0");
            }
        }

       var timer= setInterval(scroll,10);

        //鼠标移入，停止滚动，移出，继续滚动
        this.hover(function(){
            clearInterval(timer);
        },function(){
           timer=setInterval(scroll,10);
        })

    }
}(jQuery));