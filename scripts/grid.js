// grid.js - Shelf grid rendering and drag-and-drop book placement

import { state, saveState } from './app.js';

export function renderGrid(container) {
  container.innerHTML = '';
  for (let row = 0; row < state.rows; row++) {
    for (let col = 0; col < state.columns; col++) {
      const slot = document.createElement('div');
      slot.className = 'slot';
      slot.dataset.row = row;
      slot.dataset.col = col;

      const book = findBookAtPosition(row, col);
      if (book) {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.style.backgroundImage = `url(${book.image})`;
        bookDiv.draggable = true;
        bookDiv.dataset.bookId = book.id;
        bookDiv.addEventListener('dragstart', handleDragStart);
        bookDiv.addEventListener('click', () => openModal(book.id));
        slot.appendChild(bookDiv);
      }

      slot.addEventListener('dragover', e => e.preventDefault());
      slot.addEventListener('drop', handleDrop);
        } else {
    slot.style.backgroundColor = "#f0f0f0";
    slot.style.border = "2px dashed #999";
    slot.innerHTML = '<div style="text-align:center;padding-top:60px;color:#999;">Empty</div>';
  }
  container.appendChild(slot);
    }
  }
}

function findBookAtPosition(row, col) {
  return Object.values(state.books).find(book =>
    book.position.row === row && book.position.col === col
  );
}

function handleDragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.dataset.bookId);
}

function handleDrop(e) {
  const bookId = e.dataTransfer.getData('text/plain');
  const row = parseInt(e.currentTarget.dataset.row);
  const col = parseInt(e.currentTarget.dataset.col);
  if (state.books[bookId]) {
    state.books[bookId].position = { row, col };
    saveState();
    renderGrid(e.currentTarget.parentElement);
  }
}