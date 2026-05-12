document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE MENU
  ========================== */
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const overlay = document.querySelector(".overlay");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
      overlay.classList.toggle("active");

      const isOpen = nav.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", isOpen);
    });

    overlay?.addEventListener("click", () => {
      nav.classList.remove("active");
      overlay.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });

    document.querySelectorAll(".nav a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        overlay.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

/* =========================
   ACCORDION
========================= */
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("click", () => {

    const grid = card.closest(".card-grid");
    if (!grid) return;

    const isPositions = grid.closest("#positions");

    const isOpen = card.classList.contains("active");

    // close others in same grid
    grid.querySelectorAll(".card").forEach(c => {
      if (c !== card) {
        c.classList.remove("active");
        c.setAttribute("aria-expanded", "false");
      }
    });

    // toggle clicked
    card.classList.toggle("active", !isOpen);
    card.setAttribute("aria-expanded", String(!isOpen));

    // ONLY remove scroll for positions
    if (!isPositions && !isOpen) {
      setTimeout(() => {
        card.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 150);
    }
  });
});

  /* =========================
     LIGHTBOX
  ========================== */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox?.querySelector("img");
  const closeBtn = document.getElementById("lightbox-close");

  function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add("active");
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove("active");
    lightboxImg.src = "";
  }

  document.querySelectorAll("#home .card-img-home").forEach(img => {
    img.addEventListener("click", (e) => {
      e.stopPropagation();
      openLightbox(img.src);
    });
  });

  closeBtn?.addEventListener("click", closeLightbox);

  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  /* =========================
   SLIDESHOWS
========================= */
const slideshows = document.querySelectorAll(".slideshow");

slideshows.forEach(slideshow => {
  const slides = slideshow.querySelectorAll(".slide");
  let index = 0;

  setInterval(() => {
    if (!slides.length) return;

    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");

  }, 3000);
});


/* =========================
   BACK TO TOP
========================= */
const backToTopBtn = document.querySelector(".back-to-top");

backToTopBtn?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
  });

