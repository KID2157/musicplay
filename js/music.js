/*
    分析：
    1、获取li的index()
    2、更换背景图片
    3、更换播放器图片、文本
    4、更换播放按钮及title
    5、图片旋转
    6、歌曲播放
    其他：
    1、暂停/播放
    2、上一首/下一首
    3、播放器可以显示与隐藏
 */
//准备工作收集数据
var index = 0;  //li初始索引
var li = $(".banner ul li");    //获取所有li元素
var img = $(".music .m_img img");    //获取播放器img元素
var text = $(".music .m_text");    //获取播放器m_text元素
var prev = $(".music .m_btn .m_prev");    //获取播放器上一首a元素
var play = $(".music .m_btn .m_play");    //获取播放器暂停/播放a元素
var next = $(".music .m_btn .m_next");    //获取播放器下一首a元素
var mp3 = $(".music .m_mp3");    //媒体元素
var flag = false;   //歌曲是否播放的标记 true为播放 flase为暂停
var close = false;  //播放器曲是否显示 true为显示 flase为隐藏

/* 获取点击的li的索引*/
li.click(function () {
    //获取当前点击的li索引
    index = $(this).index();
    //播放歌曲
    show();
});

/*封装函数方便调用播放*/
function show() {
    //更换背景图片+1，因为索引从0开始，图片名称是从1开始
    change_bg(index + 1);
    //更换播放器图片、文本
    change_img_text(index + 1)
    //更换播放按钮及title为暂停
    change_btn_title();
    //图片旋转
    img_rotate()
    //播放歌曲
    play_mp3();
}

/*更换背景图片 */
function change_bg(idx) {
    $("body").css({
        "background": "url(img/" + idx + ".jpg) no-repeat",
        "background-size": " cover"
    });
}

/*更换播放器图片、文本 */
function change_img_text(idx) {
    img.attr("src", "img/" + idx + ".jpg"); //更换播放器图片
    text.html(li.eq(index).attr("title"));  //获取li的title属性然后替换文本
}

/*更换播放按钮及title为暂停*/
function change_btn_title() {
    play.removeClass("m_play"); //移除原有的播放样式
    play.addClass("m_pause");   //添加新的暂停样式
    play.attr("title", "暂停"); //更换title
}

/*图片旋转 */
function img_rotate() {
    //移除所有img的图片旋转
    li.children().removeClass("img_rotate");
    //给当前点击的li添加图片旋转
    li.eq(index).children().addClass("img_rotate");
}

/*播放歌曲 */
function play_mp3() {
    //获取选中的li的datasrc属性
    mp3.attr("src", li.eq(index).attr("datasrc"));
    //播放歌曲
    mp3.get(0).play();  //get(0)：取到多个结果播放第一个
    //修改歌曲是否播放的标记
    flag = true;
}

/*暂停或者播放歌曲 */
play.click(function () {
    /**
     * 如果歌曲播放
     * 1、暂停歌曲
     * 2、图片旋转停止
     * 3、暂停按钮更换为播放
     * 4、title更换为播放
     */
    if (flag) {
        //暂停歌曲
        mp3.get(0).pause();
        //移除图片旋转
        li.eq(index).children().removeClass("img_rotate");
        //暂停按钮更换为播放按钮，title更换为播放
        play.removeClass("m_pause").addClass("m_play").attr("title", "播放");
        //修改歌曲是否播放的标记
        flag = false;
    } else {
        /**
         * 如果歌曲暂停
         * 1、播放歌曲
         * 2、图片旋转
         * 3、播放按钮更换为暂停
         * 4、title更换为暂停
        */
        //播放歌曲
        mp3.get(0).play();
        //图片旋转
        li.eq(index).children().addClass("img_rotate");
        //播放按钮更换为暂停按钮，title更换为暂停
        play.removeClass("m_play").addClass("m_pause").attr("title", "暂停");
        //修改歌曲是否播放的标记
        flag = true;
        //第一次进入页面直接点击播放按钮时的背景处理
        change_bg(index + 1);
    }
});

/*上一首 */
prev.click(function () {
    index--;
    if (0 > index) {
        index = li.length - 1;
    }
    //播放歌曲
    show();
});

/*下一首 */
next.click(function () {
    index++;
    if (li.length - 1 < index) {
        index = 0;
    }
    //播放歌曲
    show();
});

/*播放器的隐藏显示 */
$(".m_close").click(function () {
    //如果显示则隐藏，添加样式
    if (close) {
        $(this).addClass("m_open");
        //添加向左移动样式
        $(".music").animate({ "left": "-520px" }, 800);
        close = false;
    } else {
        //如果隐藏则显示，移除样式
        $(this).removeClass("m_open");
        //恢复初始值
        $(".music").animate({ "left": "0px" }, 1000);
        close = true;
    }
});
