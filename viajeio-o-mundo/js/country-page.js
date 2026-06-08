(function renderCountryPage() {
  const root = document.querySelector("[data-country-root]");
  const slug =
    window.VIAJEIO_COUNTRY ||
    document.body.dataset.country ||
    location.pathname.split("/").pop().replace(".html", "");
  const country = window.VIAJEIO_COUNTRIES && window.VIAJEIO_COUNTRIES[slug];

  if (!root || !country) return;

  const baseUrl = "https://luizinnk.github.io/Repositry-LV/viajeio-o-mundo/";
  const pageUrl = `${baseUrl}${slug}.html`;
  const metaDesc = `${country.name}: turismo, cultura, gastronomia, história e futebol — Copa do Mundo 2026.`;

  document.title = `${country.name} | VIAJEIO O MUNDO`;

  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", metaDesc);

  // Canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = pageUrl;

  // Open Graph
  const ogMetas = {
    "og:title":       `${country.name} — VIAJEIO O MUNDO`,
    "og:description": metaDesc,
    "og:url":         pageUrl,
    "og:type":        "website",
    "og:image":       country.hero || `${baseUrl}img/logo.png`,
  };
  Object.entries(ogMetas).forEach(([prop, content]) => {
    let el = document.querySelector(`meta[property="${prop}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("property", prop);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  });

  // JSON-LD
  const existingLd = document.querySelector('script[type="application/ld+json"]');
  const ldScript = existingLd || document.createElement("script");
  ldScript.type = "application/ld+json";
  ldScript.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": country.name,
    "description": metaDesc,
    "url": pageUrl,
    "inLanguage": "pt-BR",
    "image": country.hero || `${baseUrl}img/logo.png`,
    "touristType": ["Turismo Cultural", "Turismo Esportivo"],
    "includesAttraction": (country.spots || []).slice(0, 3).map((s) => ({
      "@type": "TouristAttraction",
      "name": s.title,
      "description": s.text,
    })),
  });
  if (!existingLd) document.head.appendChild(ldScript);

  const identity = country.identity || {};
  const palette = identity.palette || ["#d7b56d", "#4da3ff", "#f5f7fa"];
  document.documentElement.style.setProperty("--team-primary",   palette[0]);
  document.documentElement.style.setProperty("--team-secondary", palette[1]);
  document.documentElement.style.setProperty("--team-accent",    palette[2]);

  /* ── Próximo país do grupo ────────────────────────────── */
  const allGroups = window.VIAJEIO_WORLD_CUP_2026_GROUPS || [];
  let nextSlug = null;
  let nextCtry = null;
  for (const g of allGroups) {
    const idx = g.countries.indexOf(slug);
    if (idx !== -1) {
      const ni = (idx + 1) % g.countries.length;
      if (g.countries[ni] !== slug) {
        nextSlug = g.countries[ni];
        nextCtry = window.VIAJEIO_COUNTRIES[nextSlug];
      }
      break;
    }
  }

  /* ── Spots de turismo ──────────────────────────────────── */
  const tourismCards = country.spots
    .map(
      (spot) => `
      <article class="info-card cup-card">
        <img src="${spot.image}" data-web-image="${spot.imageQuery}" alt="${spot.title}" loading="lazy" decoding="async">
        <div>
          <h3>${spot.title}</h3>
          <p>${spot.text}</p>
        </div>
      </article>`
    )
    .join("");

  /* ── Pratos culinários ─────────────────────────────────── */
  const buildDishCards = () => {
    const dishes = country.dishes || [];
    if (!dishes.length) {
      return `
        <div class="flavor-panel">
          <span>${country.flag}</span>
          <p>${country.gastronomy}</p>
        </div>`;
    }
    const cards = dishes
      .map(
        (d) => `
      <article class="dish-card">
        <img src="${d.image}" data-web-image="${d.imageQuery}" alt="${d.name}" loading="lazy" decoding="async">
        <div class="dish-card-body">
          <span class="dish-emoji" aria-hidden="true">${d.emoji}</span>
          <h3>${d.name}</h3>
          <p>${d.description}</p>
        </div>
      </article>`
      )
      .join("");
    return `<div class="dish-grid">${cards}</div>`;
  };

  /* ── Curiosidades como cards numerados ─────────────────── */
  const curiosityCards = country.curiosities
    .map(
      (text, i) => `
      <article class="curiosity-card">
        <span class="curiosity-num">0${i + 1}</span>
        <p>${text}</p>
      </article>`
    )
    .join("");

  /* ── Galeria ───────────────────────────────────────────── */
  const galleryItems = country.gallery
    .map(
      (item) => `
      <figure class="gallery-card">
        <img src="${item.image}" data-web-image="${item.imageQuery}" alt="${item.label}" loading="lazy" decoding="async">
        <span>${item.label}</span>
      </figure>`
    )
    .join("");

  /* ── Facts strip ───────────────────────────────────────── */
  const factsData = country.facts || {};
  const factsEntries = [
    ["🏛️", "Capital",    factsData.capital],
    ["👥", "População",  factsData.population],
    ["🗣️", "Idioma",    factsData.language],
    ["💰", "Moeda",      factsData.currency],
  ].filter(([, , v]) => v);

  const factsStrip = factsEntries.length
    ? `
    <div class="country-facts-strip reveal">
      ${factsEntries
        .map(
          ([icon, label, value]) => `
        <div class="fact-chip">
          <span class="fact-icon" aria-hidden="true">${icon}</span>
          <b>${label}</b>
          <p>${value}</p>
        </div>`
        )
        .join("")}
    </div>`
    : "";

  /* ── Football stats ────────────────────────────────────── */
  const fs = country.footballStat || {};
  const footballStatsHTML =
    fs.titles !== undefined || fs.player || fs.style
      ? `
    <div class="football-stats-row reveal">
      ${
        fs.titles !== undefined
          ? `
        <div class="fstat-card">
          <strong>${fs.titles}</strong>
          <span>Títulos Copa</span>
        </div>`
          : ""
      }
      ${
        fs.firstTitle
          ? `
        <div class="fstat-card">
          <strong>${fs.firstTitle}</strong>
          <span>Primeiro título</span>
        </div>`
          : ""
      }
      ${
        fs.player
          ? `
        <div class="fstat-card fstat-wide">
          <strong>${fs.player}</strong>
          <span>Jogador marcante</span>
        </div>`
          : ""
      }
      ${
        fs.style
          ? `
        <div class="fstat-card fstat-wide">
          <strong>${fs.style}</strong>
          <span>Estilo de jogo</span>
        </div>`
          : ""
      }
    </div>`
      : "";

  /* ── Primeiro Roteiro ──────────────────────────────────── */
  const d1Title = country.spots[0]?.title || country.overviewTitle;
  const d1Text  = (country.spots[0]?.text  || country.overview).slice(0, 130);
  const d2Emoji = country.dishes?.[0]?.emoji || "🍽️";
  const d2Title = country.dishes?.[0]?.name  || "Gastronomia local";
  const d2Text  = (country.dishes?.[0]?.description || country.gastronomy).slice(0, 130);
  const d3Text  = country.football.slice(0, 130);

  const roteiroSection = `
    <section class="content-section roteiro-section" id="roteiro">
      <div class="section-inner reveal">
        <p class="section-kicker">Primeiro Roteiro</p>
        <h2>Por onde começar em ${country.name}.</h2>
        <div class="itinerary-track">
          <article class="itinerary-day">
            <div class="day-badge">Dia 1</div>
            <div class="day-content">
              <b>Conhecer</b>
              <h3>${d1Title}</h3>
              <p>${d1Text}…</p>
            </div>
          </article>
          <article class="itinerary-day">
            <div class="day-badge">Dia 2</div>
            <div class="day-content">
              <b>Provar</b>
              <h3>${d2Emoji} ${d2Title}</h3>
              <p>${d2Text}…</p>
            </div>
          </article>
          <article class="itinerary-day">
            <div class="day-badge">Dia 3</div>
            <div class="day-content">
              <b>Assistir</b>
              <h3>🏆 ${country.name} na Copa 2026</h3>
              <p>${d3Text}…</p>
            </div>
          </article>
        </div>
      </div>
    </section>`;

  /* ── Próximo país pill ─────────────────────────────────── */
  const nextBlock =
    nextSlug && nextCtry
      ? `
    <div class="next-country-pill">
      <small>Próximo no grupo</small>
      <a href="${nextSlug}.html" class="next-country-link">
        ${
          nextCtry.identity?.flagUrl
            ? `<img src="${nextCtry.identity.flagUrl}" alt="Bandeira de ${nextCtry.name}" loading="lazy" decoding="async">`
            : `<span>${nextCtry.flag}</span>`
        }
        <strong>${nextCtry.name}</strong>
        <i aria-hidden="true">→</i>
      </a>
    </div>`
      : "";

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
          ${
            identity.flagUrl
              ? `<img src="${identity.flagUrl}" alt="Bandeira de ${country.name}" loading="lazy" decoding="async">`
              : `<span>${country.flag}</span>`
          }
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
    <nav class="anchor-nav" aria-label="Navegação interna">
      <a href="#pais">O país</a>
      <a href="#turismo">Turismo</a>
      <a href="#cultura">Cultura</a>
      <a href="#gastronomia">Gastronomia</a>
      <a href="#historia">História</a>
      <a href="#curiosidades">Curiosidades</a>
      <a href="#futebol">Futebol</a>
      <a href="#galeria">Galeria</a>
      <a href="#roteiro">Roteiro</a>
    </nav>

    <!-- FACTS STRIP -->
    ${factsStrip}

    <!-- O PAÍS: visão geral + identidade -->
    <section class="content-section" id="pais">
      <div class="section-inner split-layout reveal">
        <div>
          <p class="section-kicker">O país</p>
          <h2>${country.overviewTitle}</h2>
          <p class="lead">${country.overview}</p>

          ${
            factsEntries.length === 0
              ? ""
              : `
          <div class="identity-facts" style="margin-top:1.5rem;">
            ${factsEntries
              .map(
                ([icon, label, value]) =>
                  `<span><b>${icon} ${label}</b>${value}</span>`
              )
              .join("")}
          </div>`
          }
        </div>
        <figure class="image-panel event-frame">
          <img src="${country.portrait}" data-web-image="${country.portraitQuery || country.heroQuery}" alt="Paisagem de ${country.name}" loading="lazy" decoding="async">
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
        <p class="lead">${country.dishes && country.dishes.length ? country.gastronomy : ""}</p>
        ${buildDishCards()}
      </div>
    </section>

    <!-- HISTÓRIA -->
    <section class="content-section" id="historia">
      <div class="section-inner split-layout reveal">
        <div class="timeline-panel cup-timeline">
          <p class="section-kicker">História</p>
          <h2>${country.historyTitle}</h2>
          <p>${country.history}</p>
        </div>
        <aside class="scoreboard-card" aria-label="Cartão do país">
          <span class="scoreboard-flag">${country.flag}</span>
          <small>${country.group} &bull; Copa 2026</small>
          <strong>${country.name}</strong>
          <p>Cultura, turismo, história e futebol numa única jornada.</p>
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
        <h2>Uma seleção de imagens para entrar no clima.</h2>
        <div class="gallery-grid">${galleryItems}</div>
      </div>
    </section>

    <!-- PRIMEIRO ROTEIRO -->
    ${roteiroSection}

    <!-- PRÓXIMA VIAGEM -->
    <section class="next-trip">
      <div>
        <strong>Continue a volta ao mundo pelos grupos da Copa.</strong>
        ${nextBlock}
        <a href="index.html#grupos">Ver todos os países</a>
      </div>
    </section>
  `;
})();
