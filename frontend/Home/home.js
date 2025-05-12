import { allBooks } from "../middle.js";
import { Book } from "../Book/Book.js";
/**
 * Creates a Library class that stores all the trench book titles to date.
 * Exports a singleton instance of Library.
 */
class Library {
    constructor(){
        this.books = [];
        this.years = [
            1966, 1967, 1968, 1969, 1970, 1971, 1972,
            1973, 1974, 1975, 1976, 1977, 1978, 1979,
            1980, 1981, 1982, 1983, 1984, 1985, 1986,
            1987, 1988, 1989, 1990, 1991, 1992, 1993,
            1994, 1995, 1996, 1997, 1998, 1999, 2000,
            2001, 2002, 2003, 2004, 2005, 2006, 2007,
            2008, 2009, 2010, 2011, 2012, 2013, 2014,
            2015, 2016, 2017, 2018, 2019, 2020, 2021,
            2022, 2023, 2024, 2025
        ];
    }

    /**
     * Loads books asynchronously by calling allBooks.
     */
    async loadTitles() {
        console.log('book titles loading...')
        this.books = await allBooks();
    }

    /**
     * Renders the main library.
     */
    async render() {
        await this.loadTitles();
        const mainBlock = document.getElementById('mainBlock');
        const pageJump = document.getElementById('pageJump');
        // pageJump.remove();
        mainBlock.classList.remove('page-container');
        const navBar = document.getElementById('nav-bar');
        navBar.innerHTML = '';
        mainBlock.innerHTML = ''; // clear the innerHTML
        navBar.innerHTML = ` <h1 class="title-container nav-bar-item" id="title"> Trench Books </h1>
            <select class="filter-button" id="byTrench">
                <option value="" disabled selected>By Trench</option>
            </select>
            <select class="filter-button" id="byYear">
                <option value="" disabled selected>By Year</option>
            </select>`;
        // for later: <select class="filter-button" id="byAuthor">By Author</select>
        this.books.forEach(b => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book-container');
            bookDiv.dataset.areaAndNumber = b['Trench and Trench Number'];
            bookDiv.dataset.year = b['Year'];
            bookDiv.innerHTML = `
            <span><a href = ${b['URI']} target="_blank">${b['Trench and Trench Number']}</a></span> 
            <span>${b['Year']}</span> 
            <span class='author'>${b['Author']}</span>`;
            mainBlock.appendChild(bookDiv);
            const trenches = document.getElementById('byTrench');
            // const authors = document.getElementById('byAuthor');
            const optTrench = document.createElement('option');
            optTrench.value = b['Trench and Trench Number'];
            optTrench.innerHTML = b['Trench and Trench Number'];
            trenches.appendChild(optTrench);
        });
        this.years.forEach(year => {
            const years = document.getElementById('byYear');
            const optYear = document.createElement('option');
            optYear.value = year;
            optYear.innerHTML = year;
            years.appendChild(optYear);
        });
        this.filters(); //sets up the filters
        this.getBooksLink();
        console.log('Home rendered!');
    }

    /**
     * Links each book to its respective trench book page.
     */
    getBooksLink(){
        const bookTitle = document.body.querySelectorAll('.book-container');
        bookTitle.forEach(e => e.addEventListener('click', async (e) => {
            e.preventDefault();  
            // Get the trench and year from the clicked title's data attributes
            const trench = e.target.dataset.areaAndNumber;
            const year = e.target.dataset.year;
            // Instantiate the Book class and render the book
            const book = new Book(trench, year);
            await book.render();  // Render the selected book
        }));
    }
    
    /**
     * Renders the entries of specified trench name and number.
     */
    async renderTrench(areaAndNumber) {
        const mainBlock = document.getElementById('mainBlock');
        mainBlock.innerHTML = ''; // clear the innerHTML
        const trenchArr = this.books.filter(b => b['Trench and Trench Number'].trim().toLowerCase() === areaAndNumber.trim().toLowerCase());
        console.log(trenchArr);
        trenchArr.forEach(b => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book-container');
            bookDiv.innerHTML = `
            <span><a href = ${b['URI']}>${b['Trench and Trench Number']}</a></span> 
            <span>${b['Year']}</span> 
            <span class='author'>${b['Author']}</span>`;
            mainBlock.appendChild(bookDiv);
        });
        this.getBooksLink();
    }

    async renderYear(year){
        const mainBlock = document.getElementById('mainBlock');
        mainBlock.innerHTML = ''; // clear the innerHTML
        const yearArr = this.books.filter(b => parseInt(b['Year']) === parseInt(year.trim()));
        console.log(yearArr);
        yearArr.forEach(b => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book-container');
            bookDiv.innerHTML = `
            <span><a href = ${b['URI']}>${b['Trench and Trench Number']}</a></span> 
            <span>${b['Year']}</span> 
            <span class='author'>${b['Author']}</span>`;
            mainBlock.appendChild(bookDiv);
        });
        this.getBooksLink();
    }

    filters(){
        document.getElementById('byTrench').addEventListener('change', async (event) => {
            const selectedTrench = event.target.value;
            console.log('triggered filter');
            console.log(selectedTrench);
            await this.renderTrench(selectedTrench);
        }); 
    
        document.getElementById('byYear').addEventListener('change', async (event) => {
            const selectedYear = event.target.value;
            console.log('triggered filter');
            await this.renderYear(selectedYear);
        });
    }
}

const library = new Library();
export default library;