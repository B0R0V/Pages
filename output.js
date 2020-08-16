window.onload = function() {
  _list = {
    items: document.querySelector(".list-group"),
    additem: function(txt) {
      let e = document.createElement('a');
      e.className = "list-group-item";
      e.text = txt;
      this.items.append(e)
    },
    clearitems: function() {
      this.items.innerHTML = ''
    }
  };
  InpHandl = function(event,value=event.target.value) {
    console.log(event)
    _list.clearitems();
    if (!window[value]) return;
    let proplist = _expl.Obj(window[value]).str
    proplist.split(';\n').forEach((v)=>_list.additem(v));
  };
  
  _inp=document.querySelector('#inp');
  _inp.addEventListener('change',InpHandl);
  choice_data=_expl.Obj(window).OwnPropertys.names;
  
//.addEvent_listener('change', parseInp)
  autoComplete({
    selector: '#inp',
    minChars: 1,
    source: function(term, suggest) {
      term = term.toLowerCase();
      var suggestions = []
        , choices = choice_data;
      for (i = 0; i < choices.length; i++) {
        if (~choices[i].toLowerCase().indexOf(term))
          suggestions.push(choices[i]);
      }
      suggest(suggestions);
    }
  })
}
