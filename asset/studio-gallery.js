(() => {
  const galleries = document.querySelectorAll("[data-studio-gallery]");
  if (!galleries.length) return;

  galleries.forEach((gallery) => {
    const slides = Array.from(gallery.querySelectorAll(".studio-gallery-slide"));
    const prevButton = gallery.querySelector("[data-gallery-prev]");
    const nextButton = gallery.querySelector("[data-gallery-next]");
    const counter = gallery.querySelector(".studio-gallery-counter");
    if (!slides.length || !prevButton || !nextButton) return;

    let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));

    const update = () => {
      slides.forEach((slide, index) => {
        const active = index === activeIndex;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
      });

      if (counter) {
        counter.textContent = `${activeIndex + 1} / ${slides.length}`;
      }

      const singleSlide = slides.length < 2;
      prevButton.disabled = singleSlide;
      nextButton.disabled = singleSlide;
    };

    const move = (direction) => {
      activeIndex = (activeIndex + direction + slides.length) % slides.length;
      update();
    };

    prevButton.addEventListener("click", () => move(-1));
    nextButton.addEventListener("click", () => move(1));

    gallery.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }
    });

    gallery.setAttribute("tabindex", "0");
    update();
  });
})();
