const burger_btn = document.querySelector('.burger');
const burgerMenu = document.querySelector('.header__nav');
const burgerMenuOpacity = document.querySelector('.nav_background');
const logo = document.querySelector('.header__logo');

burger_btn.addEventListener('click', function () {
    burger_btn.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    logo.classList.toggle('active');
    burgerMenuOpacity.classList.toggle('active');
    document.body.classList.toggle('lock');
});

burgerMenuOpacity.addEventListener('click', () => {
    burger_btn.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    logo.classList.toggle('active');
    burgerMenuOpacity.classList.toggle('active');
    document.body.classList.toggle('lock');
});
const navLinks = document.querySelectorAll('.header__link');
navLinks.forEach((el) => el.addEventListener('click', closeMenu));
function closeMenu(event) {
    if (event.target.classList.contains('header__link')) {
        burger_btn.classList.remove('active');
        burgerMenu.classList.remove('active');
        logo.classList.remove('active');
        burgerMenuOpacity.classList.remove('active');
        document.body.classList.remove('lock');
    }
}
