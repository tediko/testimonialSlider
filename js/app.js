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
