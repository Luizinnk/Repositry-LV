(function renderCountryPage() {
  const root = document.querySelector("[data-country-root]");
  const slug =
    window.VIAJEIO_COUNTRY ||
    document.body.dataset.country ||
    location.pathname.split("/").pop().replace(".html", "");
  const country = window.VIAJEIO_COUNTRIES && window.VIAJEIO_COUNTRIES[slug];

  if (!root || !country) {
    return;
  }

  document.title = `${country.name} | VIAJEIO O MUNDO`;
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", `${country.name}: turismo, cultura, gastronomia, historia, curiosidades e futebol em uma experiencia de Copa do Mundo.`);
  }

  const identity = country.identity || {};
  const palette = identity.palette || ["#d7b56d", "#4da3ff", "#f5f7fa"];
  document.documentElement.style.setProperty("--team-primary", palette[0]);
  document.documentElement.style.setProperty("--team-secondary", palette[1]);
  document.documentElement.style.setProperty("--team-accent", palette[2]);

  const tourismCards = country.spots
    .map(
      (spot) => `
        <article class="info-card cup-card">
          <img src="${spot.image}" data-web-image="${spot.imageQuery}" alt="${spot.title} em ${country.name}" loading="lazy">
          <div>
            <h3>${spot.title}</h3>
            <p>${spot.text}</p>
          </div>
        </article>
      `
    )
    .join("");

  const curiosityItems = country.curiosities
    .map((item) => `<li>${item}</li>`)
    .join("");

  const galleryItems = country.gallery
    .map(
      (item) => `
        <figure class="gallery-card">
          <img src="${item.image}" data-web-image="${item.imageQuery}" alt="${item.label} em ${country.name}" loading="lazy">
          <span>${item.label}</span>
        </figure>
      `
    )
    .join("");

  root.innerHTML = `
    <section class="country-hero" data-bg-query="${country.heroQuery}" style="--hero-image: url('${country.hero}');">
      <div class="country-hero-content reveal">
        <p class="country-event-label">${country.group} • Experiencia de Copa</p>
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
        <small>Passaporte digital</small>
        <div class="passport-flag">
          ${identity.flagUrl ? `<img src="${identity.flagUrl}" alt="Bandeira de ${country.name}" loading="lazy">` : `<span>${country.flag}</span>`}
        </div>
        <strong>${country.name}</strong>
        <p>${identity.signature || country.tagline}</p>
        <div class="passport-route">
          <span>${country.group}</span>
          <i></i>
          <span>${identity.region || "Destino global"}</span>
        </div>
        <div class="passport-colors" aria-hidden="true">
          ${palette.map((color) => `<i style="--swatch:${color}"></i>`).join("")}
        </div>
      </aside>
    </section>

    <nav class="anchor-nav" aria-label="Navegacao interna">
      <a href="#identidade">Identidade</a>
      <a href="#visao-geral">Visao geral</a>
      <a href="#turismo">Turismo</a>
      <a href="#cultura">Cultura</a>
      <a href="#gastronomia">Gastronomia</a>
      <a href="#historia">Historia</a>
      <a href="#curiosidades">Curiosidades</a>
      <a href="#futebol">Futebol</a>
      <a href="#galeria">Galeria</a>
    </nav>

    <section class="identity-section" id="identidade">
      <div class="section-inner reveal">
        <div class="identity-shell">
          <div class="identity-flag-card">
            ${identity.flagUrl ? `<img src="${identity.flagUrl}" alt="Bandeira de ${country.name}" loading="lazy">` : `<span>${country.flag}</span>`}
            <strong>${country.name}</strong>
            <small>${country.group} • Copa 2026</small>
          </div>
          <div class="identity-content">
            <p class="section-kicker">Identidade visual</p>
            <h2>${identity.symbol || "Identidade nacional em campo e na viagem."}</h2>
            <p class="lead">${identity.signature || country.tagline}</p>
            <div class="palette-strip" aria-label="Paleta inspirada na bandeira">
              ${palette.map((color) => `<span style="--swatch:${color}"><i>${color}</i></span>`).join("")}
            </div>
            <div class="identity-facts">
              <span><b>Regiao</b>${identity.region || "Destino global"}</span>
              <span><b>Futebol</b>${identity.football || country.footballTitle}</span>
              <span><b>Curiosidade</b>${identity.curiosity || "Um convite para descobrir simbolos, sabores e torcida."}</span>
            </div>
            <div class="identity-cta-panel">
              <b>Olhar de explorador</b>
              <p>${identity.symbol || country.name} nao aparece aqui como uma ficha fria: a pagina transforma cores, bandeira, paisagem e futebol em uma experiencia de descoberta.</p>
            </div>
            <div class="identity-stamp" aria-hidden="true">
              <span>${country.group}</span>
              <strong>${country.name}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="content-section" id="visao-geral">
      <div class="section-inner split-layout reveal">
        <div>
          <p class="section-kicker">Visao geral</p>
          <h2>${country.overviewTitle}</h2>
          <p class="lead">${country.overview}</p>
        </div>
        <figure class="image-panel event-frame">
          <img src="${country.portrait}" data-web-image="${country.portraitQuery || country.heroQuery}" alt="Paisagem de ${country.name}" loading="lazy">
        </figure>
      </div>
    </section>

    <section class="content-section stadium-section" id="turismo">
      <div class="section-inner reveal">
        <p class="section-kicker">Turismo</p>
        <h2>${country.tourismTitle}</h2>
        <p class="lead">${country.tourismText}</p>
        <div class="card-grid">${tourismCards}</div>
      </div>
    </section>

    <section class="content-section feature-band" id="cultura" data-bg-query="${country.cultureQuery || country.heroQuery}" style="--feature-image: url('${country.cultureImage}');">
      <div class="section-inner reveal">
        <p class="section-kicker">Cultura</p>
        <h2>${country.cultureTitle}</h2>
        <p class="lead">${country.culture}</p>
      </div>
    </section>

    <section class="content-section" id="gastronomia">
      <div class="section-inner reveal">
        <p class="section-kicker">Gastronomia</p>
        <h2>${country.gastronomyTitle}</h2>
        <p class="lead">${country.gastronomy}</p>
        <div class="flavor-panel">
          <span>${country.flag}</span>
          <p>Uma parada gastronomica pensada como roteiro sensorial: sabores, aromas e pratos que ajudam a entender o pais alem dos cartoes-postais.</p>
        </div>
      </div>
    </section>

    <section class="content-section" id="historia">
      <div class="section-inner split-layout reveal">
        <div class="timeline-panel cup-timeline">
          <p class="section-kicker">Historia</p>
          <h2>${country.historyTitle}</h2>
          <p>${country.history}</p>
        </div>
        <aside class="scoreboard-card" aria-label="Cartao do pais">
          <span class="scoreboard-flag">${country.flag}</span>
          <small>${country.group}</small>
          <strong>${country.name}</strong>
          <p>Cultura, turismo, historia e futebol em uma unica jornada virtual.</p>
        </aside>
      </div>
    </section>

    <section class="content-section" id="curiosidades">
      <div class="section-inner reveal">
        <p class="section-kicker">Curiosidades</p>
        <h2>Detalhes que fazem ${country.name} ficar na memoria.</h2>
        <ul class="fact-list">${curiosityItems}</ul>
      </div>
    </section>

    <section class="content-section feature-band football-band" id="futebol" data-bg-query="${country.footballQuery || "football stadium world cup"}" style="--feature-image: url('${country.footballImage}');">
      <div class="section-inner reveal">
        <p class="section-kicker">Futebol</p>
        <h2>${country.footballTitle}</h2>
        <p class="lead">${country.football}</p>
      </div>
    </section>

    <section class="content-section" id="galeria">
      <div class="section-inner reveal">
        <p class="section-kicker">Galeria</p>
        <h2>Uma selecao visual para entrar no clima da viagem.</h2>
        <div class="gallery-grid">${galleryItems}</div>
      </div>
    </section>

    <section class="next-trip">
      <div>
        <strong>Continue a volta ao mundo pelos grupos da Copa.</strong>
        <a href="index.html#grupos">Escolher outro pais</a>
      </div>
    </section>
  `;
})();
