const openBtn = document.getElementById('openModalBtn');
const modalOverlay = document.querySelector('.modal-overlay');
const closeBtn = document.querySelector('.button-close');

function openModal() {
    modalOverlay.classList.add('is-open');
    document.body.classList.add('no-scroll');

    closeBtn.focus();

    document.addEventListener('keydown', handleEscape);
}

function closeModal(){
    modalOverlay.classList.add('is-closed');

    setTimeout(() => {
        modalOverlay.classList.remove('is-open', 'is-closed');
        document.body.classList.remove('no-scroll');
        document.removeEventListener('keydown', handleEscape);

    }, 300);
}

function handleEscape(event){
    if(event.key === 'Escape') {
        closeModal();
    }
}

openBtn.addEventListener('click', openModal);

closeBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (event) => {
    if(event.target === modalOverlay) {
        closeModal();
    }
});