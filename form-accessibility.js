(()=>{
  const form=document.getElementById('contactForm');
  const status=document.getElementById('form-status');
  if(!form||!status)return;
  const language=()=>{const lang=document.documentElement.lang.toLowerCase();return lang.startsWith('zh')?'zh':lang==='id'?'id':'en';};
  const say=(en,cn,id)=>{status.textContent=({en,zh:cn,id})[language()]||en;};
  form.querySelectorAll('input,select,textarea').forEach(field=>{
    if(field.type==='hidden'||field.classList.contains('form-honeypot'))return;
    field.addEventListener('invalid',()=>{
      field.setAttribute('aria-invalid','true');
      const fieldLabel=field.closest('fieldset')?.querySelector('legend')||field.closest('label')?.querySelector('span');
      const fieldName=fieldLabel?.textContent||'this field';
      const name=fieldLabel?.dataset.id||fieldName;
      say(`Please check ${fieldName}.`,`请检查${fieldName}。`,`Periksa kolom ${name}.`);
    });
    field.addEventListener('input',()=>{
      if(field.checkValidity())field.removeAttribute('aria-invalid');
    });
  });
  form.addEventListener('submit',()=>{
    if(form.checkValidity())say('Sending your project brief…','正在发送你的项目需求…','Brief proyek sedang dikirim…');
  });
})();
