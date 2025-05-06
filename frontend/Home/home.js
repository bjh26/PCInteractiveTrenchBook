import { allBooks, booksByTrench } from "../middle.js";

export class Library {
    constructor(){
        this.books = [];
    }

    /**
     * Loads books asynchronously by calling allBooks.
     */
    async loadPages() {
        console.log('book titles loading...')
        this.books = await allBooks();
    }

    async render() {
        const mainBlock = document.getElementById('mainBlock');
        const pageJump = document.getElementById('pageJump');
        pageJump.remove();
        mainBlock.classList.remove('page-container');
        const navBar = document.getElementById('nav-bar');
        navBar.innerHTML = '';
        mainBlock.innerHTML = ''; // clear the innerHTML
        navBar.innerHTML = ` <h1 class="title-container nav-bar-item" id="title"> Trench Books </h1>
            <button class="filter-button" id="byTrench">Book</button>
            <button class="filter-button" id="byTrench">By Trench v</button>
            <button class="filter-button" id="byAuthor">By Author v</button>
            <button class="filter-button" id="byYear">By Year v</button>`;
        this.books.forEach(b => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book-container');
            bookDiv.innerHTML = `
            <span><a href = ${b['URI']} target="_blank">${b['Trench and Trench Number']}</a></span> 
            <span>${b['Year']}</span> 
            <span class='author'>${b['Author']}</span>`;
            mainBlock.appendChild(bookDiv);
        });
        console.log('Home rendered!');
    }

    async renderTrench(areaAndNumber) {
        const mainBlock = document.getElementById('mainBlock');
        mainBlock.innerHTML = ''; // clear the innerHTML
        const trenchArr = booksByTrench(areaAndNumber);
        trenchArr.forEach(b => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book-container');
            bookDiv.innerHTML = `
            <span><a href = ${b['URI']}>${b['Trench and Trench Number']}</a></span> 
            <span>${b['Year']}</span> 
            <span class='author'>${b['Author']}</span>`;
            mainBlock.appendChild(bookDiv);
        });
    }
}