const hamburgerButton = document.querySelector('#menu');
const navigationMenu = document.querySelector('.navigation');

if (hamburgerButton && navigationMenu) {
    hamburgerButton.addEventListener('click', () => {
        navigationMenu.classList.toggle('open');
        hamburgerButton.classList.toggle('open');
    });
}