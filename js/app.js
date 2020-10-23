const slider = document.querySelector('.slider__container');
const track = document.querySelector('.slider__track');
const buttons = document.querySelectorAll('[data-controls]');
const indicators = document.querySelectorAll('[data-idx]');
let slides = document.querySelectorAll('.slider__slide');
const delay = 3000;  // interval delay
let index = 1; // flag to track slide id's
let current = 0; // flag to track current indicators id's
let slideInterval; // variable for slideShow interval

// Clone first and last slide, give each id and append/prepend it in track.
// This allow us to get an infinite slider later.
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.id = `first-clone`;
lastClone.id = `last-clone`;
track.append(firstClone);
track.prepend(lastClone);

// Gets a width for each active slide.
// And set first slide on page load. 
const slideWidth = slides[index].clientWidth;
track.style.transform = `translateX(${-slideWidth * index}px)`;

// The interval triggers a function moveToNextSlide, creating an automatic slider effect.
// It is used on page load & also active it when mouse leave slider.
const slideShow = () => {
    slideInterval = setInterval(moveToNextSlide, delay);
}

// Remove interval for slideShow and stops the effect of the automatic slider.
// It is used when mouse enter slider.
const removeSlideShow = () => {
    clearInterval(slideInterval);
}

// The function disables the transition effect when the active slide equals the cloned elements.
// At this point, we set our track back to the starting position with no transition effect.
// This way we create the effect of an endless slider.
const isTransitionend = () => {
    slides = document.querySelectorAll('.slider__slide');
    if (slides[index].id === firstClone.id) {
        index = 1;
        track.style.transform = `translateX(${-slideWidth * index}px)`;
        track.style.transition = `none`;
    }

    if (slides[index].id === lastClone.id) {
        index = slides.length - 2;
        track.style.transform = `translateX(${-slideWidth * index}px)`;
        track.style.transition = `none`;
    }
}

// The fn is responsible for moving the slide forward and changing the indicators.
// If statement prevent infinite index increment.
const moveToNextSlide = () => {
    if (index >= slides.length - 1) return;
    checkCurrent(true);
    changeIndicators();
    index++;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
    track.style.transition = `transform 250ms ease-in-out`;
}

// The fn is responsible for moving the slide backward and changing the indicators.
// If statement prevent infinite index decrement.
const moveToPrevSlide = () => {
    if (index <= 0) return;
    checkCurrent(false);
    changeIndicators();
    index--;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
    track.style.transition = `transform 250ms ease-in-out`;
}

// The fn is responsible for moving the slide straight to selected slide with is linked to indicator.
// If statement prevent infinite index decrement.
function moveToSlide () {
    current = this.dataset.idx;
    changeIndicators();
    index = parseFloat(current) + 1;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
    track.style.transition = `transform 250ms ease-in-out`;
}

// The fn add active class for current active indicator.
// for each call we remove all active classes using removeAllIndicators();
const changeIndicators = () => {
    removeAllIndicators();
    indicators.forEach(indicator => {
        if (indicator.dataset.idx == current) {
            indicator.classList.add('active');
        }
    })
}

// Helper fn to see which slide is currently active.
const checkCurrent = (check) => {
    check ? current++ : current--;
    if (current > 3) {
        current = 0;
    } else if (current < 0) {
        current = 3;
    } 
}

// Helper fn to remove all active classes on indicators.
const removeAllIndicators = () => {
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    })
}


slideShow();

// Event listeners
slider.addEventListener('mouseenter', removeSlideShow);
slider.addEventListener('mouseleave', slideShow);
track.addEventListener('transitionend', isTransitionend);
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonDir = button.dataset.controls;
        buttonDir == 'prev' ? moveToPrevSlide() : moveToNextSlide();
    })
})
indicators.forEach(indicator => indicator.addEventListener('click', moveToSlide));