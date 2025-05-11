import { Book } from "../Book/Book.js";
import library from "../Home/home.js";

document.addEventListener('DOMContentLoaded', async () => {
    // const book = new Book('Tesoro01', '1969');
    await library.render();
});
