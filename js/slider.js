// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing slider');
    
    const track = document.querySelector('.slider__track');
    const slides = document.querySelectorAll('.slider__slide');
    const indicators = document.querySelectorAll('.slider__indicator');
    
    if (!track || slides.length === 0) {
        console.error('Slider elements not found');
        return;
    }
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let autoPlayInterval = null;
    
    function goToSlide(slideIndex) {
        console.log('Going to slide:', slideIndex);
        currentSlide = slideIndex;
        updateSlider();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }
    
    function updateSlider() {
        // Update track position
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('slider__indicator--active', index === currentSlide);
        });
        
        // Update slides
        slides.forEach((slide, index) => {
            slide.classList.toggle('slider__slide--active', index === currentSlide);
        });
    }
    
    function startAutoPlay() {
        if (autoPlayInterval) return;
        
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 5000);
        
        console.log('Autoplay started');
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
            console.log('Autoplay stopped');
        }
    }
    
    // Add click events to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Start autoplay
    startAutoPlay();
    
    // Pause autoplay on hover
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);
    
    // Touch events for mobile
    let startX = 0;
    let endX = 0;
    
    track.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const diff = startX - endX;
        const minSwipeDistance = 50;
        
        if (Math.abs(diff) > minSwipeDistance) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                updateSlider();
            }
        }
    }
    
    console.log('Slider initialized successfully');
});