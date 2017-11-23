/**
 * Created by lian on 2017/11/21.
 */

export const common={
    initInfo(cls, val){
        let self=this;
        $(cls).each(function () {
            if ($(this).attr('data-value') == val) {
                self.toggleCls($(this), cls, 'lightH');
                return false;
            }
        })
    },
    toggleCls($obj, cls, active){
        $obj.addClass(active).siblings(cls).removeClass(active);
    }
};