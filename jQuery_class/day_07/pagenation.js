$.fn.createPage = function(obj) {

    let self = this;

    let disabledBoolean = false;

    // 创建页码
    for (let i = 0; i < obj.pageCount; i++) {
        let page = null;
        if (i == 0) {
            page = $('<span class="page_item active">' + (i + 1) + '</span>');
        } else {
            page = $('<span class="page_item">' + (i + 1) + '</span>');
        }

        this.find('.page_wrap').append(page);
    }

    $('.page_item').on("click", function() {
        obj.callback($(this).index() + 1);
    })

    //按钮
    this.find('.prev').on('click', prevClickHandler);
    this.find('.next').on('click', nextClickHandler);

    function prevClickHandler() {

        if (obj.current == 0) {
            obj.current = 0;
            disabledBoolean = true;
        } else {
            disabledBoolean = false;
            obj.current--;
        }
        changeBg();
    }

    function nextClickHandler() {

        changeBg();

        if (obj.current == obj.pageCount - 1) {
            // 到了最后一页了
            obj.current = obj.pageCount - 1;
            // 禁用下一页按钮
            disabledBoolean = true;

        } else {
            disabledBoolean = false;
            obj.current++;
        }
    }

    function changeBg() {
        if (disabledBoolean) return;
        console.log(obj.current)
            // console.log(this);
        self.find('.page_wrap').find('.page_item').removeClass('active').eq(obj.current).addClass('active');
    }
}