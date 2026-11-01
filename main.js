/* =============================================================
   Ahmad — Portfolio · interactions
   Vanilla JS. No dependencies.
   ============================================================= */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var root = document.documentElement;
  var body = document.body;

  /* ---------- Theme (default: dark) ---------- */
  var themeToggle = document.getElementById("themeToggle");
  var THEME_KEY = "portfolio-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
    // keep the browser chrome color in sync
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#161513" : "#FAF8F4");
  }

  function storedTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }

  var initial = storedTheme() || "dark";
  applyTheme(initial);

  themeToggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* private mode */ }
  });

  /* ---------- Header state ---------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */
  var menuBtn = document.getElementById("menuBtn");
  var panel = document.getElementById("mobilePanel");

  function setMenu(open) {
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    panel.hidden = !open;
    body.classList.toggle("lock", open);
  }

  menuBtn.addEventListener("click", function () {
    setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
  });

  panel.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      menuBtn.focus();
    }
  });

  /* ---------- Scroll-spy (active nav link) ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  function highlight(hash) {
    navLinks.forEach(function (link) {
      link.setAttribute("aria-current", link.getAttribute("href") === hash ? "true" : "false");
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var activeId = null;
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            activeId = "#" + entry.target.id;
            highlight(activeId);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var revealer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            el.classList.add("in");
            revealer.unobserve(el);
            // let the stage-in finish, then drop the attribute so hover
            // transforms (cards, tiles) aren't locked by the reveal rules
            var delay = parseFloat(getComputedStyle(el).getPropertyValue("--d")) || 0;
            setTimeout(function () { el.removeAttribute("data-reveal"); }, (delay + 0.75) * 1000);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach(function (el) { revealer.observe(el); });
  }

  /* ---------- Contact form → mailto ---------- */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "";

      var name = form.elements["name"];
      var email = form.elements["email"];
      var message = form.elements["message"];

      var invalid = false;
      [name, email, message].forEach(function (f) {
        var bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
        f.setAttribute("aria-invalid", bad ? "true" : "false");
        if (bad) invalid = true;
      });
      if (invalid) {
        status.textContent = "Please fill in all fields with a valid email address.";
        return;
      }

      var to = "ahmedelmarghany01@gmail.com";
      var subject = encodeURIComponent("Portfolio inquiry from " + name.value.trim());
      var bodyText =
        message.value.trim() + "\n\n— " + name.value.trim() + " (" + email.value.trim() + ")";
      window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + encodeURIComponent(bodyText);

      status.textContent = "Opening your email client…";
      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
