(() => {
  const site = document.getElementById("site");
  const themeToggle = document.getElementById("theme-toggle");

  const savedTheme = localStorage.getItem("mc-theme");
  if (site && (savedTheme === "light" || savedTheme === "dark")) {
    site.dataset.theme = savedTheme;
  }

  themeToggle?.addEventListener("click", () => {
    const next = site.dataset.theme === "light" ? "dark" : "light";
    site.dataset.theme = next;
    localStorage.setItem("mc-theme", next);
  });
})();
