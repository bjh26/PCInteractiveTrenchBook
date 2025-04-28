import { Book } from "../Book/Book.js";

const book = new Book('1969', '1969');

// Setting up the page, likely to move to own function when scaling.
const page = document.getElementById('page');
book.setSlider();
page.src = book.getCurrPage();
document.getElementById('pageNo').value = 0;
document.getElementById('slider').value = 0;

const prev = document.getElementById("prev");
prev.addEventListener('click', () => {book.prev(); book.setSlider();});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        book.prev();
    } else if (event.key === 'ArrowRight') {
        book.next();
    }
    book.setSlider();
});

const next = document.getElementById("next");
next.addEventListener('click', () => {book.next(); book.setSlider();});

const jump = document.getElementById('pageNo');
jump.addEventListener('keyup', function (event) {
    if (event.key === 'Enter'){
        book.jumpToPage(parseInt(jump.value))
        book.setSlider();
    }
});

const slide = document.getElementById('slider');
slide.addEventListener('change', () => {
    book.jumpToPage(parseInt(slide.value));
    // book.setSlider();
});

slide.addEventListener('input', () => book.jumpToPage(parseInt(slide.value)));