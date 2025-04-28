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
        this.loadPages(); 
    }

    /**
     * Load pages asynchronously by calling getPages.
     */
      async loadPages() {
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
    getCurrPage() { // this function needs to be better
        return `../TrenchBookExampleImages/${this.areaAndNumber}TrenchBookP${this.currentPage}.jpg`;
    }

    /**
     * Jumps to the page as indicated by sliding bar.
     */
    setSlider() {
        const slider = document.getElementById('slider');
        slider.min = 0;
        slider.max = this.pages.length - 1;
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
}
