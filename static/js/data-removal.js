window.onload=()=>{if(window.location.search.includes('full-screen=true'))document.body.classList.add('full-screen');const loader=window.top.document.querySelector('.loader');if(loader)loader.style.display='none';document.querySelector('form').addEventListener('submit',e=>{e.preventDefault();let LegalName=document.getElementsByName('LegalName')[0],Email=document.getElementsByName('Email')[0],DiscordName=document.getElementsByName('DiscordName')[0],Reason=document.getElementsByName('Reason')[0],message=document.getElementsByName('message')[0];if(!message||!message.value)return msg.focus();var v=grecaptcha.getResponse();if(v.length==0){document.getElementById('captcha').innerHTML="Invalid Captcha Attempt.";return false;}if(v.length!=0){;document.body.classList.add('done');fetch('/data-removal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'contact',LegalName:LegalName.value||'name not given',Email:Email.value||'not given',DiscordName:DiscordName.value,DiscordID:userID||'not provided',Reason:Reason.value||'reason not given',message:message.value})}).then(res=>res.ok&&document.body.classList.add('done'));}});}