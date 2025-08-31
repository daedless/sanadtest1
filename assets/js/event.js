document.addEventListener("DOMContentLoaded", () => {
  // ===== Modal functionality =====
  const eventsModal_viewMoreBtns = document.querySelectorAll('.view-more');
  const eventsModal_modal = document.querySelector('.modal');
  const eventsModal_closeBtn = eventsModal_modal.querySelector('.close-btn');
  const eventsModal_modalSlider = eventsModal_modal.querySelector('.modal-slider');
  const eventsModal_modalTitle = eventsModal_modal.querySelector('.modal-info h3');
  const eventsModal_modalDesc = eventsModal_modal.querySelector('.modal-info p');
  const eventsModal_modalDate = eventsModal_modal.querySelector('.modal-info .date-badge');
  const eventsModal_prevBtn = eventsModal_modal.querySelector('.prev');
  const eventsModal_nextBtn = eventsModal_modal.querySelector('.next');

  let eventsModal_currentSlide = 0;

  eventsModal_viewMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.event-card');
      const images = card.dataset.images.split(',');
      eventsModal_currentSlide = 0;

      eventsModal_modalSlider.innerHTML = '';
      images.forEach((img, i) => {
        const imgEl = document.createElement('img');
        imgEl.src = img;
        if (i === 0) imgEl.classList.add('active');
        eventsModal_modalSlider.appendChild(imgEl);
      });

      eventsModal_modalTitle.textContent = card.dataset.title;
      eventsModal_modalDesc.textContent = card.dataset.description;
      eventsModal_modalDate.textContent = card.dataset.date;

      eventsModal_modal.style.display = 'flex';
    });
  });

  eventsModal_closeBtn.addEventListener('click', () => {
    eventsModal_modal.style.display = 'none';
  });

  eventsModal_prevBtn.addEventListener('click', () => eventsModal_changeSlide(-1));
  eventsModal_nextBtn.addEventListener('click', () => eventsModal_changeSlide(1));

  window.addEventListener('click', (e) => {
    if (e.target === eventsModal_modal) eventsModal_modal.style.display = 'none';
  });

  function eventsModal_changeSlide(direction) {
    const imgs = eventsModal_modalSlider.querySelectorAll('img');
    imgs[eventsModal_currentSlide].classList.remove('active');
    eventsModal_currentSlide += direction;
    if (eventsModal_currentSlide < 0) eventsModal_currentSlide = imgs.length - 1;
    if (eventsModal_currentSlide >= imgs.length) eventsModal_currentSlide = 0;
    imgs[eventsModal_currentSlide].classList.add('active');
  }

  // ===== Tabs with smooth motion =====
  const eventsTabs_buttons = document.querySelectorAll('.tabs button');
  const eventsTabs_allCards = document.querySelectorAll('.event-card');

  eventsTabs_buttons.forEach(button => {
    button.addEventListener('click', () => {
      eventsTabs_buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const tab = button.dataset.tab;

      // Fade out all cards
      eventsTabs_allCards.forEach(card => card.classList.add('hide'));

      setTimeout(() => {
        // Hide all cards completely
        eventsTabs_allCards.forEach(card => { card.style.display = 'none'; });

        // Show filtered cards
        let filtered = Array.from(eventsTabs_allCards).filter(card => card.dataset.type === tab);
        if (tab === 'upcoming') filtered = filtered.slice(0, 3);

        filtered.forEach(card => {
          card.style.display = 'flex';
          card.offsetHeight; // trigger reflow
          card.classList.remove('hide');
        });
      }, 300);
    });
  });

  // Show default tab
  document.querySelector('.tabs button.active').click();
});
