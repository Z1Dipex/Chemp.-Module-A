// Catalog page functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing catalog manager');
    
    const filterToggle = document.getElementById('filterToggle');
    const filtersOverlay = document.getElementById('filtersOverlay');
    
    function openFilters() {
        console.log('Opening filters overlay');
        filtersOverlay.classList.add('filters-overlay--open');
        document.body.style.overflow = 'hidden';
    }
    
    function closeFilters() {
        console.log('Closing filters overlay');
        filtersOverlay.classList.remove('filters-overlay--open');
        document.body.style.overflow = '';
    }
    
    function clearFilters() {
        console.log('Clearing all filters');
        
        // Clear all filter inputs
        const checkboxes = document.querySelectorAll('.filter-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        const radios = document.querySelectorAll('.rating-radio');
        radios.forEach(radio => {
            radio.checked = false;
        });
        
        const priceInputs = document.querySelectorAll('.price-input');
        priceInputs.forEach(input => {
            input.value = '';
        });
    }
    
    function applyFilters() {
        console.log('Applying filters');
        // Simulate filter application
        alert('Фильтры применены!');
        closeFilters();
    }
    
    function sortGames() {
        const sortSelect = document.getElementById('sortSelect');
        const sortValue = sortSelect.value;
        console.log('Sorting games by:', sortValue);
        alert(`Сортировка изменена: ${sortSelect.options[sortSelect.selectedIndex].text}`);
    }
    
    function viewGameDetails(card) {
        const gameTitle = card.querySelector('.game-card__title').textContent;
        console.log('Viewing details for:', gameTitle);
        alert(`Переход к деталям игры: ${gameTitle}`);
    }
    
    // Mobile filters toggle
    if (filterToggle) {
        filterToggle.addEventListener('click', openFilters);
    }
    
    // Close filters events
    const closeFiltersBtn = document.getElementById('closeFilters');
    const cancelFilters = document.getElementById('cancelFilters');
    const applyMobileFilters = document.getElementById('applyMobileFilters');
    
    if (closeFiltersBtn) {
        closeFiltersBtn.addEventListener('click', closeFilters);
    }
    
    if (cancelFilters) {
        cancelFilters.addEventListener('click', closeFilters);
    }
    
    if (applyMobileFilters) {
        applyMobileFilters.addEventListener('click', applyFilters);
    }
    
    // Clear filters
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
    }
    
    // Apply filters (desktop)
    const applyFiltersBtn = document.getElementById('applyFilters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }
    
    // Sort functionality
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', sortGames);
    }
    
    // Game card clicks
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicked on button
            if (!e.target.closest('.game-card__button')) {
                viewGameDetails(card);
            }
        });
    });
    
    console.log('Catalog manager initialized successfully');
});