(function renderCountryPage() {
  const root = document.querySelector("[data-country-root]");
  const slug =
    window.VIAJEIO_COUNTRY ||
    document.body.dataset.country ||
    location.pathname.split("/").pop().replace(".html", "");
  const country = window.VIAJEIO_COUNTRIES && window.VIAJEIO_COUNTRIES[slug];

  if (!root || !country) return;

  document.title = `${country.name} | VIAJEIO O MUNDO`;
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", `${country.name}: turismo, cultura, gastronomia, historia e futebol — Copa 2026.`);
  }

  const identity = country.identity || {};
  const palette = identity.palette || ["#d7b56d", "#4da3ff", "#f5f7fa"];
  document.documentElement.style.setProperty("--team-primary",   palette[0]);
  document.documentElement.style.setProperty("--team-secondary", palette[1]);
  document.documentElement.style.setProperty("--team-accent",    palette[2]);

  /* ── Spots de turismo ──────────────────────────────────── */
  const tourismCards = country.spots
    .map((spot) => `
      <article class="info-card cup-card">
        <img src="${spot.image}" data-web-image="${spot.imageQuery}" alt="${spot.title}" loading="lazy">
        <div>
          <h3>${spot.title}</h3>
          <p>${spot.text}</p>
        </div>
      </article>
    `)
    .join("");

  /* ── Prato culinário ───────────────────────────────────── */
  const buildDishCards = () => {
    const dishes = country.dishes || [];
    if (!dishes.length) {
      return `
        <div class="flavor-panel">
          <span>${country.flag}</span>
          <p>${country.gastronomy}</p>
        </div>`;
    }
    const cards = dishes.map((d) => `
      <article class="dish-card">
        <img src="${d.image}" data-web-image="${d.imageQuery}" alt="${d.name}" loading="lazy">
        <div class="dish-card-body">
          <span class="dish-emoji" aria-hidden="true">${d.emoji}</span>
          <h3>${d.name}</h3>
          <p>${d.description}</p>
        </div>
      </article>`).join("");
    return `<div class="dish-grid">${cards}</div>`;
  };

  /* ── Curiosidades como cards numerados ─────────────────── */
  const curiosityCards = country.curiosities
    .map((text, i) => `
      <article class="curiosity-card">
        <span class="curiosity-num">0${i + 1}</span>
        <p>${text}</p>
      </article>`)
    .join("");

  /* ── Galeria ───────────────────────────────────────────── */
  const galleryItems = country.gallery
    .map((item) => `
      <figure class="gallery-card">
        <img src="${item.image}" data-web-image="${item.imageQuery}" alt="${item.label}" loading="lazy">
        <span>${item.label}</span>
      </figure>`)
    .join("");

  /* ── Facts strip ───────────────────────────────────────── */
  const factsData = country.facts || {};
  const factsEntries = [
    ["🏛️", "Capital",    factsData.capital],
    ["👥", "Populacao",  factsData.population],
    ["🗣️", "Idioma",    factsData.language],
    ["💰", "Moeda",      factsData.currency],
  ].filter(([, , v]) => v);

  const factsStrip = factsEntries.length ? `
    <div class="country-facts-strip reveal">
      ${factsEntries.map(([icon, label, value]) => `
        <div class="fact-chip">
          <span class="fact-icon" aria-hidden="true">${icon}</span>
          <b>${label}</b>
          <p>${value}</p>
        </div>`).join("")}
    </div>` : "";

  /* ── Football stats ────────────────────────────────────── */
  const fs = country.footballStat || {};
  const footballStatsHTML = (fs.titles !== undefined || fs.player || fs.style) ? `
    <div class="football-stats-row reveal">
      ${fs.titles !== undefined ? `
        <div class="fstat-card">
          <strong>${fs.titles}</strong>
          <span>Titulos Copa</span>
        </div>` : ""}
      ${fs.firstTitle ? `
        <div class="fstat-card">
          <strong>${fs.firstTitle}</strong>
          <span>Primeiro titulo</span>
        </div>` : ""}
      ${fs.player ? `
        <div class="fstat-card fstat-wide">
          <strong>${fs.player}</strong>
          <span>Jogador marcante</span>
        </div>` : ""}
      ${fs.style ? `
        <div class="fstat-card fstat-wide">
          <strong>${fs.style}</strong>
          <span>Estilo de jogo</span>
        </div>` : ""}
    </div>` : "";

  /* ── Render completo ───────────────────────────────────── */
  root.innerHTML = `

    <!-- HERO -->
    <section class="country-hero" data-bg-query="${country.heroQuery}" style="--hero-image: url('${country.hero}');">
      <div class="country-hero-content reveal">
        <p class="country-event-label">${country.group} &bull; Copa 2026</p>
        <span class="flag-badge animated-flag">${country.flag}</span>
        <h1>${country.name}</h1>
        <p>${country.tagline}</p>
        <div class="country-match-strip" aria-label="Resumo do destino">
          <span>${country.group}</span>
          <span>${identity.region || "Roteiro cultural"}</span>
          <span>${identity.football || "Futebol e viagem"}</span>
        </div>
      </div>
      <aside class="country-hero-passport reveal" aria-label="Passaporte visual de ${country.name}">
        <small>Passaporte</small>
        <div class="passport-flag">
          ${identity.flagUrl
            ? `<img src="${identity.flagUrl}" alt="Bandeira de ${country.name}" loading="lazy">`
            : `<span>${country.flag}</span>`}
        </div>
        <strong>${country.name}</strong>
        <p>${identity.signature || country.tagline}</p>
        <div class="passport-route">
          <span>${country.group}</span>
          <i></i>
          <span>${identity.region || "Destino global"}</span>
        </div>
        <div class="passport-colors" aria-hidden="true">
          ${palette.map((c) => `<i style="--swatch:${c}"></i>`).join("")}
        </div>
      </aside>
    </section>

    <!-- ANCHOR NAV -->
    <nav class="anchor-nav" aria-label="Navegacao interna">
      <a href="#pais">O pais</a>
      <a href="#turismo">Turismo</a>
      <a href="#cultura">Cultura</a>
      <a href="#gastronomia">Gastronomia</a>
      <a href="#historia">Historia</a>
      <a href="#curiosidades">Curiosidades</a>
      <a href="#futebol">Futebol</a>
      <a href="#galeria">Galeria</a>
    </nav>

    <!-- FACTS STRIP -->
    ${factsStrip}

    <!-- O PAIS: visao geral + identidade -->
    <section class="content-section" id="pais">
      <div class="section-inner split-layout reveal">
        <div>
          <p class="section-kicker">O pais</p>
          <h2>${country.overviewTitle}</h2>
          <p class="lead">${country.overview}</p>

          ${factsEntries.length === 0 ? "" : `
          <div class="identity-facts" style="margin-top:1.5rem;">
            ${factsEntries.map(([icon, label, value]) =>
              `<span><b>${icon} ${label}</b>${value}</span>`).join("")}
          </div>`}
        </div>
        <figure class="image-panel event-frame">
          <img src="${country.portrait}" data-web-image="${country.portraitQuery || country.heroQuery}" alt="Paisagem de ${country.name}" loading="lazy">
        </figure>
      </div>
    </section>

    <!-- TURISMO -->
    <section class="content-section stadium-section" id="turismo">
      <div class="section-inner reveal">
        <p class="section-kicker">Turismo</p>
        <h2>${country.tourismTitle}</h2>
        <p class="lead">${country.tourismText}</p>
        <div class="card-grid">${tourismCards}</div>
      </div>
    </section>

    <!-- CULTURA (feature band) -->
    <section class="content-section feature-band" id="cultura"
      data-bg-query="${country.cultureQuery || country.heroQuery}"
      style="--feature-image: url('${country.cultureImage}');">
      <div class="section-inner reveal">
        <p class="section-kicker">Cultura</p>
        <h2>${country.cultureTitle}</h2>
        <p class="lead">${country.culture}</p>
      </div>
    </section>

    <!-- GASTRONOMIA -->
    <section class="content-section" id="gastronomia">
      <div class="section-inner reveal">
        <p class="section-kicker">Gastronomia</p>
        <h2>${country.gastronomyTitle}</h2>
        <p class="lead">${(country.dishes && country.dishes.length) ? country.gastronomy : ""}</p>
        ${buildDishCards()}
      </div>
    </section>

    <!-- HISTORIA -->
    <section class="content-section" id="historia">
      <div class="section-inner split-layout reveal">
        <div class="timeline-panel cup-timeline">
          <p class="section-kicker">Historia</p>
          <h2>${country.historyTitle}</h2>
          <p>${country.history}</p>
        </div>
        <aside class="scoreboard-card" aria-label="Cartao do pais">
          <span class="scoreboard-flag">${country.flag}</span>
          <small>${country.group} &bull; Copa 2026</small>
          <strong>${country.name}</strong>
          <p>Cultura, turismo, historia e futebol em uma unica jornada.</p>
        </aside>
      </div>
    </section>

    <!-- CURIOSIDADES -->
    <section class="content-section" id="curiosidades">
      <div class="section-inner reveal">
        <p class="section-kicker">Curiosidades</p>
        <h2>O que poucos sabem sobre ${country.name}.</h2>
        <div class="curiosity-grid">${curiosityCards}</div>
      </div>
    </section>

    <!-- FUTEBOL (feature band) -->
    <section class="content-section feature-band football-band" id="futebol"
      data-bg-query="${country.footballQuery || "football stadium world cup"}"
      style="--feature-image: url('${country.footballImage}');">
      <div class="section-inner reveal">
        <p class="section-kicker">Futebol</p>
        <h2>${country.footballTitle}</h2>
        <p class="lead">${country.football}</p>
        ${footballStatsHTML}
      </div>
    </section>

    <!-- GALERIA -->
    <section class="content-section" id="galeria">
      <div class="section-inner reveal">
        <p class="section-kicker">Galeria</p>
        <h2>Uma selecao de imagens para entrar no clima.</h2>
        <div class="gallery-grid">${galleryItems}</div>
      </div>
    </section>

    <!-- PROXIMA VIAGEM -->
    <section class="next-trip">
      <div>
        <strong>Continue a volta ao mundo pelos grupos da Copa.</strong>
        <a href="index.html#grupos">Ver todos os paises</a>
      </div>
    </section>
  `;
})();
