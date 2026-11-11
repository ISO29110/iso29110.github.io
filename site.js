/* ---------- theme ---------- */
(function(){
  const root=document.documentElement, btn=document.getElementById('themeBtn');
  try{const t=localStorage.getItem('theme'); if(t) root.dataset.theme=t;}catch(e){}
  btn.onclick=()=>{
    const dark = root.dataset.theme ? root.dataset.theme==='dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try{localStorage.setItem('theme',root.dataset.theme);}catch(e){}
  };
})();

/* ---------- profiles ---------- */
(function(){
if(!document.getElementById('ladder')) return;
const profiles=[
  {n:'Entry',c:'s1',sub:'Start-ups & small jobs',d:'For start-ups (operating for less than three years) and companies working on small projects of less than six person-months. Covers the essentials: a plan, agreed requirements, testing and controlled delivery. The 2025 edition trims some tasks to keep it lightweight and make the move up to Basic easier.',doc:'ISO/IEC 29110-5-1-1:2025',url:'https://www.iso.org/standard/85420.html'},
  {n:'Basic',c:'s2',sub:'One project at a time',d:'For companies developing a single product with a single work team, under an external or internal agreement. The most widely adopted and certified profile, with the full set of Deployment Packages available.',doc:'ISO/IEC 29110-5-1-2:2025',url:'https://www.iso.org/standard/82669.html'},
  {n:'Intermediate',c:'s3',sub:'Several projects in parallel',d:'For companies running multiple projects at once. Adds organisation-level practices such as portfolio management, business management and sharing resources across projects.'},
  {n:'Advanced',c:'s4',sub:'Growing, competitive firms',d:'For companies that want to sustain and grow as independent, competitive businesses. Builds on Intermediate with stronger business and organisational management.'}
];

const ladder=document.getElementById('ladder'), ld=document.getElementById('ladderDetail');
const keys=['entry','basic','intermediate','advanced'];
const steps=[];
profiles.forEach((p,i)=>{
  const el=document.createElement('button'); el.type='button'; el.className='step '+p.c;
  el.innerHTML=`<small>Level ${i+1}</small><h3>${p.n}</h3><small>${p.sub}</small>`+(i<2?'<br><span class="pick">Details below ↓</span>':'');
  el.onclick=()=>select(i,true);
  ladder.appendChild(el); steps.push(el);
});
function select(i,fromClick){
  const p=profiles[i];
  steps.forEach((s,j)=>{s.classList.toggle('active',j===i);s.setAttribute('aria-pressed',j===i)});
  ld.innerHTML=`<h3>${p.n} profile</h3><p>${p.d}</p>`+(p.doc?`<p style="margin-top:10px;font-size:.9rem">📘 Guide: <a href="${p.url}" target="_blank" rel="noopener">${p.doc}</a> (free)</p>`:'');
  const show = i===0?'detail-entry':i===1?'detail-basic':'detail-later';
  document.querySelectorAll('.pdetail').forEach(d=>d.hidden=d.id!==show);
  if(fromClick){try{history.replaceState(null,'','#'+keys[i])}catch(e){}}
}
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-goto]'); if(!a) return;
  e.preventDefault(); const i=keys.indexOf(a.dataset.goto); select(i,true);
  ladder.scrollIntoView({behavior:'smooth',block:'start'});
});
function fromHash(){const i=keys.indexOf(location.hash.slice(1)); select(i>=0?i:1,false); if(i>=0) setTimeout(()=>ladder.scrollIntoView({block:'start'}),0);}
window.addEventListener('hashchange',fromHash);
fromHash();

})();

/* ---------- activities ---------- */
(function(){
if(!document.getElementById('acts')) return;
const acts={
 PM:[
  {id:'PM.1',t:'Project Planning',obj:'Turn the customer\'s Statement of Work into an agreed Project Plan.',
   val:'Clear scope, realistic estimates and an agreed plan before work starts: the foundation for on-time, on-budget delivery.',
   tasks:['Review the Statement of Work with the customer','Define tasks, schedule, effort and resources','Identify risks and the version-control approach','Get the plan accepted by the customer'],
   in:['Statement of Work'],out:['Project Plan','Project Repository','Meeting Record'],dp:['Project Management','Version Control']},
  {id:'PM.2',t:'Project Plan Execution',obj:'Carry out the plan, record progress and handle change requests.',
   val:'Changes are evaluated for cost and schedule impact before you commit, which protects margins and avoids scope creep.',
   tasks:['Record actual progress against the plan','Evaluate change requests','Hold review meetings with the team and customer','Back up the project repository'],
   in:['Project Plan','Change Request'],out:['Progress Status Record','Meeting Record'],dp:['Project Management']},
  {id:'PM.3',t:'Project Assessment and Control',obj:'Compare progress with the plan and correct course early.',
   val:'Problems surface while they are still cheap to fix, not at the deadline.',
   tasks:['Compare actual vs planned cost, schedule and risks','Agree corrective actions','Track them to closure'],
   in:['Project Plan','Progress Status Record'],out:['Correction Register'],dp:['Project Management']},
  {id:'PM.4',t:'Project Closure',obj:'Deliver formally and obtain the customer\'s written acceptance.',
   val:'A signed Acceptance Record closes the contract cleanly and supports invoicing.',
   tasks:['Complete delivery per agreed instructions','Obtain the signed Acceptance Record','Archive the project repository'],
   in:['Project Plan','Software Configuration'],out:['Acceptance Record'],dp:['Project Management','Product Delivery']}
 ],
 SI:[
  {id:'SI.1',t:'Implementation Initiation',obj:'Make sure the team understands and commits to the plan.',
   val:'Everyone starts from the same understanding of scope and schedule.',
   tasks:['Review the Project Plan with the team','Set up the development environment'],
   in:['Project Plan'],out:['Reviewed plan','Ready environment'],dp:['Project Management']},
  {id:'SI.2',t:'Requirements Analysis',obj:'Agree, verify and validate requirements with the customer.',
   val:'Most project failures start with misunderstood requirements. Agreeing them up front reduces disputes and rework.',
   tasks:['Elicit and document requirements','Verify and validate them with the customer','Baseline them under version control'],
   in:['Project Plan'],out:['Requirements Specification','Validation Results'],dp:['Requirements Analysis','Verification and Validation']},
  {id:'SI.3',t:'Architecture and Detailed Design',obj:'Design the solution and plan the tests, with traceability to requirements.',
   val:'A documented design reduces dependence on any one developer and makes changes safer.',
   tasks:['Produce architectural and detailed design','Define test cases and procedures','Update the Traceability Record'],
   in:['Requirements Specification'],out:['Software Design','Test Cases and Test Procedures','Traceability Record'],dp:['Architecture and Detailed Design','Verification and Validation']},
  {id:'SI.4',t:'Construction',obj:'Build and unit-test the software components.',
   val:'Defects are caught at the cheapest point: while the code is being written.',
   tasks:['Build software components','Write and run unit tests','Correct defects'],
   in:['Software Design'],out:['Software Components'],dp:['Construction and Unit Testing','Version Control']},
  {id:'SI.5',t:'Integration and Tests',obj:'Integrate the components and prove the system meets the requirements.',
   val:'A Test Report gives you, and your customer, evidence that what was agreed was delivered.',
   tasks:['Integrate the software','Run integration and system tests','Record results and fix defects','Prepare operation and user guides'],
   in:['Software Components','Test Cases and Test Procedures'],out:['Test Report','Product Operation Guide','Software User Documentation'],dp:['Software Testing and Integration']},
  {id:'SI.6',t:'Product Delivery',obj:'Package and hand over the product, ready for support.',
   val:'Clean handover with maintenance documentation lowers your support costs after go-live.',
   tasks:['Prepare maintenance documentation','Verify all deliverables','Baseline and deliver the Software Configuration'],
   in:['Software'],out:['Software Configuration','Maintenance Documentation'],dp:['Product Delivery','Version Control']}
 ]
};
let cur='PM';
const actsEl=document.getElementById('acts'), panel=document.getElementById('panel');
const chips=a=>a.map(x=>`<span class="chip">${x}</span>`).join('');
function renderActs(){
  actsEl.innerHTML='';
  acts[cur].forEach((a,i)=>{
    const b=document.createElement('button'); b.className='act'+(i===0?' on':'');
    b.innerHTML=`<code>${a.id}</code>${a.t}`;
    b.onclick=()=>{actsEl.querySelectorAll('.act').forEach(x=>x.classList.remove('on'));b.classList.add('on');renderPanel(a)};
    actsEl.appendChild(b);
  });
  renderPanel(acts[cur][0]);
}
function renderPanel(a){
  panel.innerHTML=`<div class="eyebrow" style="color:${cur==='PM'?'var(--pm)':'var(--si)'}">${a.id}</div>
  <h3>${a.t}</h3><p style="color:var(--muted);margin-top:0">${a.obj}</p>
  <div class="value"><b>Business value:</b> ${a.val}</div>
  <h4>Key tasks</h4><ul>${a.tasks.map(t=>`<li>${t}</li>`).join('')}</ul>
  <div class="io"><div><h4>Main inputs</h4>${chips(a.in)}</div><div><h4>Main outputs</h4>${chips(a.out)}</div></div>
  <h4>Deployment Packages that help</h4>${a.dp.map(d=>`<a class="chip" href="deployment-packages.html" style="text-decoration:none;color:var(--cherry)">📦 ${d}</a>`).join('')}`;
}
document.querySelectorAll('[data-proc]').forEach(t=>t.onclick=()=>{
  document.querySelectorAll('[data-proc]').forEach(x=>x.classList.remove('on'));t.classList.add('on');cur=t.dataset.proc;renderActs();
});
renderActs();
})();

/* ---------- deployment packages ---------- */
(function(){
if(!document.getElementById('dpGrid')) return;
const dps=[
  {n:'Self-Assessment',g:['start'],cov:[['ALL','c-all']],d:'Evaluate your current practices against the Basic profile and identify the gaps to tackle first.',a:'T. Varkoi (Tampere Univ. of Technology, Finland)'},
  {n:'Select and Conduct Pilot Projects',g:['start'],cov:[['ALL','c-all']],d:'Plan and run a pilot project to trial new practices, with an assessment tool and templates for the pilot plan, pilot report and confidentiality agreement.',a:'C. Y. Laporte (ÉTS, Canada) & J. Triñanes (UDELAR, Uruguay)'},
  {n:'Project Management',g:['PM'],cov:[['PM.1–4','c-pm']],d:'Plan the project, track progress, manage change and risks, and close with customer acceptance.',a:'R. O\'Connor (Ireland)'},
  {n:'Version Control',g:['PM','SI'],cov:[['PM','c-pm'],['SI','c-si']],d:'Control versions of code and documents, and manage baselines and the project repository.',a:'S. Buasung with the Thai Industrial Standards Institute',th:true},
  {n:'Requirements Analysis',g:['SI'],cov:[['SI.2','c-si']],d:'Elicit, document, verify and validate requirements with the customer. Training material and a traceability tool are also available.',a:'Developed with CETIC (Belgium)'},
  {n:'Architecture and Detailed Design',g:['SI'],cov:[['SI.3','c-si']],d:'Translate requirements into an architecture and detailed design that the team can build and maintain.',a:'F. Guillemot & R. Champagne (ÉTS, Canada)'},
  {n:'Construction and Unit Testing',g:['SI'],cov:[['SI.4','c-si']],d:'Coding practices and unit testing to catch defects as components are built.',a:'A. Vasquez (Mexico)'},
  {n:'Software Testing and Integration',g:['SI'],cov:[['SI.5','c-si']],d:'Integrate components, run system tests and produce a Test Report as evidence of quality.',a:'L. Gómez Arenas (ParqueSoft, Colombia)'},
  {n:'Verification and Validation',g:['SI'],cov:[['SI.2–6','c-si']],d:'Review kits and checklists for checking work products and confirming they meet the customer\'s needs.',a:'E. Palza (ÉTS, Canada)'},
  {n:'Product Delivery',g:['SI','PM'],cov:[['SI.6','c-si'],['PM.4','c-pm']],d:'Package, document and hand over the product so it can be operated and maintained.',a:'C. Y. Laporte (ÉTS) with TISI and SIPA (Thailand)',th:true}
];
let dpf='all';
const dpGrid=document.getElementById('dpGrid');
function renderDp(){
  dpGrid.innerHTML=dps.filter(p=>dpf==='all'||p.g.includes(dpf)).map(p=>`
    <div class="dp">
      <div class="covers">${p.cov.map(c=>`<span class="${c[1]}">${c[0]}</span>`).join('')}</div>
      <h3>📦 ${p.n}</h3>
      <p>${p.d}</p>
      <div class="meta">${p.a}${p.th?'<span class="th-flag">· Thai contribution</span>':''}</div>
    </div>`).join('');
}
document.querySelectorAll('[data-dp]').forEach(t=>t.onclick=()=>{
  document.querySelectorAll('[data-dp]').forEach(x=>x.classList.remove('on'));t.classList.add('on');dpf=t.dataset.dp;renderDp();
});
renderDp();
})();

/* ---------- roles ---------- */
(function(){
if(!document.getElementById('roleGrid')) return;
const roles=[
  ['CUS','Customer','Provides the Statement of Work, joins reviews, validates requirements and signs acceptance.','Your client'],
  ['PJM','Project Manager','Plans and controls the project; manages risk, change and customer communication.','Often the owner or a senior developer'],
  ['TL','Technical Leader','Makes technical decisions, coordinates the team and checks technical work.','Lead developer'],
  ['WT','Work Team','The development team, collectively responsible for the product.','All developers'],
  ['AN','Analyst','Elicits and specifies requirements with the customer.','PM, BA or senior dev'],
  ['DES','Designer','Produces the architecture and detailed design.','Lead or senior developer'],
  ['PR','Programmer','Builds, unit-tests and integrates components.','Developers']
];
document.getElementById('roleGrid').innerHTML=roles.map(r=>`<div class="card"><span class="tag">${r[0]}</span><h3>${r[1]}</h3><p>${r[2]}</p><p style="font-size:.85rem;margin-top:8px"><strong style="color:var(--ink)">In a small firm:</strong> ${r[3]}</p></div>`).join('');
})();

/* ---------- work products ---------- */
(function(){
if(!document.getElementById('wpGrid')) return;
const wps=[
  ['Statement of Work','PM','From the customer: scope, deliverables and schedule.'],
  ['Project Plan','PM','Tasks, schedule, resources, risks and delivery instructions.'],
  ['Progress Status Record','PM','Actual vs planned progress, cost and schedule.'],
  ['Meeting Record','PM','Decisions and action items from reviews.'],
  ['Change Request','PM','A requested change, its impact and decision.'],
  ['Correction Register','PM','Problems found and corrective actions.'],
  ['Acceptance Record','PM','Customer\'s formal sign-off on delivery.'],
  ['Project Repository','PM','Controlled storage for all project work products.'],
  ['Requirements Specification','SI','What the software must do, agreed with the customer.'],
  ['Software Design','SI','Architecture and detailed design.'],
  ['Traceability Record','SI','Links requirements to design, code and tests.'],
  ['Test Cases and Test Procedures','SI','What to test and how.'],
  ['Test Report','SI','Results of integration and system testing.'],
  ['Software Configuration','SI','The baselined deliverable set.'],
  ['Software User Documentation','SI','How end-users operate the software.'],
  ['Product Operation Guide','SI','How to install and run the product.'],
  ['Maintenance Documentation','SI','What support staff need after go-live.'],
  ['Verification / Validation Results','SI','Evidence that work products were checked and meet needs.']
];
let wpf='all';
const wpGrid=document.getElementById('wpGrid'), wpSearch=document.getElementById('wpSearch');
function renderWp(){
  const q=wpSearch.value.toLowerCase();
  const list=wps.filter(w=>(wpf==='all'||w[1]===wpf)&&(w[0]+' '+w[2]).toLowerCase().includes(q));
  wpGrid.innerHTML=list.length?list.map(w=>`<div class="wp"><b><span class="dot" style="background:${w[1]==='PM'?'var(--pm)':'var(--si)'}"></span>${w[0]}</b><small>${w[1]} · ${w[2]}</small></div>`).join(''):'<p style="color:var(--muted)">No matching documents.</p>';
}
wpSearch.oninput=renderWp;
document.querySelectorAll('[data-wp]').forEach(t=>t.onclick=()=>{
  document.querySelectorAll('[data-wp]').forEach(x=>x.classList.remove('on'));t.classList.add('on');wpf=t.dataset.wp;renderWp();
});
renderWp();
})();


/* ---------- wg24 members ---------- */
(function(){
if(!document.getElementById('memberChips')) return;
// Add people to a country's list to publish them. Each person: name, role, bio (paragraphs), contributions.
const members=[
  {c:'Belgium',p:[]},{c:'Canada',p:[]},{c:'Czech Republic',p:[]},{c:'India',p:[]},{c:'Ireland',p:[]},
  {c:'Italy',p:[]},{c:'Japan',p:[]},{c:'Korea',p:[]},{c:'Luxembourg',p:[]},{c:'Mexico',p:[]},
  {c:'South Africa',p:[]},
  {c:'Thailand',p:[
    {name:'Prakit Sangpar',initials:'PS',role:'WG24 member · Thailand',
     bio:['Prakit Sangpar has worked on bringing ISO/IEC 29110 to Thai software companies. While with the Thailand Industrial Standards Institute (TISI), he co-developed the Product Delivery Deployment Package for the Basic profile with Claude Y. Laporte (ÉTS Montréal) and Sujimarn Suwannaroj of the Software Industry Promotion Agency (SIPA).'],
     contrib:['Product Delivery Deployment Package (co-developer)']}
  ]},
  {c:'United Kingdom',p:[]},{c:'United States',p:[]}
];
const chips=document.getElementById('memberChips'), panel=document.getElementById('memberPanel');
members.forEach((m,i)=>{
  const b=document.createElement('button'); b.type='button'; b.setAttribute('role','tab');
  b.innerHTML=m.c+(m.p.length?`<span class="cnt">(${m.p.length})</span>`:'');
  b.onclick=()=>{chips.querySelectorAll('button').forEach(x=>{x.classList.remove('on');x.setAttribute('aria-selected','false')});b.classList.add('on');b.setAttribute('aria-selected','true');show(m)};
  chips.appendChild(b);
});
function show(m){
  if(!m.p.length){panel.innerHTML=`<p class="member-empty">Member profiles for ${m.c} will be added soon.</p>`;return;}
  panel.innerHTML=m.p.map(x=>`<div class="person"><div class="avatar" aria-hidden="true">${x.initials}</div><div>
    <h4>${x.name}</h4><div class="role">${x.role}</div>${x.bio.map(t=>`<p>${t}</p>`).join('')}
    ${x.contrib&&x.contrib.length?`<div>${x.contrib.map(c=>`<span class="chip">📦 ${c}</span>`).join('')}</div>`:''}</div></div>`).join('');
}
})();

