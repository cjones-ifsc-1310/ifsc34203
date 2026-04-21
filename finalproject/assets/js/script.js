const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', (e) => {
    e.stopPropagation();

    const isActive = card.classList.contains('active');

    cards.forEach(c => c.classList.remove('active'));

    if (!isActive) {
      card.classList.add('active');
    }
  });
});

document.addEventListener('click', () => {
  cards.forEach(card => card.classList.remove('active'));
});