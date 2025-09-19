document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) return; // Don't run if the carousel isn't on the page

    const track = carouselContainer.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = carouselContainer.querySelector('.carousel-button--right');
    const prevButton = carouselContainer.querySelector('.carousel-button--left');
    const dotsNav = carouselContainer.querySelector('.carousel-nav');
    const dots = Array.from(dotsNav.children);

    if (slides.length === 0) return; // Exit if there are no slides

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Arrange the slides next to one another
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (currentSlide, targetSlide) => {
        if (!targetSlide) return;
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    const updateDots = (currentDot, targetDot) => {
        if (!targetDot) return;
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    };

    const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
        if (targetIndex === 0) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'block';
        } else if (targetIndex === slides.length - 1) {
            prevButton.style.display = 'block';
            nextButton.style.display = 'none';
        } else {
            prevButton.style.display = 'block';
            nextButton.style.display = 'block';
        }
    };

    // --- Manual Navigation ---

    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const prevDot = currentDot.previousElementSibling;
        moveToSlide(currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
    });

    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling;
        moveToSlide(currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    });

    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
    });

    // --- Auto-Rotation Logic ---
    let slideInterval;

    const autoAdvance = () => {
        const currentSlide = track.querySelector('.current-slide');
        let nextSlide = currentSlide.nextElementSibling;
        if (!nextSlide) {
            nextSlide = slides[0]; // Loop back to the first slide
        }
        
        const currentDot = dotsNav.querySelector('.current-slide');
        let nextDot = currentDot.nextElementSibling;
        if (!nextDot) {
            nextDot = dots[0]; // Loop back to the first dot
        }

        moveToSlide(currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    };

    const startSlideShow = () => {
        slideInterval = setInterval(autoAdvance, 5000); // Change slide every 5 seconds
    };

    const stopSlideShow = () => {
        clearInterval(slideInterval);
    };

    carouselContainer.addEventListener('mouseenter', stopSlideShow);
    carouselContainer.addEventListener('mouseleave', startSlideShow);

    // Set initial slide state and start the slideshow
    if (slides.length > 0) {
        slides[0].classList.add('current-slide');
        dots[0].classList.add('current-slide');
        startSlideShow();
    }
});
