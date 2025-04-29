import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

import { postRequest } from './api';
import { openModal } from './modal';

const form = document.getElementById('workTogetherForm');

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const emailInput = form.elements.email;
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
    await postRequest(email, message);

    openModal({
      title: 'Thank you for your interest in cooperation!',
      message:
        'The manager will contact you shortly to discuss further details and opportunities for cooperation. Please stay in touch.',
    });

    form.reset();
  } catch (error) {
    console.error('Form submit error:', error);

    iziToast.error({
      title: 'Error',
      message:
        'Something went wrong. Please check your data and try again.',
      position: 'topRight',
    });
  }
});
