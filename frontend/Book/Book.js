import { getPages } from "../middle.js";
import library from "../Home/home.js";
export class Book {

    /**
     * Constructs a trench book.
     * @param {string} areaAndNumber Area and number of the specified trench.
     * @param {string} year Year the trench was excavated.
     * @param {string} author Optional: the author of the trench book. Default to PC, short for Poggio Civitate.
     */

    /**
     * @type {number} 
     * The current page the book is on.
     */
    currentPage;

    /**
     * @type {Object[]} 
     * A list of objects that store the metadata for each page in the trench book.
     */
    pages;
    
    /**
     * @type {string} 
     * The current viewing mode. Default to image. 
     */
    viewMode;

    /**
     * @type {(event: any) => void} 
     * A function that implements the global keydown event for switching between pages using the left and right arrow keys. 
     */
    viewMode;

    constructor(areaAndNumber, year, author="PC"){
        this.areaAndNumber = areaAndNumber;
        this.year = year;
        this.author = author;
        this.currentPage = 0;
        this.pages =[];
        this.viewMode = 'img';
        this.handler = (event) => {
                if (event.key === 'ArrowLeft') {
                    this.prev();
                    this.setSlider();
                } else if (event.key === 'ArrowRight') {
                    this.next();
                    this.setSlider();
                }  
        };
    }

    /**
     * Gets the keydown global events. 
     * @returns A function that implements the keydown events. 
     */
    getKeyDown(){
        return this.handler;
    }

    /**
     * Load pages asynchronously by calling getPages.
     * @returns void
     */
    async loadPages() {
        console.log('pages loading...');
        console.log(this.areaAndNumber.replace(/\s+/g, ''))
        this.pages = await getPages(this.areaAndNumber.replace(/\s+/g, ''), this.year.toString(), this.author);
        this.updatePage();  // Once pages are loaded, update the current page view
    }

     /**
     * Update the current page view after the pages have been loaded. 
     * Dynamically responds to image and text views.
     * @returns void
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
     * @returns void
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
     * @returns void
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
     * @returns void
     */
    prev() {
        if(this.currentPage >= 1) {
            this.currentPage -= 1;
            this.updatePage();
        } else {
            alert("You have reached the first page.");
        }
    }

    /**
     * Returns url to current page.
     * @returns string
     */ 
    getCurrPage() { 
        const page = this.pages.find(page => page.pageNumber === this.currentPage);
        if (!page) {
          console.warn(`No page found for area ${this.areaAndNumber}, page ${this.currentPage}`);
          return null;
        }
        return (page.imageUrl);
    }

    /**
     * Jumps to the page as indicated by sliding bar.
     * @returns void
     */
    setSlider() {
        const slider = document.getElementById('slider');
        slider.min = 0;
        slider.max = this.pages.length - 2;
        slider.value = this.currentPage;
    }

    /**
     * Jumps to the specified page with page number.
     * @param {number} num 
     * @returns void
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
     * Returns trench book title.
     * @returns string
     */
    getTitle() {
        return this.areaAndNumber + ', ' + this.year;
    }

    /**
     * Adds all the necessary event listeners.
     * @returns void
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
        // Home button
        document.getElementById('home').addEventListener('click', async () => {
            await library.render();
        });
    }

    /**
     * Renders a Book instance. 
     * @returns void
     */
    async render() {
        await this.loadPages(); 
        const mainBlock = document.getElementById('mainBlock');
        mainBlock.classList.add('page-container');
        const navBar = document.getElementById('nav-bar');
        // Nav Bar html
        navBar.innerHTML = '';
        navBar.innerHTML = `<h1 class="title-container nav-bar-item" id="title"> ${this.getTitle()} </h1>
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
        if(document.getElementById('pageJump')){
            document.getElementById('pageJump').remove();
        }
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