if(!/\[native code\]/.test(Object.create)){
    Object.create = function(a){
        var f = function(){}
        f.prototype = a;
        return new f()
    }
}