document.addEventListener('DOMContentLoaded', function () {
  const burgerBtn = document.querySelector('.burger');
  const navMenu = document.querySelector('.nav-menu');
  const closeBtn = document.querySelector('.close-menu');

  burgerBtn.addEventListener('click', function () {
    navMenu.classList.add('mobile-active');
  });

  closeBtn.addEventListener('click', function () {
    navMenu.classList.remove('mobile-active');
  });

  const navLinks = document.querySelectorAll('.lis-item');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 767) {
        navMenu.classList.remove('mobile-active');
      }
    });
  });
});
