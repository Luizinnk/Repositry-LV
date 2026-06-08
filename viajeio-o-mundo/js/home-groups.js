(function renderWorldCupGroups() {
  const groups   = window.VIAJEIO_WORLD_CUP_2026_GROUPS;
  const countries = window.VIAJEIO_COUNTRIES;
  const filters   = document.querySelector(".group-filters");
  const regionFiltersEl = document.querySelector(".region-filters");
  const wrap      = document.querySelector(".groups-wrap");

  if (!groups || !countries || !filters || !wrap) return;

  /* ── Mapa de continente por slug ──────────────────────────── */
  const CONTINENT_MAP = {
    // América do Norte / Sede
    "estados-unidos": "sede", "canada": "sede", "mexico": "sede",

    // América do Sul
    "brasil": "america-sul", "argentina": "america-sul",
    "colombia": "america-sul", "ecuador": "america-sul",
    "venezuela": "america-sul", "chile": "america-sul",
    "peru": "america-sul", "bolivia": "america-sul",
    "paraguai": "america-sul", "uruguai": "america-sul",

    // América Central / Caribe
    "panama": "america-central", "costa-rica": "america-central",
    "jamaica": "america-central",

    // Europa
    "franca": "europa", "alemanha": "europa", "espanha": "europa",
    "portugal": "europa", "holanda": "europa", "belgica": "europa",
    "italia": "europa", "croacia": "europa", "austria": "europa",
    "suica": "europa", "escocia": "europa", "noruega": "europa",
    "dinamarca": "europa", "servia": "europa", "albania": "europa",
    "polonia": "europa", "eslovenia": "europa", "hungria": "europa",
    "turquia": "europa",

    // África
    "marrocos": "africa", "nigeria": "africa", "camaroes": "africa",
    "senegal": "africa", "africa-do-sul": "africa", "rd-congo": "africa",
    "cabo-verde": "africa", "argelia": "africa", "tanzania": "africa",

    // Ásia / Médio Oriente
    "japao": "asia", "coreia-do-sul": "asia", "australia": "asia",
    "arabia-saudita": "asia", "ira": "asia", "irak": "asia",
    "iraque": "asia", "jordania": "asia", "uzbequistao": "asia",
    "china": "asia", "nova-zelandia": "asia",
  };

  function getContinent(slug) {
    const explicit = CONTINENT_MAP[slug];
    if (explicit) return explicit;
    // Fallback por identidade
    const region = (countries[slug]?.identity?.region || "").toLowerCase();
    if (region.includes("europa") || region.includes("europe")) return "europa";
    if (region.includes("africa") || region.includes("áfrica")) return "africa";
    if (region.includes("ásia")   || region.includes("asia"))   return "asia";
    if (region.includes("sul")    || region.includes("south"))  return "america-sul";
    if (region.includes("norte")  || region.includes("north"))  return "america-central";
    return "outros";
  }

  /* ── Rótulos amigáveis de continente ──────────────────────── */
  const CONTINENT_LABELS = {
    "sede":           "🏟️ Países-sede",
    "europa":         "🌍 Europa",
    "america-sul":    "🌎 América do Sul",
    "america-central":"🌎 América Central",
    "africa":         "🌍 África",
    "asia":           "🌏 Ásia / Oceania",
    "outros":         "🌐 Outros",
  };

  /* ── Renderizar card de país ──────────────────────────────── */
  function buildCard(slug, groupId, index) {
    const country  = countries[slug];
    if (!country) return "";
    const identity  = country.identity || {};
    const palette   = identity.palette || ["#d7b56d", "#4da3ff", "#f5f7fa"];
    const cardStyle = `--team-primary:${palette[0]};--team-secondary:${palette[1]};--team-accent:${palette[2]};`;
    const continent = getContinent(slug);
    const numPrefix = groupId ? `${groupId}${index + 1}` : "";

    return `
      <article class="country-card identity-country-card"
               style="${cardStyle}"
               data-country-name="${country.name}"
               data-flag-url="${identity.flagUrl || ""}"
               data-continent="${continent}"
               ${numPrefix ? `data-card-num="${numPrefix}"` : ""}>
        <img class="country-photo img-loading"
             src="${country.hero}"
             data-web-image="${country.heroQuery}"
             alt="${country.name} — Copa do Mundo 2026"
             loading="lazy"
             decoding="async"
             width="480" height="640"
             onload="this.classList.remove('img-loading')"
             onerror="this.classList.remove('img-loading')">
        <div class="country-body">
          <div class="country-card-top">
            <span class="flag flag-frame">
              ${identity.flagUrl
                ? `<img src="${identity.flagUrl}" alt="Bandeira de ${country.name}" loading="lazy" decoding="async" width="44" height="30">`
                : ""}
              <span>${country.flag}</span>
            </span>
            <small class="identity-tag">${identity.region || country.group}</small>
          </div>
          <h3>${country.name}</h3>
          <p>${country.tagline}</p>
          <div class="home-identity-line">
            <span>${identity.symbol   || "Identidade nacional"}</span>
            <span>${identity.football || "Clima de Copa"}</span>
          </div>
          <a class="country-link" href="${slug}.html">
            <span>Explorar país</span><i aria-hidden="true"></i>
          </a>
        </div>
      </article>
    `;
  }

  /* ── Chips de grupo ───────────────────────────────────────── */
  filters.innerHTML = [
    '<button class="filter-chip active" type="button" data-filter="all" aria-pressed="true">Todos</button>',
    ...groups.map(
      (g) => `<button class="filter-chip" type="button" data-filter="${g.id}" aria-pressed="false">Grupo ${g.id}</button>`
    ),
    '<button class="filter-chip" type="button" data-filter="outros" aria-pressed="false">Outros Destinos</button>',
  ].join("");

  /* ── Chips de região ──────────────────────────────────────── */
  const continentOrder = ["sede", "europa", "america-sul", "america-central", "africa", "asia"];
  if (regionFiltersEl) {
    regionFiltersEl.innerHTML = continentOrder
      .map((key) => {
        const extra = key === "sede" ? " region-chip--sede" : "";
        return `<button class="region-chip${extra}" type="button" data-region="${key}" aria-pressed="false">${CONTINENT_LABELS[key]}</button>`;
      })
      .join("") +
      `<button class="region-chip region-chip--extras" type="button" data-region="extras" aria-pressed="false">🌐 Fora da Copa</button>`;
  }

  /* ── HTML dos 12 grupos Copa ──────────────────────────────── */
  wrap.innerHTML = groups
    .map((group) => {
      const groupPalette = countries[group.countries[0]]?.identity?.palette || ["#d7b56d", "#4da3ff", "#f5f7fa"];
      const groupStyle   = `--group-primary:${groupPalette[0]};--group-secondary:${groupPalette[1]};--group-accent:${groupPalette[2]};`;

      const groupFlags = group.countries
        .map((slug) => {
          const country  = countries[slug];
          const identity = country?.identity || {};
          if (!country) return "";
          return `
            <span>
              ${identity.flagUrl ? `<img src="${identity.flagUrl}" alt="" loading="lazy" width="18" height="12">` : `<i>${country.flag}</i>`}
              <b>${country.name}</b>
            </span>`;
        })
        .join("");

      const cards = group.countries
        .map((slug, idx) => buildCard(slug, group.id, idx))
        .join("");

      return `
        <section class="world-group reveal" data-group="${group.id}" style="${groupStyle}">
          <div class="group-title">
            <div>
              <small class="group-kicker">Fase de grupos</small>
              <span>Grupo ${group.id}</span>
            </div>
            <p>${group.description}</p>
          </div>
          <div class="group-team-strip" aria-label="Seleções do Grupo ${group.id}">
            ${groupFlags}
          </div>
          <div class="country-grid">${cards}</div>
        </section>`;
    })
    .join("");

  /* ── Outros Destinos (fora da Copa 2026) ─────────────────── */
  const extraSlugs = ["italia", "dinamarca", "servia", "chile", "camaroes", "polonia", "costa-rica"];
  const extraCards = extraSlugs
    .map((slug) => buildCard(slug, null, 0))
    .filter(Boolean)
    .join("");

  if (extraCards) {
    wrap.insertAdjacentHTML("beforeend", `
      <section class="world-group reveal" data-group="outros"
               style="--group-primary:#6b7280;--group-secondary:#f5f7fa;--group-accent:#d7b56d;">
        <div class="group-title">
          <div>
            <small class="group-kicker">Explore também</small>
            <span>Outros Destinos <span class="outros-note" aria-label="Fora da Copa 2026">Fora da Copa</span></span>
          </div>
          <p>Países com página completa no atlas — cultura, turismo, gastronomia e futebol.</p>
        </div>
        <div class="country-grid">${extraCards}</div>
      </section>
    `);
  }
})();
