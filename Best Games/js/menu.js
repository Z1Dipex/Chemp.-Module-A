// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing menu');
    
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');
    
    if (!burger || !nav) {
        console.error('Menu elements not found');
        return;
    }
    
    function toggleMenu() {
        console.log('Toggle menu clicked');
        burger.classList.toggle('header__burger--open');
        nav.classList.toggle('header__nav--open');
        document.body.classList.toggle('no-scroll');
    }
    
    function closeMenu() {
        console.log('Closing menu');
        burger.classList.remove('header__burger--open');
        nav.classList.remove('header__nav--open');
        document.body.classList.remove('no-scroll');
    }
    
    // Add click event to burger
    burger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.header__nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
    
    console.log('Menu initialized successfully');
});