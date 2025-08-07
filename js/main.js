const mainNavList = document.querySelector('#main-nav-list');
const navToggle = document.querySelector('.mobile-nav-toggle');

navToggle.addEventListener('click', () => {
    const isVisible = mainNavList.getAttribute('data-visible');

    if (isVisible === 'false') {
        mainNavList.setAttribute('data-visible', 'true');
        navToggle.setAttribute('aria-expanded', 'true');
    } else {
        mainNavList.setAttribute('data-visible', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
    }
});