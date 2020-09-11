$.extend({
    min : (a, b) => a > b ? b : a,
    max : (a, b) => a > b ? a : b,
    leftTrim : (str) => str.replace(/^\s+/, ''),
    rightTrim : (str) => str.replace(/\s+$/, '')
});
$.fn.extend({
    checkAll : function(){
        this.prop('checked', true);
    },
    checkNoAll : function(){
        this.prop('checked', false);
    },
    reverseCheck : function(){
        this.each(function(){
            this.checked = !this.checked;
        });
    }
})