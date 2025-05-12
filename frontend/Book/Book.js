import { getPages } from "../middle.js";
import library from "../Home/home.js";
export class Book {

    /**
     * Constructs a trench book.
     * @param {String} areaAndNumber 
     * @param {String} year 
     * @param {number} currentPage
     * @param {string} author
     */
    constructor(areaAndNumber, year, author="PC"){
        this.areaAndNumber = areaAndNumber;
        this.year = year;
        this.author = author;
        this.currentPage = 0;
        this.pages =[];
        this.viewMode = 'img';
        console.log('start')
        console.log('areaandnumber', this.areaAndNumber.replace(/\s+/g, ''));
        console.log('year', this.year.toString()); // MAKE THIS TO STRING
        this.loadPages(); 
    }

    /**
     * Load pages asynchronously by calling getPages.
     */
    async loadPages() {
        console.log('pages loading...');
        this.pages = await getPages(this.areaAndNumber.replace(/\s+/g, ''), this.year.toString(), this.author);
        this.updatePage();  // Once pages are loaded, update the current page view
    }

     /**
     * Update the current page view after the pages have been loaded. 
     * Dynamically responds to image and text views.
     */
    updatePage() {
        const pageSrc = this.pages.find(p => p.pageNumber === this.currentPage);
        const content = document.getElementById('pageContent');
        const pageNoInput = document.getElementById('pageNo');
        if (!pageSrc || !content || this.pages.length <= 0) return;
        if (this.viewMode === 'img') {
            content.innerHTML = `<img src="${this.getCurrPage()}" alt="${this.areaAndNumber}, page ${this.currentPage}" />`;
        } else {
            content.innerHTML = `<p>${pageSrc.text || 'No text rendering at the moment.'}</p>`;
        }
        pageNoInput.value = this.currentPage;
    }

    /**
     * Toggles views between image and text views.
     */
    toggleView() {
        this.viewMode = this.viewMode === 'img' ? 'text' : 'img';
        this.updatePage();
        const view = document.getElementById('rawText');
        if (view) {
            view.textContent = this.viewMode === 'img' ? 'View raw text' : 'View image';
        }
    }

    /**
     * Goes to next page.
     */
    next() {
        if(this.currentPage < this.pages.length - 2) {
            this.currentPage += 1;
            this.updatePage();
        } else {
            alert("You have reached the last page.");
        }
    }

    /**
     * Goes to previous page.
     */
    prev() {
        if(this.currentPage >= 1) {
            this.currentPage -= 1;
            this.updatePage();
        } else {
            alert("You have reached the first page.")
        }
    }

    /**
     * Returns path to current page.
     */ 
    getCurrPage() { 
        console.log(this.currentPage)
        console.log(this.pages)

        const page = this.pages.find(page => page.pageNumber === this.currentPage);

        if (!page) {
          console.warn(`No page found for area ${this.areaAndNumber}, page ${this.currentPage}`);
          return null;
        }

        console.log(`..${page.imageUrl}`);
        return (page.imageUrl);
    }

    /**
     * Jumps to the page as indicated by sliding bar.
     */
    setSlider() {
        const slider = document.getElementById('slider');
        slider.min = 0;
        slider.max = this.pages.length - 2;
        slider.value = this.currentPage;
    }

    /**
     * Jumps to the specified page with specific page number.
     * @param {number} num 
     */
    jumpToPage(num) {
        if (num > -1 && num < this.pages.length - 1) {
            this.currentPage = num; 
            this.updatePage();
        } else {
            alert('this page doesn\'t exit');
        } 
    }

    /**
     * Gets trench book title.
     */
    getTitle() {
        return this.areaAndNumber;
    }

    /**
     * Adds all the necessary event listeners.
     */
    addEventListeners(){
        // Previous button
        document.getElementById('prev').addEventListener('click', () => {
            this.prev();
            this.setSlider();
        });
        // Next button
        document.getElementById('next').addEventListener('click', () => {
            this.next();
            this.setSlider();
        });
        // View button
        document.getElementById('rawText').addEventListener('click', () => {
            this.toggleView();
        });
        // Slider
        const slider = document.getElementById('slider');
        slider.value = 0;
        slider.addEventListener('input', () => {
            this.jumpToPage(parseInt(slider.value));
        });
        // Page Input
        const pageNoInput = document.getElementById('pageNo');
        pageNoInput.value = 0;
        pageNoInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                this.jumpToPage(parseInt(pageNoInput.value));
                this.setSlider();
            }
        });
        // Left and Right keys
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                this.prev();
            } else if (event.key === 'ArrowRight') {
                this.next();
            }
            this.setSlider();
        });
        // Home button
        document.getElementById('home').addEventListener('click', () => {
            library.render();
        });
    }

    async render() {
        const mainBlock = document.getElementById('mainBlock');
        mainBlock.classList.add('page-container');
        const navBar = document.getElementById('nav-bar');
        // Nav Bar html
        navBar.innerHTML = '';
        navBar.innerHTML = `<h1 class="title-container nav-bar-item" id="title"> Trench Book Title </h1>
            <button class="hamburger" id="home">Home</button>`;
        // Main Block html
        mainBlock.innerHTML = ''; // clear the innerHTML
        mainBlock.innerHTML = `<div class="button-left">
                                    <button id="prev">&lt</button>
                               </div>
                               <div id="pageContent"></div>
                               <div class="button-right">
                                   <button id="next">&gt</button>
                               </div> `;
        // Adds the navigational elements.
        const body = document.body;
        const pageJump = document.createElement('div');
        pageJump.classList.add('page-jump-container');
        pageJump.id = 'pageJump';
        pageJump.innerHTML = `<div class="slider-container">
                                <input type="range" id="slider">
                                <div class="slider-tooltip"></div>
                            </div>
                            <div class="page-num-container">
                                <input type="number" id="pageNo">
                                <button class='raw-text-button' id='rawText'></button>
                            </div>`;
        body.append(pageJump);
        document.getElementById('rawText').textContent = this.viewMode === 'img' ? 'View raw text' : 'View image';
        console.log('rendered!');
        this.updatePage(); 
        // attach event listeners
        this.addEventListeners();
    }
}