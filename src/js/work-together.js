import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

const form = document.getElementById('workTogetherForm');
const modalTriggerBtn = document.getElementById('openModalBtn');

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

  const formData = {
    email,
    message,
  };

  try {
    const response = await fetch('https://yourserver.com/api/work-together', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to send');
    }

    modalTriggerBtn.click();

    form.reset();
    
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please check your data and try again.',
      position: 'topRight',
    });
  }
});
