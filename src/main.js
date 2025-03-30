import { Book } from "./Book.js";

const pageArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const book = new Book('1969', pageArr, 1);

// Setting up the page, likely to move to own function when scaling.
const page = document.getElementById('page');
book.setSlider();
page.src = book.getCurrPage();
document.getElementById('pageNo').value = 1;
document.getElementById('slider').value = 1;

const prev = document.getElementById("prev");
prev.addEventListener('click', () => book.prev());

const next = document.getElementById("next");
next.addEventListener('click', () => book.next());

const jump = document.getElementById('pageNo');
jump.addEventListener('keyup', function (event) {
    if (event.key === 'Enter'){
        book.jumpToPage(parseInt(jump.value))
    }
});

const slide = document.getElementById('slider');
slide.addEventListener('change', () => {
    book.jumpToPage(parseInt(slide.value));
});
slide.addEventListener('input', () => book.jumpToPage(parseInt(slide.value)));