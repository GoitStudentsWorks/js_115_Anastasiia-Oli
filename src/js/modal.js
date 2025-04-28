import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

import { postRequest } from './api'; 



const modalOverlay = document.querySelector('.modal-overlay');
const closeBtn = document.querySelector('.button-close');
const form = document.querySelector('.work-together-form');

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

closeBtn.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (event) => {
    if(event.target === modalOverlay) {
        closeModal();
    }
});

async function handleFormSubmit (event) {
    event.preventDefault();

 
    const email = form.querySelector('[name="email"]').value;
    const comment = form.querySelector('[name="message"]').value;
     
    try {
        const response = await postRequest(email, comment);  
        openModal();
        form.reset();  
              
        
        iziToast.success({
            title: 'Success',
            message: 'Form submitted successfully!',
            position: 'bottomRight',
            backgroundColor: '#E4E5E6',
            messageColor: '#292929',
            titleColor: '#292929',
        });

    } catch(error){
        console.log(error);

        iziToast.error({
            title: 'Error',
            message: 'Failed to submit form. Please check your data and try again!',
            position: 'bottomRight',
            backgroundColor: '#E4E5E6',
            messageColor: '#292929',
            titleColor: '#292929',
            timeout: false,
        });
    }

}

form.addEventListener('submit', handleFormSubmit);

export default {
    openModal,
    closeModal,
    handleEscape,
    handleFormSubmit
};