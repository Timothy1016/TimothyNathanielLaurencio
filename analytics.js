(()=>{
  function track(name,props={}){
    try{ if(typeof window.plausible==='function') window.plausible(name,{props}); }catch(e){}
    try{ if(window.umami?.track) window.umami.track(name,props); }catch(e){}
    document.dispatchEvent(new CustomEvent('portfolio:analytics',{detail:{name,props}}));
  }
  document.addEventListener('click',e=>{
    const el=e.target.closest('[data-track]');if(!el)return;
    track(el.dataset.track,{label:(el.dataset.trackLabel||el.textContent||'').trim().slice(0,120),href:el.getAttribute('href')||''});
  });
  const started=new WeakSet();
  document.addEventListener('focusin',e=>{const form=e.target.closest?.('form[data-track-form]');if(!form||started.has(form))return;started.add(form);track(form.dataset.trackForm+' Start',{id:form.id||''});});
  document.addEventListener('submit',e=>{const form=e.target.closest?.('form[data-track-form]');if(!form)return;track(form.dataset.trackForm+' Submit',{id:form.id||''});});
  window.trackPortfolioEvent=track;
})();
