// app.js - Main state and application entry point

export let state = {
  rows: 2,
  columns: 6,
  books: {}
};

export function generateBookId() {
  return 'book-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

export function saveState() {
  localStorage.setItem('ritualBookshelfState', JSON.stringify(state));
}

export function loadState() {
  const saved = localStorage.getItem('ritualBookshelfState');
  if (saved) {
    state = JSON.parse(saved);
  }
}