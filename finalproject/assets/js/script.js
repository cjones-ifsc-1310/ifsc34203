document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE MENU
  ========================== */
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");

      const isOpen = nav.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", isOpen);
    });

    document.querySelectorAll(".nav a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }



  /* =========================
     ACCORDION (ONE OPEN AT A TIME PER SECTION)
  ========================== */
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {

      // ignore links (important for lightbox safety)
      if (e.target.tagName === "A" || e.target.closest("a")) return;

      const section = card.closest(".section");
      const sectionCards = section ? section.querySelectorAll(".card") : [];

      const isOpen = card.classList.contains("active");

      // close all in section
      sectionCards.forEach(c => {
        c.classList.remove("active");
        c.setAttribute("aria-expanded", "false");
      });

      // reopen clicked card if it wasn't already open
      if (!isOpen) {
        card.classList.add("active");
        card.setAttribute("aria-expanded", "true");
      }
    });
  });


  /* =========================
     LIGHTBOX (HOME ONLY)
  ========================== */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox ? lightbox.querySelector("img") : null;
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

  document.querySelectorAll("#home .card-img").forEach(img => {
    img.addEventListener("click", (e) => {
      e.stopPropagation();
      openLightbox(img.src);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

});