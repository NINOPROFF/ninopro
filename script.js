document.addEventListener('DOMContentLoaded', () => {
  // 1. Copiar URL al portapapeles
  const copyButtons = document.querySelectorAll('.btn-copy');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-url');
      if (url) {
        navigator.clipboard.writeText(url).then(() => {
          const originalText = btn.textContent;
          btn.textContent = '¡Copiado! ✓';
          btn.style.borderColor = 'var(--accent-cyan)';
          btn.style.color = 'var(--accent-cyan)';

          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.borderColor = 'var(--border-color)';
            btn.style.color = 'var(--text-main)';
          }, 2000);
        });
      }
    });
  });

  // 2. Buscador en tiempo real
  const searchInput = document.getElementById('searchInput');
  const cards = document.querySelectorAll('.card');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();

        if (title.includes(query) || desc.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // 3. Filtro por categoría
  const categoryButtons = document.querySelectorAll('.cat-btn');

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});