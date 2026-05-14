const groupsContainer=document.querySelector("#groups");
const filters=document.querySelector("#filters");
const progress=document.querySelector("#scroll-progress");
function renderGroups(activeGroup="all"){
  groupsContainer.innerHTML="";
  GROUPS.filter(group=>activeGroup==="all"||group===activeGroup).forEach((group,index)=>{
    const teams=COUNTRIES.filter(country=>country.group===group);
    const card=document.createElement("article");
    card.className="group-card reveal travel-gate";
    card.style.transitionDelay=`${Math.min(index*45,320)}ms`;
    card.innerHTML=`<div class="group-top"><h3>Portão ${group}</h3><span>${teams.length} seleções</span></div><div class="teams">${teams.map(country=>`<a class="team-link" style="--team-accent:${country.palette[0]};--team-second:${country.palette[1]};--team-third:${country.palette[2]}" href="paises/${country.slug}.html"><img src="${country.flag}" alt="Bandeira de ${country.name}"><span><strong>${country.name}</strong><span>${country.capital} • ${country.confed}</span><em>${country.league}</em></span><img class="flag-mini" src="${country.flag}" alt=""></a>`).join("")}</div>`;
    groupsContainer.appendChild(card);
  });
  revealNow();
}
function renderFilters(){
  filters.innerHTML=`<button class="chip active" type="button" data-group="all">Todos os portões</button>`+GROUPS.map(group=>`<button class="chip" type="button" data-group="${group}">Grupo ${group}</button>`).join("");
  filters.addEventListener("click",event=>{
    const button=event.target.closest(".chip");
    if(!button)return;
    document.querySelectorAll(".chip").forEach(chip=>chip.classList.remove("active"));
    button.classList.add("active");
    renderGroups(button.dataset.group);
  });
}
function revealNow(){
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}})},{threshold:.14,rootMargin:"0px 0px -70px 0px"});
  document.querySelectorAll(".reveal:not(.visible)").forEach(element=>observer.observe(element));
}
window.addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const percent=max>0?(window.scrollY/max)*100:0;
  if(progress)progress.style.width=`${percent}%`;
},{passive:true});
renderFilters();renderGroups();revealNow();
