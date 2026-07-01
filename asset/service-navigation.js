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
    .filter((child) => !child.classList.contains("nav-project-link"))
    .forEach((child) => {
      const clone = child.cloneNode(true);
      clone.classList.remove("nav-dropdown-only");
      clone.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
      panel.append(clone);
    });

  headerActions?.append(panel);

  const ctaIcons = {
    project: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>',
    kakao: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 4C6.48 4 2 7.52 2 11.86c0 2.72 1.76 5.12 4.43 6.53l-.86 3.04a.45.45 0 0 0 .68.5l3.72-2.45c.66.12 1.34.19 2.03.19 5.52 0 10-3.52 10-7.81S17.52 4 12 4Z"></path></svg>',
    top: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"></path><path d="m5 12 7-7 7 7"></path></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.78 19.78 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.78 19.78 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.66 2.79a2 2 0 0 1-.45 2.11L8.05 9.89a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.89.31 1.83.53 2.79.66A2 2 0 0 1 22 16.92Z"></path></svg>'
  };

  const fillCtaContent = (element, { label, icon = "project" }) => {
    const iconWrap = document.createElement("span");
    iconWrap.className = "quick-cta-icon";
    iconWrap.innerHTML = ctaIcons[icon] || ctaIcons.project;

    const labelWrap = document.createElement("span");
    labelWrap.className = "quick-cta-label";
    labelWrap.textContent = label;

    element.append(iconWrap, labelWrap);
    element.setAttribute("aria-label", label);
  };

  const createCtaLink = ({ href, label, className = "", icon }) => {
    const link = document.createElement("a");
    link.href = href;
    link.className = className;
    fillCtaContent(link, { label, icon });
    if (/^https?:\/\//.test(href)) {
      link.target = "_blank";
      link.rel = "noopener";
    }
    return link;
  };

  const createCtaButton = ({ label, className = "", icon, onClick }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    fillCtaContent(button, { label, icon });
    button.addEventListener("click", onClick);
    return button;
  };

  const quickCta = document.createElement("aside");
  quickCta.className = "global-quick-cta";
  quickCta.setAttribute("aria-label", "빠른 상담 메뉴");

  const desktopCta = document.createElement("div");
  desktopCta.className = "global-quick-cta-desktop";
  [
    { href: "midas-project.html", label: "프로젝트 문의", className: "primary", icon: "project" },
    { href: "https://pf.kakao.com/_VLnPX", label: "카카오 채널 상담", className: "kakao", icon: "kakao" }
  ].forEach((item) => desktopCta.append(createCtaLink(item)));
  desktopCta.append(
    createCtaButton({
      label: "TOP",
      className: "top",
      icon: "top",
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" })
    })
  );

  const mobileCta = document.createElement("div");
  mobileCta.className = "global-quick-cta-mobile";
  [
    { href: "tel:0226759767", label: "전화 상담", className: "phone", icon: "phone" },
    { href: "https://pf.kakao.com/_VLnPX", label: "카카오 상담", className: "kakao", icon: "kakao" },
    { href: "midas-project.html", label: "견적 문의", className: "primary", icon: "project" }
  ].forEach((item) => mobileCta.append(createCtaLink(item)));

  quickCta.append(desktopCta, mobileCta);
  document.body.append(quickCta);
  document.body.classList.add("has-global-quick-cta");

  const preferredContact = new URLSearchParams(window.location.search).get("contact");
  if (preferredContact === "kakao") {
    const kakaoOption = document.querySelector('input[name="선호 연락 방법"][value="카카오톡"]');
    if (kakaoOption) kakaoOption.checked = true;
  }

  const setPanelOpen = (open) => {
    panel.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    if (open) {
      document.body.classList.remove("service-dropdown-open");
    }
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
    }
    menuToggle?.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    menuToggle?.setAttribute("aria-expanded", String(open));
  };

  const closePanel = () => {
    setPanelOpen(false);
  };

  const setExpanded = (expanded) => {
    const showDesktopDropdown = expanded && !isMobileMenuOpen();
    serviceLink.setAttribute("aria-expanded", String(expanded));
    serviceItem.classList.toggle("is-open", expanded);
    document.body.classList.toggle("service-dropdown-open", showDesktopDropdown);
  };

  const closeServiceMenu = () => {
    serviceItem.classList.remove("mobile-open");
    setExpanded(false);
  };

  const isMobileMenuOpen = () => panel.classList.contains("is-open");

  const syncMenuState = () => {
    const open = isMobileMenuOpen();
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
    }
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
