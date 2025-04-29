import Swiper from 'swiper';
import 'swiper/css';

document.addEventListener("DOMContentLoaded", function () {
    const reviewsWrapper = document.getElementById("reviews-wrapper");
    const errorMessage = document.getElementById("error-message");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    let currentIndex = 0; // Індекс поточного відгуку
    let reviews = [];     // Масив відгуків
    // Функція для отримання відгуків з сервера
    async function fetchReviews() {
        errorMessage.hidden = true;
        try {
            const response = await fetch('https://portfolio-js.b.goit.study/api/reviews');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            reviews = await response.json();
            if (reviews.length === 0) {
                throw new Error('No reviews found');
            }
            renderReviews(); // Рендеринг відгуків
        } catch (error) {
            errorMessage.innerText = "Not found";
            errorMessage.hidden = false;
            // Виклик статичних відгуків у разі помилки
            renderStaticReviews();
        }
    }
    // Функція для рендерингу відгуку за індексом
    function renderReviews() {
    reviewsWrapper.innerHTML = ''; // Очищення попередніх відгуків
    const screenWidth = window.innerWidth;
    const reviewsToRender = [];
  
    if (screenWidth >= 1280) {
        // Десктоп: додаємо 2 відгуки
        reviewsToRender.push(reviews[currentIndex]);
        if (currentIndex + 1 < reviews.length) {
            reviewsToRender.push(reviews[currentIndex + 1]);
        }
    } else {
        // Мобілка і планшет: тільки один
        reviewsToRender.push(reviews[currentIndex]);
    }
    
    // Тепер правильно рендеримо всі відгуки
    reviewsToRender.forEach((review) => {
        if (review) {
            const listItem = document.createElement('li');
            listItem.classList.add('review');
            listItem.innerHTML = `
                <p class="review-text">${review.review}</p>
                <div class="review-author-info">
                    <img src="${review.avatar_url}" alt="${review.author}" class="review-author-photo"/>
                    <div class="review-author-details">
                        <span class="review-author">${review.author} </span>
                    </div>
                </div>
            `;
            reviewsWrapper.appendChild(listItem);
        }
    });

   

    // Функція для рендерингу статичних відгуків
    function renderStaticReviews() {
        reviews = [
            {
              "_id": 1,
              "author": "Natalia",
              "avatar_url": "https://ftp.goit.study/img/avatars/4.jpg",
              "review": "Work with was extraordinary! He turned out to be a very competent and responsible specialist. The projects were completed on time and the result exceeded my expectations."
            }
          ]
        renderReviews();
    }
    
     // Вимкнення кнопок при досягненні країв списку
     prevButton.disabled = currentIndex === 0;
     nextButton.disabled = screenWidth >= 1280 
         ? currentIndex >= reviews.length - 2 // Якщо 2 картки, кінець тоді, коли останні дві
         : currentIndex >= reviews.length - 1; // Якщо 1 картка, кінець на останній
     };
    
    // Обробка подій при натисканні на кнопки
    nextButton.addEventListener("click", () => {
        const screenWidth = window.innerWidth;
        const step = screenWidth >= 1280 ? 2 : 1;
        if (currentIndex + step < reviews.length) {
            currentIndex += step;
            renderReviews();
        }
    });
    prevButton.addEventListener("click", () => {
    const screenWidth = window.innerWidth;
    const step = screenWidth >= 1280 ? 2 : 1;
    if (currentIndex - step >= 0) {
        currentIndex -= step;
        renderReviews();
    }
});
    // Обробка клавіш на клавіатурі для навігації
    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowRight":
                if (currentIndex < reviews.length - 1) {
                    currentIndex++;
                    renderReviews();
                }
                break;
            case "ArrowLeft":
                if (currentIndex > 0) {
                    currentIndex--;
                    renderReviews();
                }
                break;
            case "Tab":
                if (document.activeElement === prevButton) {
                    nextButton.focus();
                } else {
                    prevButton.focus();
                }
                break;
        }
    });
    fetchReviews(); // Виклик функції для отримання відгуків
});