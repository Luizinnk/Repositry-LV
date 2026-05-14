const slug=document.body.dataset.country;
const country=findCountry(slug);
function localPath(path){return (path||"paises/img/viajeio.png").replace("paises/","");}
function carousel(images,label){
  return `<div class="image-carousel premium-carousel" aria-label="${label}">${images.map((src,index)=>`<figure class="carousel-slide"><img src="${src}" alt="${label} ${index+1}"><figcaption><strong>${String(index+1).padStart(2,"0")}</strong><span>${label}</span></figcaption></figure>`).join("")}</div>`;
}
function setText(id,value){const node=document.querySelector(id);if(node)node.textContent=value;}
function setHTML(id,value){const node=document.querySelector(id);if(node)node.innerHTML=value;}
if(country){
  const localImage=localPath(country.image);
  const rivals=COUNTRIES.filter(item=>item.group===country.group&&item.slug!==country.slug);
  const rivalText=rivals.map(item=>item.name).join(", ");
  document.title=`${country.name} | Viagem de Copa`;
  document.documentElement.style.setProperty("--accent",country.palette[0]);
  document.documentElement.style.setProperty("--accent-two",country.palette[1]);
  document.documentElement.style.setProperty("--accent-three",country.palette[2]);
  document.documentElement.style.setProperty("--flag-image",`url("${country.flagLarge}")`);
  document.documentElement.style.setProperty("--hero-image",`url("${localImage}")`);
  document.body.style.setProperty("--page-bg",`linear-gradient(135deg,${country.palette[0]},${country.palette[2]})`);
  document.querySelector(".site-header")?.style.setProperty("--hero-image",`url("${localImage}")`);
  document.querySelectorAll(".country-name").forEach(node=>node.textContent=country.name);
  document.querySelectorAll(".country-flag").forEach(node=>{node.src=country.flagLarge;node.alt=`Bandeira de ${country.name}`;});
  setText("#boarding-code",`${country.group}-${country.confed}`);
  setText("#welcome-title",country.welcomeNative);
  setText("#welcome-subtitle",`Embarque para ${country.capital}: uma viagem pela cultura, pelas ruas, pela torcida e pela seleção de ${country.name}.`);
  setText("#passport-country",country.name);
  setText("#passport-capital",country.capital);
  setText("#passport-language",country.language);
  setText("#passport-group",`Grupo ${country.group}`);
  setText("#eyebrow",`Grupo ${country.group} • ${country.confed} • ${country.league}`);
  setHTML("#title",`${country.name}<span> viagem de Copa</span>`);
  setText("#summary",country.summary);
  setText("#doc-title",`Capítulo 1: sentir ${country.name}`);
  setHTML("#doc-body",`<p>${country.summary}</p><p>${country.culture}</p><p>${country.footballNote}</p><p>Este tour foi pensado para dar a sensação de atravessar o país pelo olhar da Copa: bandeira, território, costumes, arquibancada, liga nacional e personagens históricos aparecem como partes da mesma viagem.</p>`);
  setText("#rivals",`Rota do Grupo ${country.group}: ${country.name} cruza caminho com ${rivalText}.`);
  setText("#football-note",country.footballNote);
  setHTML("#football-list",`<div class="football-item"><strong>Liga nacional</strong><span>${country.league}</span></div><div class="football-item"><strong>Copas vencidas</strong><span>${country.worldCups}</span></div><div class="football-item"><strong>Maior artilheiro</strong><span>${country.topScorer}</span></div><div class="football-item"><strong>Confederação</strong><span>${country.confed}</span></div>`);
  setHTML("#passport-grid",`<div><strong>Capital</strong><span>${country.capital}</span></div><div><strong>Idioma</strong><span>${country.language}</span></div><div><strong>Grupo</strong><span>${country.group}</span></div><div><strong>Liga</strong><span>${country.league}</span></div>`);
  setHTML("#country-carousel",carousel(country.gallery,`Paisagens de ${country.name}`));
  setHTML("#football-carousel",carousel([country.flagLarge,localImage,`https://source.unsplash.com/1200x800/?football,${encodeURIComponent(country.name)}`,`https://source.unsplash.com/1200x800/?stadium,${encodeURIComponent(country.name)}`,`https://source.unsplash.com/1200x800/?fans,football`],`Futebol de ${country.name}`));
  setHTML("#culture-cards",country.cultureCards.map((card,index)=>`<article class="culture-card reveal"><span class="number">0${index+1}</span><h3>${card.title}</h3><p>${card.text}</p></article>`).join(""));
  setHTML("#rival-cards",rivals.map(item=>`<a class="rival-card reveal" href="${item.slug}.html" style="--rival:${item.palette[0]}"><img src="${item.flag}" alt="Bandeira de ${item.name}"><strong>${item.name}</strong><span>${item.capital}</span></a>`).join(""));
}
function revealNow(){
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}})},{threshold:.16,rootMargin:"0px 0px -80px 0px"});
  document.querySelectorAll(".reveal:not(.visible)").forEach(element=>observer.observe(element));
}
function enterCountry(event){
  event.preventDefault();
  const intro=document.querySelector(".travel-intro");
  intro?.classList.add("departing");
  window.setTimeout(()=>document.querySelector("#inicio")?.scrollIntoView({behavior:"smooth"}),760);
}
document.querySelector("#enter-country")?.addEventListener("click",enterCountry);
window.addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const percent=max>0?(window.scrollY/max)*100:0;
  const bar=document.querySelector("#scroll-progress");
  if(bar)bar.style.width=`${percent}%`;
},{passive:true});
revealNow();
