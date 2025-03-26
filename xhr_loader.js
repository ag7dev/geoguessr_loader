(()=>{
    const _ = window, __ = XMLHttpRequest.prototype;
    [__._open, __._send] = [__.open, __.send];
    
    __.open = function(a,b) {
        this.__m = a;
        this.__u = b;
        return __._open.apply(this,arguments);
    };
    
    __.send = function(d) {
        this.addEventListener('load', () => {
            try{_.postMessage({t:'rx',d:this.response},_)}catch{}
        });
        return __._send.call(this,d);
    };

    _.ƒ = _.fetch;
    _.fetch = async (...a) => {
        let r = await _.ƒ(...a);
        r.clone().blob().then(b => _.postMessage({t:'ft',d:b},_));
        return r;
    };
})();