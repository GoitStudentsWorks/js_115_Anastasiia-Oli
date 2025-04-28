import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

import pathSvg from '../img/sprite.svg';

new Accordion('.accordion-container', {
  duration: 400,
  showMultiple: false,
  openOnInit: [0],
});

const triggers = document.querySelectorAll('.ac-trigger');

function updateAccordionIcons() {
  const listItems = document.querySelectorAll('.ac');

  listItems.forEach(listItem => {
    const icon = listItem.querySelector('.ac-icon use');

    if (!icon) return; // Если иконка не найдена, пропускаем

    if (listItem.classList.contains('is-active')) {
      icon.setAttribute('href', `${pathSvg}#arrow-up`);
    } else {
      icon.setAttribute('href', `${pathSvg}#arrow-down`);
    }
  });
}

triggers.forEach(trigger => {
  trigger.addEventListener('click', function () {
    //setTimeout(updateAccordionIcons, 400); // Даем время для переключения классов
    updateAccordionIcons();
  });
});
