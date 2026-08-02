(function () {
  "use strict";

  var animationsEnabled = document.body.dataset.animations === "true";

  /* ---------- Fade-in on scroll ---------- */
  function initFadeIn() {
    if (!animationsEnabled) {
      var els = document.querySelectorAll(".fade");
      for (var i = 0; i < els.length; i += 1) {
        els[i].classList.add("is-visible");
      }
      return;
    }
    if (!("IntersectionObserver" in window)) {
      var els = document.querySelectorAll(".fade");
      for (var i = 0; i < els.length; i += 1) {
        els[i].classList.add("is-visible");
      }
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    var targets = document.querySelectorAll(".fade");
    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Lead form (alert-based, no backend needed) ---------- */
  function initLeadForm() {
    var form = document.getElementById("lead-form");
    if (!form) {
      return;
    }
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var nameInput = document.getElementById("lead-name");
      var name = nameInput ? nameInput.value.trim() : "";
      var message = "Спасибо" + (name ? ", " + name : "") + "! Ваша заявка принята, мы свяжемся с вами в ближайшее время.";
      alert(message);
      form.reset();
      if (nameInput) {
        nameInput.focus();
      }
    });
  }

  /* ---------- Mobile menu toggle ---------- */
  function initMobileMenu() {
    var menuToggle = document.querySelector(".menu-toggle");
    var navList = document.querySelector(".nav__list");
    var navClose = document.getElementById("nav-close");

    if (!menuToggle || !navList) {
      return;
    }

    menuToggle.addEventListener("click", function () {
      navList.classList.add("active");
    });

    function closeMenu() {
      navList.classList.remove("active");
    }

    if (navClose) {
      navClose.addEventListener("click", closeMenu);
    }

    /* Close on link click */
    var navLinks = navList.querySelectorAll(".nav__link");
    navLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    /* Close on Escape */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navList.classList.contains("active")) {
        closeMenu();
      }
    });
  }

  /* ---------- Modal ---------- */
  function initModal() {
    var triggers = document.querySelectorAll("[data-modal-trigger]");
    var closeButtons = document.querySelectorAll("[data-modal-close]");

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        var modalName = this.getAttribute("data-modal-trigger");
        var modal = document.querySelector('[data-modal="' + modalName + '"]');
        if (modal) {
          modal.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      });
    });

    closeButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var modalName = this.getAttribute("data-modal-close");
        var modal = document.querySelector('[data-modal="' + modalName + '"]');
        if (modal) {
          modal.classList.remove("active");
          document.body.style.overflow = "";
        }
      });
    });

    /* Close modal on outside click */
    var overlays = document.querySelectorAll(".modal-overlay");
    overlays.forEach(function (overlay) {
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
          overlay.classList.remove("active");
          document.body.style.overflow = "";
        }
      });
    });
  }

  function init() {
    initFadeIn();
    initLeadForm();
    initMobileMenu();
    initModal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
