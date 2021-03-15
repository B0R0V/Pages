window.addEventListener('load', function() {
  _log=console.log;
  _objectView = {
    GetChainProto: function(arg) {
      return this._chain=s.call(arg);function s(e) {
        let t;t = "string" === e ? new String("") : "number" === e ? new Number(0) : "bigint" === e ? Object(BigInt(0)) : "boolean" === e ? new Boolean(!1) : this;const n = []; try {
          for (let i = t; i; i = Object.getPrototypeOf(i)) {if (("array" === e || "typedarray" === e) && i === t && i.length > 9999) continue; const s = { items: [], __proto__: null}; try {"object" == typeof i && Object.prototype.hasOwnProperty.call(i, "constructor") && i.constructor && i.constructor.name && (s.title = i.constructor.name) } catch (e) {} n[n.length] = s;
          const r = Object.getOwnPropertyNames(i), o = Array.isArray(i); for (let e = 0; e < r.length && s.items.length < 1e4; ++e) o && /^[0-9]/.test(r[e]) || (s.items[s.items.length] = r[e]) }  } catch (e) {}  return n
      }
    },

  };
  _test = function(chain) {
    let keys =chain.map((v)=>v.items).reduce((acc,emp)=>[...acc,...emp],[]).sort().map((v,k,a)=>a[k]=(a.indexOf(v)!=a.lastIndexOf(v))?null:v).filter(v=>v);//.filter((v,n,ar)=>ar.indexOf(v)===ar.lastIndexOf(v));
    return {//listOpts: [...keys].sort((a,b)=>{return (a[0] === a[0].toLocaleLowerCase()) ? 0 : -1}).map(v=>`<option label="${v}" value="${v}">`)
      chain,
      keys
    }
  };
  _output = (function() { //https://bootstrap-4.ru/docs/4.5/components/collapse/
    let outpEL = document.querySelector('#output');
    return {
      outpEL,
      ToggleShow: function(boolflag) {
        this.outpEL.style.display = (typeof boolflag === "undefined") ? 
          ({'block': 'none','none': 'block'})[this.outpEL.style.display] : ({
            false: 'none',true: 'block'})[boolflag];
      },
      Clear:function(){this.outpEL.innerHTML=''},
      table: {
        el: outpEL.getElementsByTagName('table')[0],ClearRows: function() {this.el.innerHTML=''},
        DrawRow: function(key, value) {
          this.el.insertRow().innerHTML = `<th scope="row">${key}</th><td>${value}</td>`
        }
      },
      ChainProto:function(chainarr){
        for (let ChainEl in chainarr){this.outpEL.insertAdjacentHTML('beforeEnd',`
        <div class="accordion" id="ChainEl${ChainEl}"><div class="card"><div class="card-header bg-dark text-info" id="headingOne"><h5 class="mb-0">
        <button class="btn collapsed bg-dark text-info" type="button" data-toggle="collapse" data-target="#collapse${ChainEl}" aria-expanded="false" aria-controls="collapseOne">items: ${chainarr[ChainEl].items.length}, title: ${chainarr[ChainEl].title||''}</button></h5>    </div>
        <div id="collapse${ChainEl}" class="collapse bg-secondary text-light" aria-labelledby="headingOne" data-parent="#ChainEl${ChainEl}" style="">   <div class="card-body">
        <table class="table table-sm table-bordered table-hover table-dark "><thead><tr><th scope="col">key</th><th scope="col">value</th></tr></thead><tbody></tbody></table>
        </div></div></div></div>`)}
      }
  }})();
  _CMcode = CodeMirror.fromTextArea(document.getElementById("CMInput"), {
    lineNumbers: false,dragDrop: false,smartIndent: false,inputStyle:"contenteditable",
    theme:'text-monospace text-dark',
    extraKeys: {"Ctrl-Space": "autocomplete"},
    mode: {name: "javascript", globalVars: true}
  });
  _CMcode.on("keyup", function (cm, event) {_log(cm.getCursor().ch); _log(Object.assign({},[event,cm]));
    event.preventDefault();
    if (!cm.state.completionActive && cm.getCursor().ch>=2) {
      _CMcode.showHint({completeSingle: false});
      _list=cm.state.completionActive?(cm.state.completionActive.data)?
        cm.state.completionActive.data.list:null:_list;
     }
    if (event.origin==="complete") {
          _output.ToggleShow(true);
          _output.ChainProto(_objectView.GetChainProto(window[_CMcode.getValue()]))
        } else {_output.ToggleShow(false);_output.Clear()}
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
