!function(w, d) {
     function Obj(obj) {
        let ops = {
            props: {},
            funcs:[],
            str:'',
            object:{
                keys:(function(obj){let k=[];for (let pkey in obj){k.push(pkey)} return k})(obj),
                get values(){try {return (function(obj){let k=[];for (let pkey in obj){k.push(obj[pkey])} return k})(obj)}catch (err) {return err}}
            },
            OwnPropertys:{
                    //props_by_descriptors:{has_GET:{},has_VALUE:{}},
                descriptors: Object.getOwnPropertyDescriptors(obj.call?obj.__proto__:obj),
                names: Object.getOwnPropertyNames(obj.call?obj.__proto__:obj),
            },
            get toString() {
                return tmpstr
            }
        }
          , tmpstr = ''
        
        for (let propkey in ops.object.keys) {
            try {
                ops.props[ops.object.keys[propkey]] = obj[ops.object.keys[propkey]];
                if (ops.object.keys[propkey]) tmpstr += `${ops.object.keys[propkey]}: "${ops.object.values[propkey]}"  ${typeof obj[ops.object.keys[propkey]]};\n`;//,
                if (typeof obj[ops.object.keys[propkey]]==='function') ops.funcs.push(ops.object.keys[propkey]);
            } catch (err) {
                ops.props[ops.object.keys[propkey]] = err;
            }
        };
        ops.str=tmpstr?tmpstr:obj.toString();
        return ops
    }
    function Func(f){
        return {
            ftext:f.toString(),
            args:f.toString().match(/^function(?:\s+\w+)?\s*\(([^\)]+)/m)[1]
            }
    }
    function listenCall (method, callback, targobj) {
        if (typeof method !== "string" || typeof callback !== "function") return;targobj = targobj || window; (function(objMethod) {
            targobj[method] = function() {
                try { callback.apply(targobj, arguments);   } catch (e) {console.log(e)} 
                return objMethod.apply(targobj, arguments);
            };  })(targobj[method]);
    }
    
    w._expl?true:w._expl={Obj,Func,listenCall};
}(window, document);
