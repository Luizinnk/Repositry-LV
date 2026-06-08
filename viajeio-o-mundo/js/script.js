/* ============================================================
   VIAJEIO O MUNDO — script.js  |  Homepage interactions
   ============================================================ */

/* ── Refs (existem antes de home-groups rodar) ────────────────── */
const header     = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav        = document.querySelector("[data-nav]");

/* ── Header scroll ────────────────────────────────────────────── */
function updateHeader() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 24);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

/* ── Menu mobile ──────────────────────────────────────────────── */
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.focus();
    }
  });
}

/* ── IntersectionObserver: .reveal ───────────────────────────── */
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);
revealElements.forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i * 40, 240)}ms`;
  revealObserver.observe(el);
});

/* ══════════════════════════════════════════════════════════════
   FILTROS  — grupo e região  (home-groups.js já rodou)
══════════════════════════════════════════════════════════════ */
(function initFilters() {
  const groupChips  = document.querySelectorAll("[data-filter]");
  const regionChips = document.querySelectorAll("[data-region]");
  const groupSections = document.querySelectorAll(".world-group");

  if (!groupChips.length && !regionChips.length) return;

  /* ── Helpers ────────────────────────────────────────────── */
  function resetGroupChips() {
    groupChips.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
  }
  function resetRegionChips() {
    regionChips.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
  }
  function showAllCards() {
    groupSections.forEach((sec) => {
      sec.classList.remove("is-hidden");
      sec.querySelectorAll(".country-card").forEach((c) => (c.style.display = ""));
    });
  }

  /* ── Filtrar por grupo Copa ─────────────────────────────── */
  groupChips.forEach((btn) => {
    btn.addEventListener("click", () => {
      resetGroupChips();
      resetRegionChips();
      showAllCards();

      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");

      const filter = btn.dataset.filter;
      groupSections.forEach((sec) => {
        const shouldShow = filter === "all" || sec.dataset.group === filter;
        sec.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  /* ── Filtrar por região / continente ────────────────────── */
  regionChips.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Toggle: re-clicar no mesmo chip desativa
      const wasActive = btn.classList.contains("active");
      resetGroupChips();
      resetRegionChips();
      showAllCards();

      if (wasActive) {
        // Volta ao "Todos"
        const todosBtn = document.querySelector('[data-filter="all"]');
        if (todosBtn) {
          todosBtn.classList.add("active");
          todosBtn.setAttribute("aria-pressed", "true");
        }
        return;
      }

      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");

      const region = btn.dataset.region;

      // "extras" = grupo "outros"
      if (region === "extras") {
        groupSections.forEach((sec) => {
          sec.classList.toggle("is-hidden", sec.dataset.group !== "outros");
        });
        return;
      }

      // Continente: mostra todas as seções mas oculta cards que não batem
      groupSections.forEach((sec) => {
        if (sec.dataset.group === "outros") {
          sec.classList.add("is-hidden");
          return;
        }
        const cards = sec.querySelectorAll(".country-card");
        let visibleInGroup = 0;
        cards.forEach((card) => {
          const match = card.dataset.continent === region;
          card.style.display = match ? "" : "none";
          if (match) visibleInGroup++;
        });
        sec.classList.toggle("is-hidden", visibleInGroup === 0);
      });
    });
  });
})();

/* ══════════════════════════════════════════════════════════════
   BUSCA POR PAÍS — com contador e botões de limpar
══════════════════════════════════════════════════════════════ */
(function initCountrySearch() {
  const input       = document.getElementById("country-search");
  const clearBtn    = document.getElementById("search-clear-btn");
  const metaEl      = document.getElementById("search-meta");
  const countEl     = document.getElementById("search-count");
  const metaClear   = document.getElementById("search-meta-clear");
  const emptyMsg    = document.getElementById("search-empty");
  const emptyClear  = document.getElementById("empty-clear-btn");

  if (!input) return;

  function normalize(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");
  }

  function clearSearch() {
    input.value = "";
    input.dispatchEvent(new Event("input"));
    input.focus();
  }

  function runSearch() {
    const q = normalize(input.value.trim());
    const allGroups = document.querySelectorAll(".world-group");
    let totalVisible = 0;

    allGroups.forEach((group) => {
      if (group.classList.contains("is-hidden")) {
        // Grupo filtrado por chip — não conta na busca
        return;
      }
      const cards = group.querySelectorAll(".country-card");
      let visibleInGroup = 0;

      cards.forEach((card) => {
        // Respeita display:none já definido pelo filtro de região
        if (card.style.display === "none" && !q) return;
        const name  = normalize(card.dataset.countryName || "");
        const match = !q || name.includes(q);
        // Se o filtro de região já ocultou, não reexibe na busca
        if (card.style.display !== "none" || match) {
          card.style.display = match ? "" : "none";
        }
        if (match) visibleInGroup++;
      });

      // Não oculta grupo inteiro se o grupo-filtro está "todos"
      const noGroupFilter = !document.querySelector(".filter-chip.active[data-filter]:not([data-filter='all'])");
      if (q) {
        group.style.display = visibleInGroup > 0 ? "" : "none";
      } else if (noGroupFilter) {
        group.style.display = "";
      }
      totalVisible += visibleInGroup;
    });

    // Atualiza estado vazio
    if (emptyMsg) emptyMsg.hidden = totalVisible > 0 || !q;

    // Atualiza clear button
    if (clearBtn) clearBtn.hidden = !q;

    // Atualiza meta (contagem)
    if (metaEl && countEl) {
      if (q) {
        metaEl.hidden = false;
        countEl.textContent = totalVisible === 0
          ? "Nenhum país encontrado"
          : totalVisible === 1
          ? "1 país encontrado"
          : `${totalVisible} países encontrados`;
      } else {
        metaEl.hidden = true;
      }
    }
  }

  input.addEventListener("input", runSearch);

  // Limpar com Esc dentro do input
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") clearSearch();
  });

  if (clearBtn)   clearBtn.addEventListener("click",   clearSearch);
  if (metaClear)  metaClear.addEventListener("click",  clearSearch);
  if (emptyClear) emptyClear.addEventListener("click", clearSearch);
})();

/* ══════════════════════════════════════════════════════════════
   CONTADOR ANIMADO — metric cards
══════════════════════════════════════════════════════════════ */
function animateCounter(el, target) {
  const duration = 1600;
  const start    = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterCards = document.querySelectorAll(".metric-card[data-target]");
if (counterCards.length) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        if (card.dataset.counted) return;
        card.dataset.counted = "true";
        const strong = card.querySelector("strong");
        if (strong) animateCounter(strong, parseInt(card.dataset.target, 10));
        counterObserver.unobserve(card);
      });
    },
    { threshold: 0.6 }
  );
  counterCards.forEach((c) => counterObserver.observe(c));
}

/* ══════════════════════════════════════════════════════════════
   WEB IMAGES — Wikimedia / Wikipedia via IntersectionObserver
══════════════════════════════════════════════════════════════ */
const WEB_IMAGE_CACHE = "viajeio:web-image:";

function readImageCache(key) {
  try { return localStorage.getItem(WEB_IMAGE_CACHE + key); } catch { return null; }
}
function writeImageCache(key, value) {
  try { localStorage.setItem(WEB_IMAGE_CACHE + key, value); } catch {}
}

async function fetchJson(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

async function resolveWebImage(query, size = 1200) {
  const norm     = query.trim().replace(/\s+/g, " ");
  const cacheKey = `${norm}:${size}`;
  const cached   = readImageCache(cacheKey);
  if (cached) return cached;

  const enc      = encodeURIComponent(norm);
  const commons  = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${enc}&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=${size}&format=json&origin=*`;
  const wiki     = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${enc}&gsrlimit=1&prop=pageimages&pithumbsize=${size}&format=json&origin=*`;

  try {
    const data  = await fetchJson(commons);
    const pages = Object.values(data.query?.pages || {});
    const img   = pages.map((p) => p.imageinfo?.[0]).find((i) => i?.thumburl || i?.url);
    if (img) {
      const url = img.thumburl || img.url;
      writeImageCache(cacheKey, url);
      return url;
    }
  } catch {}

  try {
    const data  = await fetchJson(wiki);
    const pages = Object.values(data.query?.pages || {});
    const url   = pages.map((p) => p.thumbnail?.source).find(Boolean);
    if (url) { writeImageCache(cacheKey, url); return url; }
  } catch {}

  throw new Error(`Imagem não encontrada: ${norm}`);
}

function inferCardImageQuery(img) {
  const card  = img.closest(".country-card, .info-card, .gallery-card");
  const title = card?.querySelector("h3, strong, span")?.textContent?.trim() || "";
  return img.dataset.webImage || [title, img.alt].filter(Boolean).join(" ");
}

async function hydrateImg(img) {
  const query = inferCardImageQuery(img);
  if (!query || img.dataset.webResolved === "true") return;
  img.dataset.webResolved = "true";
  try {
    img.src = await resolveWebImage(query, 1100);
  } catch (e) {
    img.dataset.webResolved = "fallback";
    console.warn("[viajeio] img:", query, e?.message);
  }
}

async function hydrateBg(el) {
  const query = el.dataset.bgQuery;
  if (!query || el.dataset.webResolved === "true") return;
  el.dataset.webResolved = "true";
  try {
    const url  = await resolveWebImage(query, 1800);
    const prop = el.classList.contains("country-hero") ? "--hero-image" : "--feature-image";
    el.style.setProperty(prop, `url("${url}")`);
  } catch (e) {
    el.dataset.webResolved = "fallback";
    console.warn("[viajeio] bg:", query, e?.message);
  }
}

function hydrateWebImages() {
  const opts = { rootMargin: "200px 0px" };

  const imgObs = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      hydrateImg(e.target);
    });
  }, opts);

  const bgObs = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      hydrateBg(e.target);
    });
  }, opts);

  document.querySelectorAll("img[data-web-image]").forEach((img) => imgObs.observe(img));
  document.querySelectorAll("[data-bg-query]").forEach((el) => bgObs.observe(el));
}

hydrateWebImages();

/* ══════════════════════════════════════════════════════════════
   COPA 2026 COUNTDOWN
══════════════════════════════════════════════════════════════ */
(function initCountdown() {
  const target    = document.getElementById("copa-countdown");
  if (!target) return;
  const copaStart = new Date("2026-06-11T19:00:00Z");
  const pad = (n) => String(n).padStart(2, "0");

  function tick() {
    const diff = copaStart - Date.now();
    if (diff <= 0) {
      target.innerHTML = '<span class="countdown-live">🏆 Copa em andamento!</span>';
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);
    const units = target.querySelectorAll(".cd-unit span");
    if (units.length === 4) {
      units[0].textContent = pad(d);
      units[1].textContent = pad(h);
      units[2].textContent = pad(m);
      units[3].textContent = pad(s);
    }
    setTimeout(tick, 1000);
  }
  tick();
})();

/* ══════════════════════════════════════════════════════════════
   TRAVEL TRANSITION — overlay ao navegar para país
══════════════════════════════════════════════════════════════ */
function createTravelTransition() {
  const el = document.createElement("div");
  el.className = "travel-transition";
  el.innerHTML = `
    <div class="travel-card" role="status" aria-live="polite">
      <span class="travel-flag"></span>
      <small>Embarcando para</small>
      <strong></strong>
      <i class="travel-loader" aria-hidden="true"></i>
    </div>`;
  document.body.appendChild(el);
  return el;
}

const travelTransition = createTravelTransition();

function titleFromHref(href) {
  return href.split("/").pop().replace(".html", "")
    .split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href$='.html']");
  if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target) return;
  const href = link.getAttribute("href");
  if (!href || href.includes("index.html")) return;

  const card      = link.closest(".country-card, .mini-country");
  const flagImage = card?.dataset.flagUrl || card?.querySelector(".flag-frame img")?.getAttribute("src") || "";
  const flag      = card?.querySelector(".flag, span")?.textContent?.trim() || "🏆";
  const name      = card?.dataset.countryName
    || card?.querySelector("h3, strong")?.textContent?.trim()
    || link.dataset.countryName
    || titleFromHref(href);

  event.preventDefault();

  const flagTarget = travelTransition.querySelector(".travel-flag");
  const computed   = card ? getComputedStyle(card) : null;
  if (computed) {
    ["--team-primary", "--team-secondary", "--team-accent"].forEach((p) => {
      travelTransition.style.setProperty(p, computed.getPropertyValue(p));
    });
  }

  flagTarget.textContent = flag;
  if (flagImage) {
    const img = document.createElement("img");
    img.src = flagImage;
    img.alt = `Bandeira de ${name}`;
    flagTarget.textContent = "";
    flagTarget.appendChild(img);
  }

  travelTransition.querySelector("strong").textContent = name;
  travelTransition.classList.add("is-active");
  window.setTimeout(() => { window.location.href = href; }, 760);
});

/* ══════════════════════════════════════════════════════════════
   ANCHOR NAV — destaque de seção ativa (páginas de país)
══════════════════════════════════════════════════════════════ */
(function initAnchorNav() {
  const anchorLinks = document.querySelectorAll(".anchor-nav a[href^='#']");
  if (!anchorLinks.length) return;
  const sectionObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anchorLinks.forEach((a) => a.classList.remove("active"));
          const active = [...anchorLinks].find((a) => a.getAttribute("href") === `#${entry.target.id}`);
          if (active) active.classList.add("active");
        }
      });
    },
    { rootMargin: "-25% 0px -65% 0px" }
  );
  document.querySelectorAll("section[id]").forEach((s) => sectionObs.observe(s));
})();
