(() => {
  const nav = document.getElementById("site-nav");
  const menuToggle = document.getElementById("menu-toggle");
  const serviceItem = nav?.querySelector(".nav-service");
  const serviceLink = serviceItem?.querySelector(".nav-service-link");
  const headerActions = menuToggle?.closest(".header-actions");
  const hoverQuery = window.matchMedia
    ? window.matchMedia("(hover: hover) and (pointer: fine)")
    : { matches: true };

  if (!nav || !serviceItem || !serviceLink) return;

  const panel = document.createElement("div");
  panel.className = "header-dropdown-panel";
  panel.id = "header-dropdown-panel";
  panel.setAttribute("aria-label", "드롭다운 메뉴");

  Array.from(nav.children)
    .filter((child) => child.classList.contains("nav-dropdown-only"))
    .forEach((child) => {
      const clone = child.cloneNode(true);
      clone.classList.remove("nav-dropdown-only");
      clone.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
      panel.append(clone);
    });

  headerActions?.append(panel);

  const setPanelOpen = (open) => {
    panel.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    menuToggle?.setAttribute("aria-expanded", String(open));
  };

  const closePanel = () => {
    setPanelOpen(false);
  };

  const setExpanded = (expanded) => {
    serviceLink.setAttribute("aria-expanded", String(expanded));
    serviceItem.classList.toggle("is-open", expanded);
  };

  const closeServiceMenu = () => {
    serviceItem.classList.remove("mobile-open");
    setExpanded(false);
  };

  const isMobileMenuOpen = () => panel.classList.contains("is-open");

  const syncMenuState = () => {
    const open = isMobileMenuOpen();
    nav.classList.remove("open");
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
    menuToggle.setAttribute("aria-controls", panel.id);
    menuToggle.setAttribute("aria-expanded", String(panel.classList.contains("is-open")));

    menuToggle.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        setPanelOpen(!panel.classList.contains("is-open"));
      },
      true
    );
  }

  panel.addEventListener("click", (event) => {
    if (event.target.closest("a")) closePanel();
  });

  document.addEventListener("pointerdown", (event) => {
    if (!panel.classList.contains("is-open")) return;
    if (event.target.closest("#header-dropdown-panel, #menu-toggle")) return;
    closePanel();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closePanel();
  });

  new MutationObserver(syncMenuState).observe(nav, {
    attributes: true,
    attributeFilter: ["class"]
  });

  syncMenuState();
})();
