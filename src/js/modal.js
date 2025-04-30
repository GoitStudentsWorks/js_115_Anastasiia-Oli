const modalOverlay = document.querySelector('.modal-overlay');
const closeBtn = document.querySelector('.button-close');
const modalHeader = document.querySelector('.modal-header');
const modalText = document.querySelector('.modal-text');

export function openModal({ title, message }) {
  if (modalHeader) modalHeader.textContent = title;
  if (modalText) modalText.textContent = message;

  modalOverlay.classList.add('is-open');
  document.body.classList.add('no-scroll');

  closeBtn.focus();

  document.addEventListener('keydown', handleEscape);
}

function closeModal() {
  modalOverlay.classList.add('is-closed');

  setTimeout(() => {
    modalOverlay.classList.remove('is-open', 'is-closed');
    document.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', handleEscape);
  }, 300);
}

function handleEscape(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

closeBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', event => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});
