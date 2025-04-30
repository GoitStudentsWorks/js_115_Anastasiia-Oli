import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

import { postRequest } from './api';
import { openModal } from './modal';

const form = document.getElementById('workTogetherForm');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const successIcon = document.querySelector('.success-ic');
const emailWarning = document.querySelector('.email-warning');
// add class visible to all of "querySelected"
const emailInput = document.querySelector('.work-together-input');

emailInput.addEventListener('blur', () => {
  const email = emailInput.value.trim();

  // email validation

  if (!emailPattern.test(email)) {
    emailInput.classList.add('visible');
    emailWarning.classList.add('visible');
    successIcon.classList.remove('visible');
  } else {
    successIcon.classList.add('visible');
    emailInput.classList.remove('visible');
    emailWarning.classList.remove('visible');
  }
});

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const messageInput = form.elements.message;

  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!email || !message) {
    iziToast.error({
      title: 'Error',
      message: 'Please fill in all fields.',
      position: 'topRight',
    });
    return;
  }

  try {
    const answer = await postRequest(email, message);

    openModal({
      title: `${answer.title}`,
      message: `${answer.message}`,
    });

    form.reset();
  } catch (error) {
    console.error('Form submit error:', error);
    console.log(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please check your data and try again.',
      position: 'topRight',
    });
  }
});
