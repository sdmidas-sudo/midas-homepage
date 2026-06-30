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

  const videoModal = document.getElementById("live-short-modal");
  const video = document.getElementById("live-short-video");
  const videoTitle = document.getElementById("live-short-title");
  const videoEyebrow = document.getElementById("live-short-eyebrow");
  const videoOpenButtons = document.querySelectorAll("[data-video-open='live-short']");
  const videoCloseButtons = videoModal?.querySelectorAll("[data-video-close]");
  let activeVideoTrigger = null;

  const openVideoModal = (trigger) => {
    if (!videoModal) return;

    activeVideoTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const nextSrc = trigger?.dataset.videoSrc;
    const nextTitle = trigger?.dataset.videoTitle;
    const nextEyebrow = trigger?.dataset.videoEyebrow;
    const isMinimal = trigger?.dataset.videoMinimal === "true";
    const accessibleLabel = trigger?.dataset.videoLabel || nextTitle || "영상";

    if (video && nextSrc && !video.currentSrc.endsWith(nextSrc)) {
      video.pause();
      video.src = nextSrc;
      video.load();
    }
    videoModal.classList.toggle("video-modal-minimal", isMinimal);
    if (isMinimal) {
      videoModal.removeAttribute("aria-labelledby");
      videoModal.setAttribute("aria-label", accessibleLabel);
    } else {
      videoModal.setAttribute("aria-labelledby", "live-short-title");
      videoModal.removeAttribute("aria-label");
    }
    if (videoTitle) {
      videoTitle.textContent = nextTitle || accessibleLabel;
      videoTitle.hidden = isMinimal;
    }
    if (videoEyebrow) {
      videoEyebrow.textContent = nextEyebrow || "";
      videoEyebrow.hidden = isMinimal || !nextEyebrow;
    }

    videoModal.hidden = false;
    document.body.classList.add("video-modal-open");
    videoModal.querySelector(".video-modal-close")?.focus();
    const playPromise = video?.play();
    playPromise?.catch(() => {});
  };

  const closeVideoModal = () => {
    if (!videoModal || videoModal.hidden) return;

    video?.pause();
    if (video) {
      video.currentTime = 0;
    }
    videoModal.hidden = true;
    videoModal.classList.remove("video-modal-minimal");
    videoModal.setAttribute("aria-labelledby", "live-short-title");
    videoModal.removeAttribute("aria-label");
    document.body.classList.remove("video-modal-open");
    activeVideoTrigger?.focus();
    activeVideoTrigger = null;
  };

  videoOpenButtons.forEach((button) => {
    button.addEventListener("click", () => openVideoModal(button));
  });

  videoCloseButtons?.forEach((button) => {
    button.addEventListener("click", closeVideoModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeVideoModal();
    }
  });

  const relatedCards = document.querySelectorAll(".related-service-card");

  relatedCards.forEach((card) => {
    const cardVideo = card.querySelector("video");
    if (!cardVideo) return;

    const playCardVideo = () => {
      relatedCards.forEach((otherCard) => {
        if (otherCard !== card) {
          const otherVideo = otherCard.querySelector("video");
          otherCard.classList.remove("is-playing");
          otherVideo?.pause();
        }
      });
      card.classList.add("is-playing");
      cardVideo.currentTime = 0;
      cardVideo.play().catch(() => {});
    };

    const stopCardVideo = () => {
      card.classList.remove("is-playing");
      cardVideo.pause();
      cardVideo.currentTime = 0;
    };

    const canHover = () => window.matchMedia("(hover: hover)").matches;

    card.addEventListener("pointerenter", () => {
      if (canHover()) {
        playCardVideo();
      }
    });
    card.addEventListener("focus", playCardVideo);
    card.addEventListener("click", (event) => {
      if (!canHover() && !card.classList.contains("is-playing")) {
        event.preventDefault();
        playCardVideo();
      }
    });
    card.addEventListener("pointerleave", () => {
      if (canHover()) {
        stopCardVideo();
      }
    });
    card.addEventListener("blur", stopCardVideo);
  });
})();
