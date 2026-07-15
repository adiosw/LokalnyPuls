// PARTICLES
const canvas=document.getElementById('particlesCanvas'),ctx=canvas.getContext('2d');
canvas.width=innerWidth;canvas.height=innerHeight;
let particlesArray=[],mouse={x:null,y:null,radius:150};
const attractionPoints=[{x:innerWidth*0.3,y:innerHeight*0.35},{x:innerWidth*0.5,y:innerHeight*0.35},{x:innerWidth*0.7,y:innerHeight*0.35}];
addEventListener('mousemove',e=>{mouse.x=e.x;mouse.y=e.y;});
addEventListener('resize',()=>{canvas.width=innerWidth;canvas.height=innerHeight;init();});
class Particle{
  constructor(x,y){this.x=x;this.y=y;this.size=Math.random()*3+1;this.speedX=Math.random()*1-.5;this.speedY=Math.random()*1-.5;this.color=`rgba(${96+Math.random()*60},${165+Math.random()*60},250,${Math.random()*.5+.3})`;}
  update(){
    attractionPoints.forEach(p=>{let dx=p.x-this.x,dy=p.y-this.y,d=Math.sqrt(dx*dx+dy*dy);if(d<200){let f=(200-d)/200;this.x+=Math.cos(Math.atan2(dy,dx))*f*.5;this.y+=Math.sin(Math.atan2(dy,dx))*f*.5;}});
    let dx=mouse.x-this.x,dy=mouse.y-this.y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<mouse.radius){let f=(mouse.radius-d)/mouse.radius;this.x-=Math.cos(Math.atan2(dy,dx))*f*3;this.y-=Math.sin(Math.atan2(dy,dx))*f*3;}
    this.x+=this.speedX;this.y+=this.speedY;
    if(this.x>canvas.width||this.x<0)this.speedX=-this.speedX;
    if(this.y>canvas.height||this.y<0)this.speedY=-this.speedY;
  }
  draw(){ctx.fillStyle=this.color;ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fill();}
}
function init(){particlesArray=[];let n=(canvas.width*canvas.height)/12000;for(let i=0;i<n;i++)particlesArray.push(new Particle(Math.random()*canvas.width,Math.random()*canvas.height));}
function connect(){
  for(let a=0;a<particlesArray.length;a++)for(let b=a;b<particlesArray.length;b++){
    let dx=particlesArray[a].x-particlesArray[b].x,dy=particlesArray[a].y-particlesArray[b].y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<120){ctx.strokeStyle=`rgba(59,130,246,${(1-d/120)*.3})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(particlesArray[a].x,particlesArray[a].y);ctx.lineTo(particlesArray[b].x,particlesArray[b].y);ctx.stroke();}
  }
}
function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);particlesArray.forEach(p=>{p.update();p.draw();});connect();requestAnimationFrame(animate);}
init();animate();

// COUNTERS
let countersAnimated=false;
function animateCounters(){
  if(countersAnimated)return;
  document.querySelectorAll('.stat-number').forEach(counter=>{
    const target=+counter.getAttribute('data-target'),inc=target/200;
    const update=()=>{const c=+counter.innerText;if(c<target){counter.innerText=Math.ceil(c+inc);setTimeout(update,10);}else{counter.innerText=(target===3||target===10)?target:'+'+target;}};
    update();
  });
  countersAnimated=true;
}

// TABS
function switchTab(tab){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.pricing-panel').forEach(p=>p.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('panel-'+tab).classList.add('active');
}

// FAQ
function toggleFaq(el){
  const wasActive=el.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('active'));
  if(!wasActive)el.classList.add('active');
}

// CHAT FORM
let currentStep=1;const formData={};
function addMessage(text,isUser=false){
  const c=document.getElementById('chatMessages'),m=document.createElement('div');
  m.className='chat-message';m.style.textAlign=isUser?'right':'left';
  const b=document.createElement('div');b.className=`message-bubble ${isUser?'user':''}`;b.textContent=text;
  m.appendChild(b);c.appendChild(m);c.scrollTop=c.scrollHeight;
}
function updateProgress(){document.getElementById('progressBar').style.width=((currentStep/4)*100)+'%';}
function nextStep(step){
  let value,nextMessage;
  if(step===1){value=document.getElementById('companyName').value;if(!value){alert('Proszę podać nazwę firmy');return;}formData.company=value;addMessage(value,true);nextMessage='Super! Jaki jest najlepszy numer telefonu?';}
  else if(step===2){value=document.getElementById('phone').value;if(!value){alert('Proszę podać telefon');return;}formData.phone=value;addMessage(value,true);nextMessage='Świetnie! Na jaki email mam wysłać raport?';}
  else if(step===3){value=document.getElementById('email').value;if(!value||!value.includes('@')){alert('Proszę podać poprawny email');return;}formData.email=value;addMessage(value,true);nextMessage='Ostatnie pytanie - w jakim mieście działasz?';}
  document.getElementById(`step${step}`).classList.remove('active');currentStep++;
  setTimeout(()=>{addMessage(nextMessage);document.getElementById(`step${currentStep}`).classList.add('active');updateProgress();},500);
}
function submitForm(){
  const city=document.getElementById('city').value;if(!city){alert('Proszę podać miasto');return;}
  formData.city=city;addMessage(city,true);
  setTimeout(()=>{addMessage('🎉 Dziękuję! Analizuję...');setTimeout(()=>{addMessage('✅ Raport został wysłany na '+formData.email);console.log('Form Data:',formData);},2000);},500);
}

// NOTIFY SIGNUP
function notifySignup(e){
  e.preventDefault();
  const email=document.getElementById('notifyEmail').value;
  console.log('Notify signup:',email);
  alert('Dzięki! Odezwiemy się jak panel będzie gotowy 🚀');
  document.getElementById('notifyEmail').value='';
}

// MOBILE MENU
function toggleMobileMenu(){document.getElementById('mobileMenu').classList.toggle('active');document.querySelector('.hamburger').classList.toggle('active');}

// SCROLL REVEAL
function reveal(){
  document.querySelectorAll('.reveal').forEach(el=>{
    const top=el.getBoundingClientRect().top;
    if(top<innerHeight-150){el.classList.add('active');if(el.classList.contains('stats')&&!countersAnimated)animateCounters();}
  });
}
addEventListener('scroll',reveal);reveal();