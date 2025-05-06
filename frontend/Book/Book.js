import { getPages } from "../middle.js";

export class Book {

    /**
     * This class takes in a trench book name and an array of its pages.
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
        console.log('start')
        this.loadPages(); 
    }

    /**
     * Load pages asynchronously by calling getPages.
     */
    async loadPages() {
        console.log('pages loading...')
        this.pages = await getPages(this.areaAndNumber, this.year, this.author);
        this.updatePage();  // Once pages are loaded, update the current page view
    }

     /**
     * Update the current page view after the pages have been loaded.
     */
    updatePage() {
        if (this.pages.length > 0) {
            document.getElementById("page").src = this.getCurrPage();
            document.getElementById('pageNo').value = this.currentPage;
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

    render() {
        const mainBlock = document.getElementById('mainBlock');
        mainBlock.classList.add('page-container');
        const navBar = document.getElementById('nav-bar')
        navBar.innerHTML = '';
        mainBlock.innerHTML = ''; // clear the innerHTML
        navBar.innerHTML = `<h1 class="title-container nav-bar-item" id="title"> Trench Book Title </h1>
            <button class="hamburger" id="home">Home</button>`;
        mainBlock.innerHTML = `<div class="button-left">
                <button id="prev">&lt</button>
            </div>
            <img id="page" alt="trench book page">
            <div class="button-right">
                <button id="next">&gt</button>
            </div> `;
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
                            </div>`;
        body.append(pageJump);
        // const sliderContainer = document.createElement('div');
        // sliderContainer.innerHTML = 
        // const pageNumContainer = document.createElement('div');
        // pageNumContainer.innerHTML = `<div class="page-num-container">
        //         <input type="number" id="pageNo">
        //     </div>`;
        // body.append(sliderContainer);
        // body.append(pageNumContainer);
        console.log('rendered!');
    }
}

// database server that provides all the information (aka all the images).
// store link of image in the cloud.
// route that gets all the images
// or do multiple fetches
// USE CLOUD STORAGE TO PULL IMAGES