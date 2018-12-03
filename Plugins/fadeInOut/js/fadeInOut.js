/**
 * Created by wangzheng on 2016/4/26.
 */

//fadeInOut
(function($){
    //为jQuery的原型对象添加“fadeInOut”方法
    $.prototype.fadeInOut=function(obj){

        //------------------------向页面添加元素---------------------------------------
        // 添加存放图片的ul
        var imgUl=$('<ul></ul>');

        //设置存放图片的ul的样式
        imgUl.css({"width":"100%","height":"100%","overflow":"hidden","position":"relative","list-style":"none"});

        //向ul里面循环添加图片
        for(var i=0;i<obj.imgSrcArr.length;i++){
            var oLi=$('<li></li>');
            var oImg=$('<img src='+obj.imgSrcArr[i]+'>');
            oLi.append(oImg);
            imgUl.append(oLi);
        }
        //设置img标签以及外面的li的样式
        imgUl.find('li').css({"width":"100%","height":"100%","position":"absolute","top":"0","left":"0"});
        imgUl.find('img').css({"width":"100%","height":"100%"});

        //创建小圆点ul
        var iconUl=$('<ul></ul>');

        //设置小圆点ul的样式
        iconUl.css({"position":"absolute","left":obj.iconLeft,"top":obj.iconTop,"list-style":"none"});

        //向小圆点ul中添加li
        for(var i=0;i<obj.imgSrcArr.length;i++){
            var iconLi=$('<li></li>');
            iconUl.append(iconLi);
        }
        //设置小圆点li的样式
        iconUl.find('li').css({"float":"left","width":"11px","height":"11px","margin-right":"10px","background":"url("+obj.iconBgUrl+") no-repeat"});

        //向对象中添加图片和小圆点标签
        this.css({"position":"relative"});
        this.append(imgUl);
        this.append(iconUl);

        //--------------------------动画效果----------------------------------------------

        var index=0;
        var timer;

        //鼠标移入移出小圆点
        var dotLi=iconUl.find('li');

        dotLi.each(function(){
            $(this).hover(function(){
                //清空定时器，停止自动播放
                clearInterval(timer);
                //记录小圆点是第几个，以确定移出小圆点从哪一张开始播放
                index=$(this).index();

                //更改小圆点的背景图片
                $(this).css({"background":"url("+obj.active_iconBgUrl+")"}).siblings().css({"background":"url("+obj.iconBgUrl+")"});

                //显示小圆点对应的图片
                imgUl.find('li').eq(index).fadeIn().siblings().fadeOut();

            },function(){autoPlay();});
        });


        //自动播放函数
        function autoPlay(){

            timer=setInterval(function(){

                //改变小圆点的背景
                iconUl.find('li').eq(index).css({"background":"url("+obj.active_iconBgUrl+")"}).siblings().css({"background":"url("+obj.iconBgUrl+")"});

                //显示和隐藏图片
                imgUl.find('li').eq(index).fadeIn().siblings().fadeOut();

                //如果到达了最后一张图片，则从第一张图片开始播放
                if(index>obj.imgSrcArr.length-1){index=-1;}
                index++;

            },obj.time);

        }
        autoPlay();

        return this;
    }
}(jQuery));



