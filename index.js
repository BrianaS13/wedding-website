document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carousel-track');
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const indicators = document.querySelectorAll('.indicator');

    let currentIndex = 0;
    const slideCount = slides.length;
    let autoplayInterval;

    // Update carousel position and indicators
    const updateCarousel = (index) => {
        // Handle wrapping
        if (index < 0) {
            index = slideCount - 1;
        } else if (index >= slideCount) {
            index = 0;
        }

        currentIndex = index;
        const amountToMove = -currentIndex * 100;
        track.style.transform = `translateX(${amountToMove}%)`;

        // Update indicators
        indicators.forEach((indicator, i) => {
            if (i === currentIndex) {
                indicator.classList.remove('bg-white/50');
                indicator.classList.add('bg-white', 'scale-125');
            } else {
                indicator.classList.add('bg-white/50');
                indicator.classList.remove('bg-white', 'scale-125');
            }
        });
    };

    // Initial state
    updateCarousel(0);

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        updateCarousel(currentIndex + 1);
        resetAutoplay();
    });

    prevBtn.addEventListener('click', () => {
        updateCarousel(currentIndex - 1);
        resetAutoplay();
    });

    indicators.forEach(indicator => {
        indicator.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            updateCarousel(index);
            resetAutoplay();
        });
    });

    // Autoplay functionality
    const startAutoplay = () => {
        autoplayInterval = setInterval(() => {
            updateCarousel(currentIndex + 1);
        }, 5000); // Change slide every 5 seconds
    };

    const stopAutoplay = () => {
        clearInterval(autoplayInterval);
    };

    const resetAutoplay = () => {
        stopAutoplay();
        startAutoplay();
    };

    // Pause on hover
    const carouselContainer = document.querySelector('.group');
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);

    // Start
    startAutoplay();
});