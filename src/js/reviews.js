import axios from 'axios';
import { getReviews } from './api';

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const reviewsWrapper = document.getElementById('reviews-wrapper');
const errorMessage = document.getElementById('error-message');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let swiper;

async function renderReviews() {
  try {
    const reviews = await getReviews();
    if (!reviews.length) {
      throw new Error('Empty data');
    }

    const markup = reviews
      .map(
        ({ author, avatar_url, review }) => `
        <li class="swiper-slide review-slide">
        <p class="review-text">${review}</p>
        <div class="name-wrapper">
        <img src="${avatar_url}" alt="${author}" class="review-avatar" />
          <h3 class="review-author">${author}</h3>
          </div>

        </li>`
      )
      .join('');

    // Створення слайдера
    reviewsWrapper.insertAdjacentHTML('beforeend', markup);

    // Ініціалізація Swiper
    swiper = new Swiper('.swiper', {
      autoHeight: false,
      slidesPerView: 'auto',
      spaceBetween: 20,
      loop: false,
      breakpoints: {
        768: {
          slidesPerView: 1,
        },
        1280: {
          slidesPerView: 2,
        },
      },
      navigation: {
        nextEl: document.getElementById('next-button'),
        prevEl: document.getElementById('prev-button'),
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      mousewheel: true,
      on: {
        slideChange: () => updateButtons(),
        afterInit: () => updateButtons(),
      },
    });
  } catch (error) {
    console.error(error);
    errorMessage.style.display = 'flex';
    prevButton.disabled = true;
    nextButton.disabled = true;
    reviewsWrapper.innerHTML = '';
    iziToast.warning({
      title: 'Warning',
      message: 'Reviews not found',
      position: 'topRight',
    });
  }
}

function updateButtons() {
  if (!swiper) return;

  prevButton.disabled = swiper.isBeginning;
  nextButton.disabled = swiper.isEnd;

  prevButton.classList.toggle('disabled', swiper.isBeginning);
  nextButton.classList.toggle('disabled', swiper.isEnd);
}

renderReviews();
console.log('Slides count:', reviewsWrapper);
