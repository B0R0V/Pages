window.addEventListener('load', function() {
  _output = (function() {
    let outpEL = document.querySelector('#output');
    return {
      outpEL,
      ToggleShow: function(boolflag) {
        this.outpEL.style.display = (typeof boolflag === "undefined") ? ({
          'block': 'none',
          'none': 'block'
        })[this.outpEL.style.display] : ({
          false: 'none',
          true: 'block'
        })[!!boolflag];
      },
      table: {
        el: outpEL.children[0].tBodies[0],
        DrawRow: function(key, value) {
          this.el.insertRow().innerHTML = `<th scope="row">${key}</th><td>${value}</td>`
        },
        ClearRows: function() {}
      }
    }
  }
  )();
  _test = (function() {
    let keys = Object.keys(Object.getOwnPropertyDescriptors(window));
    return {
      keys,
      opts: [...keys].sort((a,b)=>{
        return (a[0] === a[0].toLocaleLowerCase()) ? 0 : -1
      }
      ).map(v=>`<option label="${v}" value="${v}">`)
    }
  }
  )();
  _objectView = {
    GetChainProto: function(arg) {
      return s.call(arg);function s(e) {
        let t;t = "string" === e ? new String("") : "number" === e ? new Number(0) : "bigint" === e ? Object(BigInt(0)) : "boolean" === e ? new Boolean(!1) : this;const n = [];  try {for (let i = t; i; i = Object.getPrototypeOf(i)) {if (("array" === e || "typedarray" === e) && i === t && i.length > 9999) continue;   const s = {     items: [],     __proto__: null   };   try {     "object" == typeof i && Object.prototype.hasOwnProperty.call(i, "constructor") && i.constructor && i.constructor.name && (s.title = i.constructor.name)   } catch (e) {}   n[n.length] = s;   const r = Object.getOwnPropertyNames(i)     , o = Array.isArray(i);   for (let e = 0; e < r.length && s.items.length < 1e4; ++e)     o && /^[0-9]/.test(r[e]) || (s.items[s.items.length] = r[e])    }  } catch (e) {}  return n
      }
    }
  }
  _test.opts.forEach((v)=>{
    document.querySelector('#inpList').insertAdjacentHTML('afterBegin', v)
  }
  );

})
