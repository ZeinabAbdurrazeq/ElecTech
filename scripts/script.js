// Scroll-triggered fade-up animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

// Trigger hero animations on load
window.addEventListener("load", () => {
  const heroEls = document.querySelectorAll(".hero-content .fade-up");
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), 200 + i * 200);
  });
});

// Navbar scroll behavior
const navbar = document.getElementById("navbar");
let lastScrollY = 0;

function handleScroll() {
  const scrollY = window.scrollY;

  if (scrollY > 100) {
    navbar.classList.remove("floating");
    navbar.classList.add("pinned");
  } else {
    navbar.classList.remove("pinned");
    navbar.classList.add("floating");
  }

  lastScrollY = scrollY;
}

// Use passive listener for better performance
window.addEventListener("scroll", handleScroll, { passive: true });

// Mobile menu toggle
const mobileToggle = document.getElementById("mobileToggle");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");
const closeIcon = document.getElementById("closeIcon");
let isMenuOpen = false;

mobileToggle.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    mobileMenu.classList.add("open");
    menuIcon.style.display = "none";
    closeIcon.style.display = "block";
  } else {
    mobileMenu.classList.remove("open");
    menuIcon.style.display = "block";
    closeIcon.style.display = "none";
  }
});

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll(".mobile-link");
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    isMenuOpen = false;
    mobileMenu.classList.remove("open");
    menuIcon.style.display = "block";
    closeIcon.style.display = "none";
  });
});
// Scroll to top button
document.getElementById("scrollTopBtn").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Scroll to  button
document.querySelector(".scroll-btn").addEventListener("click", function () {
  document.querySelector("#about").scrollIntoView({
    behavior: "smooth",
  });
});
const directors = [
  {
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    name: "Lord Philip Hammond",
    role: "Chairman & Non-Exec. Director",
    bio: [
      "Lord Philip Hammond is Chairman of the Board of Innovo. He has had a distinguished career in British politics as a Member of Parliament from 1997 to 2019.",
      "He served as Chancellor of the Exchequer from 2016 to 2019 and held several other senior cabinet posts. Philip focused on long-term productivity challenges and championed the fintech sector.",
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    name: "Dame Sarah Collins",
    role: "Non-Executive Board Director",
    bio: [
      "Dame Sarah Collins has over 30 years of experience in the energy and infrastructure sectors. She served as CEO of a leading UK engineering firm.",
      "Sarah is a Fellow of the Royal Academy of Engineering and an expert in renewable energy and sustainable development solutions.",
    ],
  },
];

const container = document.getElementById("directors-container");

directors.forEach((d, index) => {
  const article = document.createElement("article");
  article.className = "director container visible";

  article.innerHTML = `
                <div class="director-img-wrapper">
                    <img src="${d.image}" class="director-img" alt="${d.name}">
                </div>
                <div class="director-info">
                    <span class="director-role">${d.role}</span>
                    <h2 class="director-name">${d.name}</h2>
                    <div class="bio-text">
                        ${d.bio.map((p) => `<p>${p}</p>`).join("")}
                    </div>
                </div>
            `;
  container.appendChild(article);
});
// Animate contact form elements
const cueObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-inview");
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll("[data-cues] > *, [data-cue]")
  .forEach((el) => cueObserver.observe(el));

// scroll problem
document.querySelectorAll("*").forEach((el) => {
  if (el.offsetWidth > document.documentElement.offsetWidth) {
    console.log(el);
  }
});
