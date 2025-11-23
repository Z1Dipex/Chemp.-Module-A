// Theme switching functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing theme switcher');
    
    // Проверяем, на какой странице мы находимся
    const isLightTheme = document.body.classList.contains('theme-light');
    console.log('Current theme:', isLightTheme ? 'light' : 'dark');
    
    // Не создаем переключатель, если мы уже на светлой теме (у нас уже есть встроенный скрипт)
    if (isLightTheme) {
        console.log('Already on light theme page, using built-in theme switcher');
        return;
    }
    
    function createThemeToggle() {
        const button = document.createElement('button');
        button.className = 'theme-toggle__button';
        button.innerHTML = '☀️'; // Солнце для переключения на светлую тему
        button.setAttribute('aria-label', 'Переключить на светлую тему');
        button.setAttribute('type', 'button');
        
        const container = document.createElement('div');
        container.className = 'theme-toggle';
        container.appendChild(button);
        
        return container;
    }
    
    function switchToLightTheme() {
        console.log('Switching to light theme');
        window.location.href = 'index_light.html';
    }
    
    // Создаем и добавляем переключатель только на темной теме
    const themeToggle = createThemeToggle();
    document.body.appendChild(themeToggle);
    
    // Добавляем обработчик события
    const toggleButton = themeToggle.querySelector('.theme-toggle__button');
    toggleButton.addEventListener('click', switchToLightTheme);
    
    console.log('Theme switcher initialized successfully on dark theme');
});