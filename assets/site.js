
(function(){
document.querySelectorAll('.yr').forEach(function(e){e.textContent=new Date().getFullYear()});
var hints={'Get a quote':'Anything else we should know, like your current copier, paper sizes or stapling.','Service or toner':'Which machine, what is going on, and any error code on the screen. For toner, which colors.','Question':'What would you like to know?'};
document.querySelectorAll('.cform').forEach(function(f){
  var m=f.querySelector('textarea'),qx=f.querySelector('.qx');
  function upd(v){if(m)m.placeholder=hints[v]||'';if(qx)qx.hidden=(v!=='Get a quote');}
  f._set=function(v){f.querySelectorAll('input[name=type]').forEach(function(r){r.checked=(r.value===v)});upd(v);};
  var c=f.querySelector('input[name=type]:checked');if(c)upd(c.value);
  f.querySelectorAll('input[name=type]').forEach(function(r){r.addEventListener('change',function(){upd(r.value)})});
  f.addEventListener('submit',function(e){e.preventDefault();var msg=f.querySelector('.fmsg'),btn=f.querySelector('button[type=submit]');
    if(!f.name.value.trim()||!f.email.value.trim()){msg.textContent='Add your name and email so we can reply.';return;}
    if(f.botcheck&&f.botcheck.value){return;}
    var data={access_key:'338dfda2-6706-4f9b-9720-7b8fad07832e',from_name:'BAOS website'};
    new FormData(f).forEach(function(v,k){if(k!=='botcheck'&&v!=='')data[k]=v;});
    data.subject=(data.type||'Website message')+' from '+(data.company||data.name)+' (website)';
    btn.disabled=true;msg.textContent='Sending...';
    fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(data)})
     .then(function(r){return r.json()}).then(function(j){
       if(j.success){f.reset();var c=f.querySelector('input[name=type]:checked');if(f._set)f._set('Get a quote');msg.textContent='Thanks, we got your message. We will reply by email, usually within one business day.';}
       else{msg.textContent='Something went wrong. Please email us at info@bayareaofficesystems.com.';}
     }).catch(function(){msg.textContent='Something went wrong. Please email us at info@bayareaofficesystems.com.';})
     .finally(function(){btn.disabled=false;});});
});
function root(){return document;}
document.addEventListener('click',function(e){
  var el=e.target.closest('[data-type]'); if(!el)return;
  var f=root().querySelector('.cform'); if(!f)return;
  e.preventDefault(); f._set(el.getAttribute('data-type'));
  var c=root().querySelector('#contact'); if(c)c.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
});
var tabs=document.querySelectorAll('.tabs a[data-sec]');
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){var id=en.target.id;tabs.forEach(function(a){a.classList.toggle('on',a.dataset.sec===id)})}})},{rootMargin:'-45% 0px -50% 0px'});
  window._spy=function(){io.disconnect();tabs.forEach(function(a){a.classList.remove('on')});root().querySelectorAll('section[id]').forEach(function(s){io.observe(s)})};
  window._spy();
}
})();

if(location.hash){var h=document.getElementById(location.hash.slice(1));if(h)setTimeout(function(){h.scrollIntoView()},0);}
