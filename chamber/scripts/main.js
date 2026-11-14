document.addEventListener('DOMContentLoaded', () => {
    const currentYearSpan = document.getElementById('currentyear');
    const lastModifiedParagraph = document.getElementById('lastModified');

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    if (lastModifiedParagraph) {
        lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;
    }

    const menuButton = document.getElementById('menu-button');
    const navigation = document.getElementById('navigation');

    if (menuButton && navigation) {
        menuButton.addEventListener('click', () => {
            navigation.classList.toggle('open');
            menuButton.classList.toggle('open');
        });
    }
});