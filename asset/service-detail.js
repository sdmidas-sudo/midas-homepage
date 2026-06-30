(() => {
  const site = document.getElementById("site");
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");

  const savedTheme = localStorage.getItem("mc-theme");
  if (site && (savedTheme === "light" || savedTheme === "dark")) {
    site.dataset.theme = savedTheme;
  }

  themeToggle?.addEventListener("click", () => {
    const next = site.dataset.theme === "light" ? "dark" : "light";
    site.dataset.theme = next;
    localStorage.setItem("mc-theme", next);
  });

  const closeMenu = () => {
    if (!nav || !menuToggle) return;
    nav.classList.remove("open");
    document.body.classList.remove("nav-open");
    menuToggle.setAttribute("aria-label", "메뉴 열기");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    document.body.classList.toggle("nav-open", open);
    menuToggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  nav?.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("pointerdown", (event) => {
    if (!nav?.classList.contains("open")) return;
    if (event.target.closest("#site-nav, #menu-toggle")) return;
    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
})();
