  // ΓöÇΓöÇ OSS tab switching
  function showTab(id, btn) {
    document.querySelectorAll('.oss-card').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.oss-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + id).classList.add('active');
    btn.classList.add('active');
  }

  // ΓöÇΓöÇ Smooth entrance animations
  (function() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = '0s';
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, observerOptions);

    // Add animation classes to sections
    document.querySelectorAll('.oss-section, .stats-section, .mission-section, .investors-section, .blog-section, .newsletter-section').forEach(section => {
      section.style.animation = 'fadeInUp 0.8s ease-out forwards';
      section.style.animationPlayState = 'paused';
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      observer.observe(section);
    });
  })();

  // ΓöÇΓöÇ Chart bars
  (function() {
    const bars = document.getElementById('chartBars');
    const N = 60;
    for (let i = 0; i < N; i++) {
      const bar = document.createElement('div');
      bar.className = 'chart-bar';
      // exponential growth curve
      const t = i / N;
      const h = Math.max(4, Math.pow(t, 2.2) * 100);
      bar.style.height = h + '%';
      bar.style.opacity = 0.4 + t * 0.6;
      bars.appendChild(bar);
    }
  })();

  // ΓöÇΓöÇ Animated counters
  function animateCounter(el, target, suffix, duration) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = Math.floor(start).toLocaleString() + suffix;
    }, 16);
  }

  let statsAnimated = false;
  const statsSection = document.querySelector('.stats-section');
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      animateCounter(document.getElementById('stat1'), 14000, '+', 1800);
      animateCounter(document.getElementById('stat2'), 95, '%', 1800);
      animateCounter(document.getElementById('stat3'), 10000, '+', 1800);
      animateCounter(document.getElementById('stat4'), 214, '', 1200);
    }
  }, { threshold: 0.3 });
  obs.observe(statsSection);

  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  //  ISO STACK ANIMATION  ΓÇö pixel-perfect VoidZero replica
  // ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ
  (function () {
    const NS   = 'http://www.w3.org/2000/svg';
    const svg  = document.getElementById('isoCvs');
    const scene= document.getElementById('isoScene');

    // SVG viewBox = 780 ├ù 360
    // Stack geometry
    const CX=390;       // horizontal center
    const TW=115;       // half-width of rhombus
    const TH=66;        // half-height of rhombus top face
    const FH=13;        // side-face height (slab thickness)
    const LS=17;        // layer separation in SVG units
    const NL=6;         // total slabs

    // Stack top (layer NL-1) face center Y in SVG coords.
    // We want the whole stack centered in the 360px viewBox.
    // Stack visual height Γëê TH (top diamond) + NL*FH (sides) + (NL-1)*LS (gaps) + TH (bottom)
    // Γëê 66 + 6*13 + 5*17 + 66 = 66+78+85+66 = 295px
    // Center = 360/2 = 180. Top of topmost face = 180 - 295/2 Γëê 33.
    // Top face center (layer NL-1) CY = 33 + TH = 99
    // Bottom of stack bottom = 99 + (NL-1)*LS + NL*FH + TH = 99+85+78+66 = 328 (leaves 32px below)
    const BASE_CY = 88; // CY of the top face of the topmost slab (layer index NL-1)
    // lcy(i) = BASE_CY + (NL-1-i)*LS  ΓåÆ higher layers = lower cy = higher on screen
    function lcy(i, offs) {
      return BASE_CY + (NL-1-i)*LS + (offs[i]||0);
    }

    const TOOLS=[
      {id:'vite',     name:'VITE',     sub:'build tool',         li:3, tC:'#c4b5fd', lC:'#6d28d9', rC:'#7c3aed'},
      {id:'rolldown', name:'ROLLDOWN', sub:'bundler',            li:2, tC:'#fde68a', lC:'#b45309', rC:'#d97706'},
      {id:'oxc',      name:'OXC',      sub:'language toolchain', li:1, tC:'#67e8f9', lC:'#0e7490', rC:'#0891b2'},
      {id:'viteplus', name:'VITE+',    sub:'unified toolchain',  li:5, tC:'#c7d2fe', lC:'#4338ca', rC:'#4f46e5'},
    ];
    // Labels: left side (L) and right side (R)
    // li = layer index whose Y they track
    const LBLS=[
      {id:'viteplus', name:'VITE+',    side:'L', li:5},
      {id:'vite',     name:'VITE',     side:'L', li:3},
      {id:'oxc',      name:'OXC',      side:'L', li:1},
      {id:'vitest',   name:'VITEST',   side:'R', li:3},
      {id:'rolldown', name:'ROLLDOWN', side:'R', li:2},
    ];

    function svgel(tag,a){
      const e=document.createElementNS(NS,tag);
      for(const[k,v]of Object.entries(a||{}))e.setAttribute(k,v);
      return e;
    }
    function topP(cx,cy)    { return `M${cx},${cy-TH} L${cx+TW},${cy} L${cx},${cy+TH} L${cx-TW},${cy}Z`; }
    function leftP(cx,cy,h) { return `M${cx-TW},${cy} L${cx},${cy+TH} L${cx},${cy+TH+h} L${cx-TW},${cy+h}Z`; }
    function rightP(cx,cy,h){ return `M${cx+TW},${cy} L${cx},${cy+TH} L${cx},${cy+TH+h} L${cx+TW},${cy+h}Z`; }
    function ease(t){ return t<.5?2*t*t:-1+(4-2*t)*t; }

    // Spin keyframes (injected once)
    if(!document.getElementById('isoKF')){
      const s=document.createElement('style'); s.id='isoKF';
      s.textContent=
        `@keyframes rCW {from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
         @keyframes rCCW{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
         .iR{transform-box:fill-box;transform-origin:center;animation:rCW  4.5s linear infinite;}
         .iI{transform-box:fill-box;transform-origin:center;animation:rCCW 7s   linear infinite;}`;
      document.head.appendChild(s);
    }

    let LG=[], CG;
    function buildSVG(){
      svg.innerHTML='';
      const defs=svgel('defs');
      const f=svgel('filter',{id:'ds',x:'-60%',y:'-60%',width:'220%',height:'220%'});
      f.appendChild(svgel('feDropShadow',{dx:'0',dy:'6',stdDeviation:'9','flood-color':'rgba(0,0,0,0.15)'}));
      defs.appendChild(f); svg.appendChild(defs);
      LG=[];
      // Draw layers bottomΓåÆtop so higher layers paint over lower ones
      for(let i=0;i<NL;i++){const g=svgel('g');svg.appendChild(g);LG.push(g);}
      CG=svgel('g'); svg.appendChild(CG);
    }

    function drawIcon(g,cx,cy,id,a=1){
      const op=String(a);
      if(id==='vite'||id==='viteplus'){
        const c=id==='viteplus'?'#4f46e5':'#7c3aed';
        g.appendChild(svgel('path',{d:`M${cx+2},${cy-13} L${cx-7},${cy+1} L${cx},${cy+1} L${cx-3},${cy+13} L${cx+9},${cy-2} L${cx+2},${cy-2}Z`,fill:c,opacity:op}));
        if(id==='viteplus')
          g.appendChild(svgel('path',{d:`M${cx+12},${cy-15} L${cx+14},${cy-11} L${cx+18},${cy-12} L${cx+14},${cy-9} L${cx+12},${cy-5} L${cx+10},${cy-9} L${cx+6},${cy-12} L${cx+10},${cy-11}Z`,fill:'#818cf8',opacity:op}));
      } else if(id==='rolldown'){
        const r=12;
        g.appendChild(svgel('path',{d:`M${cx},${cy-r} A${r},${r},0,0,1,${cx+r},${cy}`,fill:'none',stroke:'#d97706','stroke-width':'2.5','stroke-linecap':'round',opacity:op}));
        g.appendChild(svgel('path',{d:`M${cx},${cy+r} A${r},${r},0,0,1,${cx-r},${cy}`,fill:'none',stroke:'#92400e','stroke-width':'2.5','stroke-linecap':'round',opacity:op}));
        g.appendChild(svgel('path',{d:`M${cx+r-5},${cy-3} L${cx+r},${cy} L${cx+r-5},${cy+3}`,fill:'none',stroke:'#d97706','stroke-width':'2','stroke-linecap':'round','stroke-linejoin':'round',opacity:op}));
        g.appendChild(svgel('path',{d:`M${cx-r+5},${cy-3} L${cx-r},${cy} L${cx-r+5},${cy+3}`,fill:'none',stroke:'#92400e','stroke-width':'2','stroke-linecap':'round','stroke-linejoin':'round',opacity:op}));
      } else if(id==='oxc'){
        const pts=Array.from({length:6},(_,k)=>{const a2=(Math.PI/3)*k-Math.PI/6;return`${cx+13*Math.cos(a2)},${cy+13*Math.sin(a2)}`;}).join(' ');
        g.appendChild(svgel('polygon',{points:pts,fill:'none',stroke:'#0891b2','stroke-width':'2',opacity:op}));
        g.appendChild(svgel('path',{d:`M${cx-5},${cy-5}L${cx+5},${cy+5}M${cx+5},${cy-5}L${cx-5},${cy+5}`,stroke:'#22d3ee','stroke-width':'2.2','stroke-linecap':'round',opacity:op}));
      }
    }

    function drawLayers(ti, offs){
      const T=TOOLS[ti], aL=T.li;
      // Paint bottomΓåÆtop for correct z-order
      for(let i=0;i<NL;i++){
        const g=LG[i]; g.innerHTML='';
        const cy=lcy(i,offs), cx=CX, act=(i===aL);
        const tF=act?T.tC:'#ffffff';
        const lF=act?T.lC:'#dddaea';
        const rF=act?T.rC:'#e9e4f5';
        const sk=act?'rgba(0,0,0,0.18)':'rgba(0,0,0,0.10)';
        const da=act?'none':'5,4';
        const sw=act?'1.3':'0.9';
        if(act) g.setAttribute('filter','url(#ds)');
        else    g.removeAttribute('filter');
        // Right face, Left face, Top face (painter's order)
        g.appendChild(svgel('path',{d:rightP(cx,cy,FH),fill:rF,stroke:sk,'stroke-width':sw,'stroke-dasharray':da}));
        g.appendChild(svgel('path',{d:leftP( cx,cy,FH),fill:lF,stroke:sk,'stroke-width':sw,'stroke-dasharray':da}));
        g.appendChild(svgel('path',{d:topP(  cx,cy),   fill:tF,stroke:sk,'stroke-width':sw,'stroke-dasharray':da}));
        if(act){
          g.appendChild(svgel('circle',{cx,cy,r:'28',fill:'none',stroke:'rgba(0,0,0,0.16)','stroke-width':'1.5','stroke-dasharray':'5,3',class:'iR'}));
          const ig=svgel('g',{class:'iI'});
          drawIcon(ig,cx,cy,T.id);
          g.appendChild(ig);
        }
        if(i===NL-1&&!act) drawIcon(g,cx,cy,'viteplus',0.2);
      }

      // SVG connector lines: pill-edge ΓåÆ iso vertex
      CG.innerHTML='';
      // In SVG coords: left vertex = CX-TW = 390-115 = 275; right = CX+TW = 505
      // Pill right-edge (left pills) in SVG Γëê x=110; pill left-edge (right pills) Γëê x=670
      const LV=275, RV=505, PL=110, PR=670;
      LBLS.forEach(lbl=>{
        const cy=lcy(lbl.li,offs);
        const actL=(T.id===lbl.id);
        const sk2=actL?'rgba(0,0,0,0.25)':'rgba(0,0,0,0.08)';
        const da2=actL?'none':'3,4';
        CG.appendChild(svgel('line',{
          x1:lbl.side==='L'?PL:PR, y1:cy,
          x2:lbl.side==='L'?LV:RV, y2:cy,
          stroke:sk2,'stroke-width':'1','stroke-dasharray':da2
        }));
      });
    }

    // DOM pill labels
    const PELS={};
    function buildPills(){
      document.querySelectorAll('.iso-pill,.iso-sublabel').forEach(e=>e.remove());
      const icons={
        viteplus:`<svg viewBox="0 0 10 13" fill="none" width="9" height="11"><path d="M5.5 0L2 5.5h3.5L3 13l7-8H6.5L9 0Z" fill="currentColor"/></svg>`,
        vite:    `<svg viewBox="0 0 10 13" fill="none" width="9" height="11"><path d="M5.5 0L2 5.5h3.5L3 13l7-8H6.5L9 0Z" fill="currentColor"/></svg>`,
        vitest:  `<svg viewBox="0 0 10 10" fill="none" width="9" height="9"><path d="M1 2h8M2 5h6M4 8h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
        rolldown:`<svg viewBox="0 0 10 10" fill="none" width="9" height="9"><path d="M2 5a3 3 0 1 1 3 3" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M1 4l1 1 1-1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
        oxc:     `<svg viewBox="0 0 10 10" fill="none" width="9" height="9"><polygon points="5,1 9,3.5 9,6.5 5,9 1,6.5 1,3.5" stroke="currentColor" stroke-width="1.3" fill="none"/></svg>`,
      };
      LBLS.forEach(lbl=>{
        const p=document.createElement('div');
        p.className='iso-pill'; p.id='ip-'+lbl.id;
        p.innerHTML=(icons[lbl.id]||'')+' '+lbl.name;
        if(lbl.side==='L') p.style.left='0';
        else{ p.style.right='0'; p.style.flexDirection='row-reverse'; }
        scene.appendChild(p);
        PELS[lbl.id]=p;
      });
      const sl=document.createElement('div');
      sl.className='iso-sublabel'; sl.id='iso-sl';
      sl.style.opacity='0'; scene.appendChild(sl);
    }

    function updatePills(ti, offs){
      const T=TOOLS[ti];
      const sH=scene.offsetHeight||360;
      const sW=scene.offsetWidth ||780;
      const scY=sH/360, scX=sW/780;
      LBLS.forEach(lbl=>{
        const p=PELS[lbl.id]; if(!p) return;
        // SVG cy ΓåÆ scene px. Subtract half pill height (~11px) to center vertically.
        const topPx = lcy(lbl.li,offs)*scY - 11;
        p.style.top = topPx+'px';
        p.classList.toggle('on', T.id===lbl.id);
      });
      // sublabel
      const sl=document.getElementById('iso-sl'); if(!sl) return;
      const actCY=lcy(T.li,offs);
      sl.style.top  = (actCY*scY + 12)+'px';
      sl.style.left = ((CX-TW+8)*scX)+'px';
      sl.textContent= T.sub;
      sl.style.opacity='1';
    }

    // Animation timing
    const DUR={e:52,h:72,c:44,p:25};
    const CYCLE=DUR.e+DUR.h+DUR.c+DUR.p;
    const UP=46, ABOVE=24;
    function computeOffs(ti,f){
      const aL=TOOLS[ti].li; let t=0;
      if(f<DUR.e)                    t=ease(f/DUR.e);
      else if(f<DUR.e+DUR.h)        t=1;
      else if(f<DUR.e+DUR.h+DUR.c)  t=1-ease((f-DUR.e-DUR.h)/DUR.c);
      const o={};
      for(let i=0;i<NL;i++){
        if(i===aL)       o[i]=-UP*t;
        else if(i>aL)    o[i]=-ABOVE*((i-aL)/(NL-aL))*t;
      }
      return o;
    }

    let cur=0, frm=0;
    function tick(){
      frm++;
      const f=frm%CYCLE;
      if(f===0&&frm>0) cur=(cur+1)%TOOLS.length;
      const o=computeOffs(cur,f);
      drawLayers(cur,o);
      updatePills(cur,o);
      requestAnimationFrame(tick);
    }

    buildSVG(); buildPills();
    drawLayers(0,{}); updatePills(0,{});
    requestAnimationFrame(tick);
  })();

  // ΓöÇΓöÇ Newsletter submit
    // ΓöÇΓöÇ Newsletter submit
  document.querySelector('.newsletter-btn').addEventListener('click', function() {
    const input = document.querySelector('.newsletter-input');
    if (input.value && input.value.includes('@')) {
      this.textContent = 'Γ£ô Subscribed!';
      this.style.background = '#4ade80';
      input.value = '';
      setTimeout(() => { this.textContent = 'Subscribe'; this.style.background = ''; }, 3000);
    } else {
      input.style.borderColor = '#f87171';
      setTimeout(() => { input.style.borderColor = ''; }, 1500);
    }
  });
