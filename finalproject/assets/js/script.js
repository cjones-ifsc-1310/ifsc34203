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

  // close when clicking overlay
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
     ACCORDION (ONE OPEN AT A TIME PER SECTION)
  ========================== */
 const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("click", () => {

    // Find the parent grid (keeps behavior scoped per section)
    const grid = card.closest(".card-grid");

    // Close all other cards in THIS grid
    grid.querySelectorAll(".card").forEach(c => {
      if (c !== card) {
        c.classList.remove("active");
        c.setAttribute("aria-expanded", "false");
      }
    });

    // Toggle clicked card
    const isOpen = card.classList.contains("active");

    card.classList.toggle("active");
    card.setAttribute("aria-expanded", isOpen ? "false" : "true");
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
