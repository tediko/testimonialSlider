const slider = document.querySelector('.slider');
const track = document.querySelector('.slider__track');
const nextButton = document.querySelector('.slider__button-next');
const prevButton = document.querySelector('.slider__button-prev');
let slides = document.querySelectorAll('.slider__slide');
let index = 1;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.id = `first-clone`;
lastClone.id = `last-clone`;
track.append(firstClone);
track.prepend(lastClone);

const slideWidth = slides[index].clientWidth;
track.style.transform = `translateX(${-slideWidth * index}px)`;

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
    index++;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
    track.style.transition = `transform 250ms ease-in-out`;
}
const moveToPrevSlide = () => {
    if (index <= 0) return;
    index--;
    track.style.transform = `translateX(${-slideWidth * index}px)`;
    track.style.transition = `transform 250ms ease-in-out`;
}

track.addEventListener('transitionend', isTransitionend);
nextButton.addEventListener('click', moveToNextSlide);
prevButton.addEventListener('click', moveToPrevSlide);
