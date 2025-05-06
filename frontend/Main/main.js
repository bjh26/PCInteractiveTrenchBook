import { Book } from "../Book/Book.js";
import { Library } from "../Home/home.js";

// document.addEventListener('DOMContentLoaded', async () => {
    const book = new Book('Tesoro01', '1969');
    book.render();
    // const home = new Library();
    // await home.loadPages();
    // document.getElementById('home').addEventListener('click', () => home.render());
    // document.getElementById('byTrench').addEventListener('click', () => home.renderTrench()) // need to create drop down
// });

// await home.render();
// Setting up the page, likely to move to own function when scaling.
const page = document.getElementById('page');
book.setSlider();
page.src = await book.getCurrPage();
document.getElementById('pageNo').value = 0;
document.getElementById('slider').value = 0;
document.getElementById('title').innerText = book.getTitle();
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
});
slide.addEventListener('input', () => book.jumpToPage(parseInt(slide.value)));
document.getElementById('rawText').addEventListener('click', () => book.text());