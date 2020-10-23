const slider = document.querySelector('.slider__container');
const track = document.querySelector('.slider__track');
const buttons = document.querySelectorAll('[data-controls]');
const indicators = document.querySelectorAll('[data-idx]');
let slides = document.querySelectorAll('.slider__slide');
const delay = 3000;
let index = 1;
let current = 0;
let slideInterval;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.id = `first-clone`;
lastClone.id = `last-clone`;
track.append(firstClone);
track.prepend(lastClone);

const slideWidth = slides[index].clientWidth;
track.style.transform = `translateX(${-slideWidth * index}px)`;

const slideShow = () => {
    slideInterval = setInterval(moveToNextSlide, delay);
}

const removeSlideShow = () => {
    clearInterval(slideInterval);
}

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

const moveToNextSlide = () => {
    if (index >= slides.length - 1) return;
    checkCurrent(true);
    changeIndicators();
    index++;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
    track.style.transition = `transform 250ms ease-in-out`;
}
const moveToPrevSlide = () => {
    if (index <= 0) return;
    checkCurrent(false);
    changeIndicators();
    index--;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
    track.style.transition = `transform 250ms ease-in-out`;
}

function moveToSlide () {
    current = this.dataset.idx;
    changeIndicators();
    index = parseFloat(current) + 1;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
    track.style.transition = `transform 250ms ease-in-out`;
}

const changeIndicators = () => {
    removeAllIndicators();
    indicators.forEach(indicator => {
        if (indicator.dataset.idx == current) {
            indicator.classList.add('active');
        }
    })
}

const checkCurrent = (check) => {
    check ? current++ : current--;
    if (current > 3) {
        current = 0;
    } else if (current < 0) {
        current = 3;
    } 
}

const removeAllIndicators = () => {
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    })
}


slideShow();
slider.addEventListener('mouseenter', removeSlideShow);
slider.addEventListener('mouseleave', slideShow);
track.addEventListener('transitionend', isTransitionend);
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonDir = button.dataset.controls;
        buttonDir == 'prev' ? moveToPrevSlide() : moveToNextSlide();
    })
})
indicators.forEach(indicator => {
    indicator.addEventListener('click', moveToSlide);
})