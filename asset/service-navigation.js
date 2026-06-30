(() => {
  const nav = document.getElementById("site-nav");
  const menuToggle = document.getElementById("menu-toggle");
  const serviceItem = nav?.querySelector(".nav-service");
  const serviceLink = serviceItem?.querySelector(".nav-service-link");
  const hoverQuery = window.matchMedia
    ? window.matchMedia("(hover: hover) and (pointer: fine)")
    : { matches: true };

  if (!nav || !serviceItem || !serviceLink) return;

  const setExpanded = (expanded) => {
    serviceLink.setAttribute("aria-expanded", String(expanded));
    serviceItem.classList.toggle("is-open", expanded);
  };

  const closeServiceMenu = () => {
    serviceItem.classList.remove("mobile-open");
    setExpanded(false);
  };

  const isMobileMenuOpen = () => nav.classList.contains("open");

  const syncMenuState = () => {
    const open = isMobileMenuOpen();
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", String(open));
    }
    if (!open) {
      serviceItem.classList.remove("mobile-open");
      if (!serviceItem.matches(":hover") && !serviceItem.contains(document.activeElement)) {
        setExpanded(false);
      }
    }
  };

  serviceItem.addEventListener("mouseenter", () => {
    if (hoverQuery.matches && !isMobileMenuOpen()) setExpanded(true);
  });

  serviceItem.addEventListener("mouseleave", () => {
    if (hoverQuery.matches && !isMobileMenuOpen()) setExpanded(false);
  });

  serviceItem.addEventListener("focusin", () => {
    if (!isMobileMenuOpen()) setExpanded(true);
  });

  serviceLink.addEventListener("focus", () => {
    if (!isMobileMenuOpen()) setExpanded(true);
  });

  serviceItem.addEventListener("focusout", (event) => {
    if (!serviceItem.contains(event.relatedTarget) && !isMobileMenuOpen()) {
      setExpanded(false);
    }
  });

  serviceLink.addEventListener("click", (event) => {
    if (!isMobileMenuOpen()) return;
    event.preventDefault();
    event.stopPropagation();
    const open = !serviceItem.classList.contains("mobile-open");
    serviceItem.classList.toggle("mobile-open", open);
    setExpanded(open);
  });

  serviceItem.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    event.stopPropagation();
    closeServiceMenu();
    if (isMobileMenuOpen()) {
      serviceLink.focus();
    } else {
      serviceLink.blur();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeServiceMenu();
    if (!isMobileMenuOpen() && serviceItem.contains(document.activeElement)) {
      document.activeElement.blur();
    }
  });

  if (menuToggle) {
    menuToggle.setAttribute("aria-haspopup", "true");
    menuToggle.setAttribute("aria-controls", nav.id);
    menuToggle.setAttribute("aria-expanded", String(nav.classList.contains("open")));
  }

  new MutationObserver(syncMenuState).observe(nav, {
    attributes: true,
    attributeFilter: ["class"]
  });

  syncMenuState();
})();
