$('.nav-item').on('mouseover', function() {
    $('.bar').stop().width(0);
    $(this).find('.bar').stop().animate({
        width: ($(this).width() + 20)
    })
})