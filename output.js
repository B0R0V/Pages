window.addEventListener('load', function() {
  _log=console.log;
  _objectView = {
    GetChainProto: function(arg) {
      return s.call(arg);function s(e) {
        let t;t = "string" === e ? new String("") : "number" === e ? new Number(0) : "bigint" === e ? Object(BigInt(0)) : "boolean" === e ? new Boolean(!1) : this;const n = [];  try {for (let i = t; i; i = Object.getPrototypeOf(i)) {if (("array" === e || "typedarray" === e) && i === t && i.length > 9999) continue;   const s = {     items: [],     __proto__: null   };   try {     "object" == typeof i && Object.prototype.hasOwnProperty.call(i, "constructor") && i.constructor && i.constructor.name && (s.title = i.constructor.name)   } catch (e) {}   n[n.length] = s;   const r = Object.getOwnPropertyNames(i)     , o = Array.isArray(i);   for (let e = 0; e < r.length && s.items.length < 1e4; ++e)     o && /^[0-9]/.test(r[e]) || (s.items[s.items.length] = r[e])    }  } catch (e) {}  return n
      }
    }
  };
  _test = function(targObj) {
    let keys = _objectView.GetChainProto(targObj).map((v)=>v.items).reduce((acc,emp)=>[...acc,...emp],[])//.filter((v,n,ar)=>ar.indexOf(v)===ar.lastIndexOf(v));
    return {//listOpts: [...keys].sort((a,b)=>{return (a[0] === a[0].toLocaleLowerCase()) ? 0 : -1}).map(v=>`<option label="${v}" value="${v}">`)
      keys
    }
  };
  _output = (function() {
    let outpEL = document.querySelector('#output');
    return {
      outpEL,
      ToggleShow: function(boolflag) {
        this.outpEL.style.display = (typeof boolflag === "undefined") ? 
          ({'block': 'none','none': 'block'})[this.outpEL.style.display] : ({
            false: 'none',true: 'block'})[boolflag];
      },
      table: {
        el: outpEL.children[0].tBodies[0],
        DrawRow: function(key, value) {
          this.el.insertRow().innerHTML = `<th scope="row">${key}</th><td>${value}</td>`
        },
        ClearRows: function() {this.el.innerHTML=''}
      }
  }})();
  _CMcode = CodeMirror.fromTextArea(document.getElementById("CMInput"), {
    lineNumbers: false,dragDrop: false,smartIndent: true,
    theme:'text-monospace text-dark',
    extraKeys: {"Ctrl-Space": "autocomplete"},
    mode: {name: "javascript", globalVars: true}
  });
  _CMcode.on("change", function (cm, event) { _log(Object.assign({},[event,cm]));_log(event.origin)
    //if (!cm.state.completionActive && event.keyCode != 13) {
      if (!cm.state.completionActive) {
        _CMcode.showHint({completeSingle: false})
        _list=cm.state.completionActive?cm.state.completionActive.data.list:_list;
        
        
     }if (event.origin==="complete") {
          _output.ToggleShow(true);_log(_CMcode.getValue())
        } else {_output.ToggleShow(false)}
    });
// function DataList(opts){
//     let listEl=document.querySelector('#inpList');
//     listEl.innerHTML='';opts.forEach((v)=>{listEl.insertAdjacentHTML('afterBegin', v)});
//   }
//   _inp = document.querySelector('#inp');
//   _output.ToggleShow()
//   _inp.onchange=function(e){
//     props=_test(window[_inp.value]||this)
//     DataList(props.listOpts);
//     _output.table.ClearRows();
//     props.keys.forEach((v)=>_output.table.DrawRow(v,window[v]));
//   }
//_objectView.GetChainProto(window[_inp.value])
})
