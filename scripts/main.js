// main.js - App entry point

import { loadState } from './app.js';
import { renderGrid } from './grid.js';
import { initModal } from './modal.js';

document.addEventListener('DOMContentLoaded', () => {
  loadState();

  const bookshelf = document.getElementById('bookshelf');
  const modal = document.getElementById('bookModal');
  const starRating = document.getElementById('starRating');
  const preview = document.getElementById('modalImagePreview');

  initModal(modal, starRating, preview);
  renderGrid(bookshelf);

  // Close modal when clicking outside or pressing escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') modal.style.display = 'none';
  });
});

import { state } from './app.js';
console.log("Grid dimensions:", state.rows, "×", state.columns);
console.log("Books in storage:", Object.keys(state.books).length);
document.body.insertAdjacentHTML('beforeend', 
  `<p style="color:gray;">Grid: ${state.rows}×${state.columns}, Books: ${Object.keys(state.books).length}</p>`);
