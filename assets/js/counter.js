(() => {
  const statsCounters = document.querySelectorAll('.statistics-section .count');
  const statsSlowSpeed = 4000;   // much slower speed for first two counters
  const statsFastSpeed = 200;    // faster speed for last two counters
  const statsSlowDelay = 100;    // longer delay for slow counters
  const statsFastDelay = 20;     // shorter delay for fast counters

  const statsStartCount = (counter, speed, delay) => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText.replace(/,/g, '');
      const increment = Math.ceil(target / speed);

      if (count < target) {
        counter.innerText = count + increment;
        setTimeout(updateCount, delay);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    updateCount();
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const index = Array.from(statsCounters).indexOf(counter);

        if (index < 2) {
          // First two counters: slower
          statsStartCount(counter, statsSlowSpeed, statsSlowDelay);
        } else {
          // Last two counters: faster
          statsStartCount(counter, statsFastSpeed, statsFastDelay);
        }
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  statsCounters.forEach(counter => {
    statsObserver.observe(counter);
  });
})();
