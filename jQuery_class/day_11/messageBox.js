//MessageBox 
// MessageBox 可以通过new  方法创建对象
// 对象是干什么的？
// 在用户界面展示一个弹框，弹框有确定和取消按钮，用户点击按钮可以知道是点了那个
// 对象 ？ 属性：确定按钮、取消按钮、弹框、展示的文本内容（标题、描述）
//        方法：用户点击确定或者取消的时候能通知用户，隐藏弹框
//        如何通知用户（告诉外界，到底点了哪个按钮）？
//        通过回调函数---》外界传给对象函数，当外界点击了确定或者取消按钮的
//        时候，调用传进来的回调函数
//        回调函数？函数作为参数传入
//        回调函数什么时候执行？ ----》满足一定条件的时候会执行
//        此案例当中的条件？点击按钮


// jQuery弹窗组件插件

// 组件和插件？
// 相同点：都能够实现某个功能或者效果
// 不同点：
// 1、组件不依赖任何库
// 2、插件依赖于某一个或者多个库（例如jQuery插件）


/**
 * 
 * @param {String} title : 弹窗的标题
 * @param {String} content ：弹窗的内容
 * @param {Function} confirm ：点击确定按钮的回调函数
 * @param {Function} cancel ：点击取消按钮的回调函数
 */
function MessageBox(title, content, confirm, cancel) {
    this.box = $('<div></div>');
    this.confirmBtn = $('<button>确定</button>');
    this.cancelBtn = $('<button>取消</button>');
    this.title = title;
    this.content = content;
    this.confirm = confirm;
    this.cancel = cancel;
}

MessageBox.prototype = {
    init: function() {
        // 渲染整个弹窗的样式
        this.renderStyle();

        //添加弹窗
        this.addMessageBox();

        // 绑定事件
        this.bindEvent();
    },
    renderStyle: function() {
        this.box.css({
            'width': 300,
            'height': 200,
            'position': 'fixed',
            'left': 0,
            'top': 0,
            'bottom': 0,
            'right': 0,
            'margin': 'auto',
            'background-color': '#eee',
            'display': 'none'
        });

        this.confirmBtn.css({
            'width': 60,
            'height': 30,
            'background-color': '#999'
        });

        this.cancelBtn.css({
            'width': 60,
            'height': 30,
            'background-color': '#999'
        });
    },
    addMessageBox: function() {
        this.box.append('<h2>' + this.title + '</h2>');
        this.box.append('<p>' + this.content + '</p>');

        // 将两个按钮添加到盒子
        this.box.append(this.confirmBtn);
        this.box.append(this.cancelBtn);

        // 将创建的对话框添加到文档当中
        $('body').append(this.box);
    },
    bindEvent: function() {
        // 事件处理函数中的this指绑定的DOM对象
        let self = this;

        // 为确定按钮绑定点击事件
        this.confirmBtn.on('click', function() {
                // 执行外界传来的回调函数
                self.confirm();
                // 隐藏自身
                self.hide();
            }),
            //为取消按钮绑定点击事件 
            this.cancelBtn.on('click', function() {
                // 执行外界传来的回调函数
                self.cancel();
                // 隐藏自身
                self.hide();
            })
    },
    show: function() {
        this.box.css({
            display: 'block'
        })
    },
    hide: function() {
        this.box.css({
            display: 'none'
        })
    }
}