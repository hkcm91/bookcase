// modal.js - Book metadata modal logic

import { state, saveState } from './app.js';

let modalEl, starRatingEl, previewEl;

export function initModal(modal, stars, preview) {
  modalEl = modal;
  starRatingEl = stars;
  previewEl = preview;
}

export function openModal(bookId) {
  const book = state.books[bookId];
  if (!book) return;
  previewEl.style.backgroundImage = `url(${book.image})`;
  renderStars(book.rating || 0, bookId);
  modalEl.style.display = 'block';
}

export function closeModal() {
  modalEl.style.display = 'none';
}

function renderStars(rating, bookId) {
  starRatingEl.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.className = 'star' + (i <= rating ? ' selected' : '');
    star.textContent = '★';
    star.addEventListener('click', () => {
      state.books[bookId].rating = i;
      saveState();
      renderStars(i, bookId);
    });
    starRatingEl.appendChild(star);
  }
}