const boot = document.getElementById("boot");
const site = document.getElementById("site");
const skip = document.querySelector(".skip-boot");

document.body.classList.add("booting");

function enterArchive() {
  if (!boot || boot.classList.contains("fade-out")) return;
  boot.classList.add("fade-out");
  site.classList.add("ready");
  site.setAttribute("aria-hidden", "false");
  document.body.classList.remove("booting");
  setTimeout(() => boot.remove(), 900);
}

skip?.addEventListener("click", enterArchive);
document.addEventListener("keydown", (e) => { if (e.key === "Enter" && boot && !boot.classList.contains("fade-out")) enterArchive(); });

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const bootMessage = document.getElementById("bootMessage");
const bootMessages = [
  "LOCATING PRIMARY BRANCH",
  "VERIFYING ARCHIVE NODE",
  "ALIGNING PROJECT SIGNALS",
  "OPENING UTKARSH ARCHIVE"
];
let bootMessageIndex = 0;
if (!reduceMotion && bootMessage) {
  const bootMessageTimer = setInterval(() => {
    bootMessageIndex = Math.min(bootMessageIndex + 1, bootMessages.length - 1);
    bootMessage.textContent = bootMessages[bootMessageIndex];
    if (bootMessageIndex === bootMessages.length - 1) clearInterval(bootMessageTimer);
  }, 820);
}
const delay = reduceMotion ? 650 : 3900;
setTimeout(enterArchive, delay);

document.getElementById("year").textContent = new Date().getFullYear();

const reveal = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));

// Hidden cinema archive: subtle references + a triple-click post-credit reveal.
const eggModal = document.getElementById("eggModal");
const postCreditTrigger = document.getElementById("postCreditTrigger");
const brandTrigger = document.getElementById("brandTrigger");
const eggInfo = {
  A113: "A113 — a recurring animation-school/classroom reference famously used across Pixar and other animation work.",
  "88MPH": "88 MPH — the famous target speed from Back to the Future's time-travel setup.",
  NEXUS6: "NEXUS-6 — the replicant model designation from Blade Runner.",
  TOTEM: "TOTEM — the small reality-checking object motif from Inception.",
  HAL9000: "HAL//9000 — the artificial intelligence from 2001: A Space Odyssey."
};

function openEggModal(){
  eggModal?.classList.add("open");
  eggModal?.setAttribute("aria-hidden","false");
}
function closeEggModal(){
  eggModal?.classList.remove("open");
  eggModal?.setAttribute("aria-hidden","true");
}
postCreditTrigger?.addEventListener("click", openEggModal);
document.querySelectorAll("[data-close-egg]").forEach(el => el.addEventListener("click", closeEggModal));
document.querySelectorAll("[data-egg]").forEach(el => el.addEventListener("click", () => {
  const key = el.dataset.egg;
  if (eggInfo[key]) {
    el.animate([{opacity:.55},{opacity:1},{opacity:.55}], {duration:500});
  }
}));
document.addEventListener("keydown", e => { if(e.key === "Escape") closeEggModal(); });

let brandClicks = 0, brandTimer;
const brandBox = document.getElementById('brandBox');
const brandQuizTrigger = document.getElementById('brandQuizTrigger');
brandBox?.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  brandClicks++;
  clearTimeout(brandTimer);
  brandTimer = setTimeout(() => brandClicks = 0, 900);
  if (brandClicks >= 3) {
    brandClicks = 0;
    openEggModal();
  }
});
async function launchQuizFullscreen(e, href='quiz.html'){
  e.preventDefault();
  e.stopPropagation();
  try {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen({navigationUI:'hide'});
    }
  } catch (_) {}
  window.location.href = href;
}
brandQuizTrigger?.addEventListener('click', e => launchQuizFullscreen(e));
document.querySelectorAll('.quiz-launch, .quiz-nav-link').forEach(link => {
  link.addEventListener('click', e => launchQuizFullscreen(e, link.href));
});

// Support / UPI modal.
const supportModal = document.getElementById("supportModal");
const supportTrigger = document.getElementById("supportTrigger");
const upiAmount = document.getElementById("upiAmount");
const upiPayButton = document.getElementById("upiPayButton");
const upiQr = document.getElementById("upiQr");
const upiQrAmount = document.getElementById("upiQrAmount");
const copyUpi = document.getElementById("copyUpi");
const UPI_ID = "9309201731@upi";
const UPI_NAME = "Utkarsh Vijay";

function buildUpiLink(amount) {
  const safeAmount = Math.max(1, Math.min(100000, Number(amount) || 1));
  return `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(UPI_NAME)}&am=${safeAmount}&cu=INR&tn=${encodeURIComponent("Support Work")}`;
}

function updateUpi(amount) {
  const value = Math.max(1, Math.min(100000, Math.round(Number(amount) || 1)));
  if (upiAmount) upiAmount.value = value;
  if (upiPayButton) upiPayButton.href = buildUpiLink(value);
  if (upiQrAmount) upiQrAmount.textContent = `₹${value}`;

  const preset = [5, 10, 50, 100].includes(value);
  if (upiQr) {
    upiQr.style.display = preset ? "block" : "none";
    if (preset) {
      upiQr.src = `assets/upi-${value}.png`;
      upiQr.alt = `UPI QR code for ₹${value} support payment`;
    }
  }
  document.querySelectorAll("[data-upi-amount]").forEach(btn => {
    btn.classList.toggle("active", Number(btn.dataset.upiAmount) === value);
  });
}

function openSupport() {
  supportModal?.classList.add("open");
  supportModal?.setAttribute("aria-hidden", "false");
  document.body.classList.add("booting");
  setTimeout(() => upiAmount?.focus(), 50);
}
function closeSupport() {
  supportModal?.classList.remove("open");
  supportModal?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("booting");
}

supportTrigger?.addEventListener("click", openSupport);
document.querySelectorAll("[data-close-support]").forEach(el => el.addEventListener("click", closeSupport));
document.querySelectorAll("[data-upi-amount]").forEach(btn => {
  btn.addEventListener("click", () => updateUpi(btn.dataset.upiAmount));
});
upiAmount?.addEventListener("input", () => updateUpi(upiAmount.value));

copyUpi?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(UPI_ID);
    copyUpi.textContent = "COPIED";
    copyUpi.classList.add("copied");
    setTimeout(() => {
      copyUpi.textContent = "COPY";
      copyUpi.classList.remove("copied");
    }, 1400);
  } catch {
    const temp = document.createElement("textarea");
    temp.value = UPI_ID;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
    copyUpi.textContent = "COPIED";
    copyUpi.classList.add("copied");
    setTimeout(() => {
      copyUpi.textContent = "COPY";
      copyUpi.classList.remove("copied");
    }, 1400);
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeSupport();
    closeEggModal();
  }
});

// Final navigation polish: scroll progress + active section state.
const progressBar = document.querySelector(".scroll-progress span");
const navLinks = [...document.querySelectorAll('.topbar nav a[href^="#"]')];
const navSections = navLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
function updateScrollUI(){
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
}
window.addEventListener("scroll", updateScrollUI, {passive:true});
updateScrollUI();
if (navSections.length){
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, {rootMargin:"-28% 0px -58% 0px", threshold:0});
  navSections.forEach(section => navObserver.observe(section));
}

// Close the support dialog with Escape as well as the existing backdrop/close control.
document.addEventListener("keydown", e => { if (e.key === "Escape" && supportModal?.classList.contains("open")) closeSupport(); });

// Subtle HUD-style pointer response on desktop: adds depth without interfering with navigation.
(function initHudTilt(){
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return;
  const items = document.querySelectorAll('.metric-card, .project-grid article, .skill-card, .credential-card');
  items.forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(900px) rotateX(${(-y*2.2).toFixed(2)}deg) rotateY(${(x*2.2).toFixed(2)}deg) translateY(-3px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
})();

// Extra archive easter eggs: keyboard sequences + footer/year diagnostic.
(function initArchiveSecrets(){
  const footerYear = document.getElementById('year');
  let seq='';
  document.addEventListener('keydown', e => {
    if(e.key.length !== 1) return;
    seq=(seq+e.key.toUpperCase()).slice(-6);
    if(seq==='KEL1357'){
      document.body.classList.toggle('secret-mode');
      document.documentElement.style.setProperty('--gold2', document.body.classList.contains('secret-mode') ? '#b9dc68' : '#f1c56a');
    }
  });
  let yearClicks=0, yearTimer;
  footerYear?.addEventListener('click',()=>{
    yearClicks++; clearTimeout(yearTimer); yearTimer=setTimeout(()=>yearClicks=0,1000);
    if(yearClicks>=4){
      yearClicks=0;
      const msg=document.createElement('div'); msg.className='secret-toast'; msg.textContent='ARCHIVE OVERRIDE // 1357 // SIGNAL LOCKED'; document.body.appendChild(msg);
      setTimeout(()=>msg.remove(),2600);
    }
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='?' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||'')){
      const msg=document.createElement('div'); msg.className='secret-toast'; msg.innerHTML='<b>HIDDEN SIGNALS</b><br>U ×3 = frame index · UTK1357 = Quiz · KEL1357 = diagnostic tint'; document.body.appendChild(msg); setTimeout(()=>msg.remove(),4200);
    }
  });
})();

// High-tech ambient layer: lightweight particle field + pointer telemetry.
(function initTechInterface(){
  const canvas = document.getElementById('techCanvas');
  const glow = document.querySelector('.cursor-glow');
  const crosshair = document.querySelector('.hud-crosshair');
  if (!canvas) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const ctx = canvas.getContext('2d');
  if (!ctx || reduce) return;

  let w=0,h=0,dpr=1, raf=0;
  const points=[];
  const count = coarse ? 34 : 72;
  function resize(){
    dpr=Math.min(window.devicePixelRatio||1,1.5); w=window.innerWidth; h=window.innerHeight;
    canvas.width=w*dpr; canvas.height=h*dpr; canvas.style.width=w+'px'; canvas.style.height=h+'px'; ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  function seed(){
    points.length=0;
    for(let i=0;i<count;i++) points.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.08,vy:(Math.random()-.5)*.08,r:Math.random()*1.2+.25,a:Math.random()*.32+.06,p:Math.random()*Math.PI*2});
  }
  function draw(t){
    ctx.clearRect(0,0,w,h);
    const linkDist=coarse?95:125;
    for(const p of points){
      p.x+=p.vx; p.y+=p.vy; p.p+=.01;
      if(p.x<-10)p.x=w+10;if(p.x>w+10)p.x=-10;if(p.y<-10)p.y=h+10;if(p.y>h+10)p.y=-10;
      const pulse=p.a + Math.sin(p.p+t*.0006)*.035;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(215,154,53,${Math.max(.02,pulse)})`;ctx.fill();
    }
    for(let i=0;i<points.length;i++){
      for(let j=i+1;j<points.length;j++){
        const a=points[i],b=points[j],dx=a.x-b.x,dy=a.y-b.y,dist=Math.hypot(dx,dy);
        if(dist<linkDist){
          ctx.strokeStyle=`rgba(215,154,53,${(1-dist/linkDist)*.055})`;ctx.lineWidth=.55;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
        }
      }
    }
    raf=requestAnimationFrame(draw);
  }
  resize();seed();window.addEventListener('resize',()=>{resize();seed()},{passive:true});raf=requestAnimationFrame(draw);
  window.addEventListener('pagehide',()=>cancelAnimationFrame(raf));

  if(!coarse && glow && crosshair){
    let tx=window.innerWidth/2,ty=window.innerHeight/2,cx=tx,cy=ty;
    window.addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;glow.style.left=tx+'px';glow.style.top=ty+'px';crosshair.style.left=tx+'px';crosshair.style.top=ty+'px';crosshair.style.opacity='.55';},{passive:true});
    function follow(){cx+=(tx-cx)*.12;cy+=(ty-cy)*.12;glow.style.left=cx+'px';glow.style.top=cy+'px';requestAnimationFrame(follow)} follow();
  }
})();

// Micro-glitch on selected interface labels when hovered.
document.querySelectorAll('.section-top span,.project-id,.console-top span:first-child').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    el.animate([{transform:'translateX(0)',filter:'none'},{transform:'translateX(-2px)',filter:'blur(.4px)'},{transform:'translateX(2px)',filter:'none'},{transform:'translateX(0)'}],{duration:240,easing:'steps(3)'});
  });
});

// Certificate previews: keep thumbnails compact beside the certificate details and open them in-page.
(function initCertificateLightbox(){
  const box = document.getElementById('certificateLightbox');
  const image = document.getElementById('certificateLightboxImage');
  if (!box || !image) return;
  const close = () => {
    box.classList.remove('open');
    box.setAttribute('aria-hidden','true');
    image.removeAttribute('src');
  };
  document.querySelectorAll('.credential-photo[data-certificate]').forEach(btn => {
    btn.addEventListener('click', () => {
      // Build the preview URL from the certificate path itself so it works
      // correctly on both a root domain and a GitHub Pages project path.
      const thumb = btn.querySelector('img');
      const certificatePath = btn.getAttribute('data-certificate');
      if (!certificatePath) return;
      const source = new URL(certificatePath, document.baseURI).href;

      image.src = source;
      image.alt = thumb?.alt || btn.getAttribute('aria-label') || 'Expanded certificate preview';
      box.classList.add('open');
      box.setAttribute('aria-hidden','false');
    });
  });

  image.addEventListener('error', () => {
    image.removeAttribute('src');
    image.alt = 'Certificate preview could not be loaded';
  });
  box.querySelectorAll('[data-close-certificate]').forEach(el => el.addEventListener('click', close));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && box.classList.contains('open')) {
      e.preventDefault();
      e.stopPropagation();
      close();
    }
  });
})();
