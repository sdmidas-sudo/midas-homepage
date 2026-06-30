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
  const videoOpenButtons = document.querySelectorAll("[data-video-open='live-short']");
  const videoCloseButtons = videoModal?.querySelectorAll("[data-video-close]");
  let activeVideoTrigger = null;

  const openVideoModal = () => {
    if (!videoModal) return;

    activeVideoTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
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
    document.body.classList.remove("video-modal-open");
    activeVideoTrigger?.focus();
    activeVideoTrigger = null;
  };

  videoOpenButtons.forEach((button) => {
    button.addEventListener("click", openVideoModal);
  });

  videoCloseButtons?.forEach((button) => {
    button.addEventListener("click", closeVideoModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeVideoModal();
    }
  });
})();
