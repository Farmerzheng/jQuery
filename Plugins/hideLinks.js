/**
 * Created by wangzheng on 2016/9/14.
 */
jQuery.fn.hideLinks = function () {
    this.find('a[href]').hide();
    return this;
};