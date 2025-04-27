document.addEventListener('DOMContentLoaded', function () {
  const burgerBtn = document.querySelector('.header-burger');
  const mobileMenu = document.querySelector('.header-mobile-menu');
  const closeBtn = document.querySelector('.header-mobile-close');
  const navLinks = document.querySelectorAll('.header-mobile-nav-link');

  burgerBtn.addEventListener('click', function () {
    mobileMenu.classList.add('active');
    document.body.classList.add('noscroll'); // клас, що блокує скрол (визначається глобально)
  });

  closeBtn.addEventListener('click', function () {
    mobileMenu.classList.remove('active');
    document.body.classList.remove('noscroll');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('active');
      document.body.classList.remove('noscroll');
    });
  });
});
