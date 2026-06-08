(function renderWorldCupGroups() {
  const groups = window.VIAJEIO_WORLD_CUP_2026_GROUPS;
  const countries = window.VIAJEIO_COUNTRIES;
  const filters = document.querySelector(".group-filters");
  const wrap = document.querySelector(".groups-wrap");

  if (!groups || !countries || !filters || !wrap) {
    return;
  }

  filters.innerHTML = [
    '<button class="filter-chip active" type="button" data-filter="all">Todos</button>',
    ...groups.map(
      (group) =>
        `<button class="filter-chip" type="button" data-filter="${group.id}">Grupo ${group.id}</button>`
    ),
  ].join("");

  wrap.innerHTML = groups
    .map((group) => {
      const groupPalette = countries[group.countries[0]]?.identity?.palette || ["#d7b56d", "#4da3ff", "#f5f7fa"];
      const groupStyle = `--group-primary:${groupPalette[0]};--group-secondary:${groupPalette[1]};--group-accent:${groupPalette[2]};`;
      const groupFlags = group.countries
        .map((slug) => {
          const country = countries[slug];
          const identity = country?.identity || {};
          if (!country) return "";

          return `
            <span>
              ${identity.flagUrl ? `<img src="${identity.flagUrl}" alt="" loading="lazy">` : `<i>${country.flag}</i>`}
              <b>${country.name}</b>
            </span>
          `;
        })
        .join("");
      const cards = group.countries
        .map((slug, index) => {
          const country = countries[slug];
          if (!country) return "";
          const identity = country.identity || {};
          const palette = identity.palette || ["#d7b56d", "#4da3ff", "#f5f7fa"];
          const cardStyle = `--team-primary:${palette[0]};--team-secondary:${palette[1]};--team-accent:${palette[2]};`;
          const curiosity = identity.curiosity || `Descubra ${identity.signature || country.tagline}`;

          return `
            <article class="country-card identity-country-card" style="${cardStyle}" data-country-name="${country.name}" data-flag-url="${identity.flagUrl || ""}">
              <span class="card-number">${group.id}${index + 1}</span>
              <img class="country-photo" src="${country.hero}" data-web-image="${country.heroQuery}" alt="${country.name} na Copa do Mundo de 2026" loading="lazy">
              <div class="team-color-ribbon" aria-hidden="true">
                ${palette.map((color) => `<i style="--swatch:${color}"></i>`).join("")}
              </div>
              <div class="country-body">
                <div class="country-card-top">
                  <span class="flag flag-frame">
                    ${identity.flagUrl ? `<img src="${identity.flagUrl}" alt="Bandeira de ${country.name}" loading="lazy">` : ""}
                    <span>${country.flag}</span>
                  </span>
                  <small class="identity-tag">${identity.region || country.group}</small>
                </div>
                <h3>${country.name}</h3>
                <p>${country.tagline}</p>
                <div class="home-identity-line">
                  <span>${identity.symbol || "Identidade nacional"}</span>
                  <span>${identity.football || "Clima de Copa"}</span>
                </div>
                <div class="curiosity-panel">
                  <b>Por que explorar?</b>
                  <span>${curiosity}</span>
                </div>
                <a class="country-link" href="${slug}.html"><span>Explorar país</span><i aria-hidden="true"></i></a>
              </div>
            </article>
          `;
        })
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
        </section>
      `;
    })
    .join("");
})();
