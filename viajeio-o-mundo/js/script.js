const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const revealElements = document.querySelectorAll(".reveal");
const filterButtons = document.querySelectorAll("[data-filter]");
const groups = document.querySelectorAll("[data-group]");

function updateHeader() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 24);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -60px 0px" }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 40, 240)}ms`;
  observer.observe(element);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    groups.forEach((group) => {
      const shouldShow = filter === "all" || group.dataset.group === filter;
      group.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const WEB_IMAGE_CACHE = "viajeio:web-image:";

function readImageCache(key) {
  try {
    return localStorage.getItem(WEB_IMAGE_CACHE + key);
  } catch {
    return null;
  }
}

function writeImageCache(key, value) {
  try {
    localStorage.setItem(WEB_IMAGE_CACHE + key, value);
  } catch {
    // A pagina continua funcionando mesmo quando o navegador bloqueia storage local.
  }
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Image source failed: ${response.status}`);
  }
  return response.json();
}

async function resolveWebImage(query, size = 1200) {
  const normalized = query.trim().replace(/\s+/g, " ");
  const cacheKey = `${normalized}:${size}`;
  const cached = readImageCache(cacheKey);

  if (cached) {
    return cached;
  }

  const encoded = encodeURIComponent(normalized);
  const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encoded}&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=${size}&format=json&origin=*`;
  const wikipediaUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encoded}&gsrlimit=1&prop=pageimages&pithumbsize=${size}&format=json&origin=*`;

  try {
    const commons = await fetchJson(commonsUrl);
    const commonsPages = Object.values(commons.query?.pages || {});
    const commonsImage = commonsPages
      .map((page) => page.imageinfo?.[0])
      .find((image) => image?.thumburl || image?.url);

    if (commonsImage) {
      const imageUrl = commonsImage.thumburl || commonsImage.url;
      writeImageCache(cacheKey, imageUrl);
      return imageUrl;
    }
  } catch {
    // Fallback abaixo: Wikipedia page images.
  }

  const wikipedia = await fetchJson(wikipediaUrl);
  const wikipediaPages = Object.values(wikipedia.query?.pages || {});
  const wikipediaImage = wikipediaPages
    .map((page) => page.thumbnail?.source)
    .find(Boolean);

  if (!wikipediaImage) {
    throw new Error(`No image found for ${normalized}`);
  }

  writeImageCache(cacheKey, wikipediaImage);
  return wikipediaImage;
}

function inferCardImageQuery(img) {
  const card = img.closest(".country-card, .info-card, .gallery-card");
  const title = card?.querySelector("h3, strong, span")?.textContent?.trim() || "";
  return img.dataset.webImage || [title, img.alt].filter(Boolean).join(" ");
}

function hydrateWebImages() {
  const imageTargets = document.querySelectorAll("img[data-web-image]");
  const backgroundTargets = document.querySelectorAll("[data-bg-query]");

  imageTargets.forEach(async (img) => {
    const query = inferCardImageQuery(img);
    if (!query || img.dataset.webResolved === "true") return;

    img.dataset.webResolved = "true";

    try {
      img.src = await resolveWebImage(query, 1100);
    } catch {
      img.dataset.webResolved = "fallback";
    }
  });

  backgroundTargets.forEach(async (element) => {
    const query = element.dataset.bgQuery;
    if (!query || element.dataset.webResolved === "true") return;

    element.dataset.webResolved = "true";

    try {
      const image = await resolveWebImage(query, 1800);
      const property = element.classList.contains("country-hero")
        ? "--hero-image"
        : "--feature-image";
      element.style.setProperty(property, `url("${image}")`);
    } catch {
      element.dataset.webResolved = "fallback";
    }
  });
}

hydrateWebImages();

function titleFromHref(href) {
  const file = href.split("/").pop().replace(".html", "");
  return file
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function createTravelTransition() {
  const transition = document.createElement("div");
  transition.className = "travel-transition";
  transition.innerHTML = `
    <div class="travel-card" role="status" aria-live="polite">
      <span class="travel-flag"></span>
      <small>Embarcando para</small>
      <strong></strong>
      <i class="travel-loader" aria-hidden="true"></i>
    </div>
  `;
  document.body.appendChild(transition);
  return transition;
}

const travelTransition = createTravelTransition();

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href$='.html']");
  if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target) {
    return;
  }

  const href = link.getAttribute("href");
  if (!href || href.includes("index.html")) {
    return;
  }

  const card = link.closest(".country-card, .mini-country");
  const flagImage =
    card?.dataset.flagUrl ||
    card?.querySelector(".flag-frame img")?.getAttribute("src") ||
    "";
  const flag = card?.querySelector(".flag, span")?.textContent?.trim() || "🏆";
  const name =
    card?.dataset.countryName ||
    card?.querySelector("h3, strong")?.textContent?.trim() ||
    link.dataset.countryName ||
    titleFromHref(href);

  event.preventDefault();

  const flagTarget = travelTransition.querySelector(".travel-flag");
  const computed = card ? getComputedStyle(card) : null;

  if (computed) {
    travelTransition.style.setProperty("--team-primary", computed.getPropertyValue("--team-primary"));
    travelTransition.style.setProperty("--team-secondary", computed.getPropertyValue("--team-secondary"));
    travelTransition.style.setProperty("--team-accent", computed.getPropertyValue("--team-accent"));
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

  window.setTimeout(() => {
    window.location.href = href;
  }, 760);
});
