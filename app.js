import Template from './template.js';

(()=>{
    var users = [
      {name:"Alexander", interests:"creating large empires"},
      {name:"Edward", interests:"ha.ckers.org <\nBGSOUND SRC=\"javascript:alert('XSS');\">"},
      {name:"..."},
      {name:"Yolando", interests:"working out"},
      {name:"Zachary", interests:"picking flowers for Angela"}
    ];

    document.getElementById('target_b').innerHTML = Template.render(document.getElementById('usageList').innerHTML, {users});
})();
