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

    // --- Easter Egg Logic ---
    
    // 1. "GG" Keystroke Listener
    let lastKeyTitle = '';
    let lastKeyTime = 0;
    
    document.addEventListener('keydown', (e) => {
        // Check if user is typing in a form element
        const tag = document.activeElement.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement.isContentEditable) {
            return;
        }

        const key = e.key.toLowerCase();
        const now = Date.now();

        if (key === 'g') {
            // Check if previous key was also 'g' within a reasonable time (e.g., 2 seconds)
            if (lastKeyTitle === 'g' && (now - lastKeyTime < 2000)) {
                window.location.href = 'easteregg.html';
            }
            lastKeyTitle = 'g';
            lastKeyTime = now;
        } else {
            lastKeyTitle = '';
        }
    });

    // 2. Click "G"s in Lodgings
    const secretGs = document.querySelectorAll('.secret-g');
    secretGs.forEach(g => {
        g.addEventListener('click', () => {
            window.location.href = 'easteregg.html';
        });
    });
});