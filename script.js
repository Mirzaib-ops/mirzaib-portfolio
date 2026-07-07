document.getElementById('menuBtn').addEventListener('click', ()=>{document.getElementById('drawer').classList.add('open')});
document.getElementById('closeBtn').addEventListener('click', ()=>{document.getElementById('drawer').classList.remove('open')});
// close when clicking nav
document.querySelectorAll('.drawer .nav a').forEach(a=>a.addEventListener('click', ()=>{document.getElementById('drawer').classList.remove('open')}));
// highlight active on scroll (simple)
const sections=document.querySelectorAll('main section[id]');
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('.drawer .nav a').forEach(link=>link.classList.toggle('active', link.getAttribute('href')==('#'+e.target.id))}})},{threshold:0.4});
sections.forEach(s=>observer.observe(s));