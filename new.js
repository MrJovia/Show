$(function(){
    var $width=$(window).width();
    $(".slider-pics img").width($width);
    $(".slider-circle").width($width);


    $("#menuBtn").on('click',function(){
        if(!$('#menuBtn').hasClass("open")){
          $("#menu").css({'display':'block','z-index':'10'});
         $("#menuBtn").addClass("open");
        }
        else{
            $("#menuBtn").removeClass("open");
            $("#menu").css({'display':'none'});
        }
    })

    function play(preIndex,currentIndex){
        // 前一张图片淡出，让后一张图片淡入
        $('.slider-pics').eq(preIndex).fadeOut(500).parent().children().eq(currentIndex).fadeIn(1000);
        // 移除让小圆点被选中的类
        $('.slider-item').removeClass('slider-item-selected');
        // 又立即让当前图片对应的小圆点被选中，当前的小圆点就是白色的
        $('.slider-item').eq(currentIndex).addClass('slider-item-selected');
    }

    var currentIndex = 0;
    var length = $('.slider-pics').length;
    function pre(){
        var preIndex = currentIndex;
        currentIndex = (--currentIndex + length) % length;
        play(preIndex, currentIndex);
    }

    function next(){
        var preIndex = currentIndex;
        currentIndex = ++currentIndex % length;
        play(preIndex, currentIndex);
    }

    var interval, hasStarted = false;

    function start(){
        if(!hasStarted){
            hasStarted = true;
            interval = setInterval(next,3000);  
            //定时器 serInterval(第一个参数就是那个要调用的函数 ,第二个参数就是我们指定的时间间隔 )
        }
    }

    function stop(){
        clearInterval(interval);
        hasStarted=false;
        //clearInterval()方法可以帮我们结束setInterval的动作
    }

    start(); //确保页面打开时，图片就在轮播中

    $('.slider-pics:not(:first)').hide();
    $('.slider-item:first').addClass('slider-item-selected');
    $('.slider-button').hide();
    $('.slider-pics, .slider-pre, .slider-next').hover(function(){
        stop();
        $(".slider-button").show();
    },function(){
        $('.slider-button').hide();
        start();
    });

    $('.slider-item').hover(function(){
        stop();
        var preIndex = $(".slider-item").filter(".slider-item-selected").index();
        currentIndex = $(this).index();
        play(preIndex,currentIndex);
    },function(){
        start();
    });

    $('.slider-pre').on('click',function(){
        pre();
    });
    $('.slider-next').on('click',function(){
        next();
    });
})

