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

    /**
     * Renders the main library.
     */
    async render() {
        const mainBlock = document.getElementById('mainBlock');
        const pageJump = document.getElementById('pageJump');
        pageJump.remove();
        mainBlock.classList.remove('page-container');
        const navBar = document.getElementById('nav-bar');
        navBar.innerHTML = '';
        mainBlock.innerHTML = ''; // clear the innerHTML
        navBar.innerHTML = ` <h1 class="title-container nav-bar-item" id="title"> Trench Books </h1>
            <select class="filter-button">Book</select>
            <select class="filter-button" id="byTrench">By Trench v</select>
            <select class="filter-button" id="byAuthor">By Author v</select>
            <select class="filter-button" id="byYear">By Year v</select>`;
        this.books.forEach(b => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book-container');
            bookDiv.innerHTML = `
            <span><a href = ${b['URI']} target="_blank">${b['Trench and Trench Number']}</a></span> 
            <span>${b['Year']}</span> 
            <span class='author'>${b['Author']}</span>`;
            mainBlock.appendChild(bookDiv);
            const trenches = document.getElementById('byTrench');
            const authors = document.getElementById('byAuthor');
            const years = document.getElementById('byYear');
            const optTrench = document.createElement('option');
            optTrench.value = b['Trench and Trench Number'];
            optTrench.innerHTML = b['Trench and Trench Number'];
            trenches.appendChild(optTrench);
            const optYear = document.createElement('option');
            optYear.value = b['Year'];
            optYear.innerHTML = b['Year'];
            years.appendChild(optYear);
        });
        console.log('Home rendered!');
    }

    /**
     * Renders the entries of specified trench name and number.
     */
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

// want a function that loads the database (sqlite) with the desired trench book