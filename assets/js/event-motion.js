document.addEventListener("DOMContentLoaded", function() {
  // Separate selectors
  const flowers = document.querySelectorAll(".flower-icon");
  const movingElements = document.querySelectorAll(
    ".events-section-unique p, .events-heart-unique, .events-bee-unique"
  );

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
           rect.bottom >= 0;
  }

  function checkVisibility() {
    flowers.forEach(el => {
      if (isInViewport(el)) el.classList.add("visible");
    });

    movingElements.forEach(el => {
      if (isInViewport(el)) el.classList.add("visible");
    });
  }

  window.addEventListener("scroll", checkVisibility);
  window.addEventListener("resize", checkVisibility);

  // Initial check
  checkVisibility();
});
