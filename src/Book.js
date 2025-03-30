export class Book {

    /**
     * This class takes in a trench book name and an array of its pages.
     * Ex: 2024<initials><area>
     * @param {String} name 
     * @param {number[]} pages
     * @param {number} currentPage
     */

    constructor(name, pages, currentPage){
        this.name = name;
        this.pages = pages;
        this.currentPage = currentPage;
    }

    retArr() {
        return this.pages;
    }
    /**
     * Goes to next page.
     */

    next() {
        console.log(this.pages)
        if(this.currentPage + 1 <= this.pages.length) {
            document.getElementById("page").src = `../TrenchBookExampleImages/${this.name}TrenchBookP${this.currentPage+=1}.jpg`;
            document.getElementById('pageNo').value = this.currentPage;
        } else {
            alert("You have reached the last page.")
        }
    }

    /**
     * Goes to previous page.
     */

    prev() {
        if(this.currentPage - 1 > 0) {
            document.getElementById("page").src = `../TrenchBookExampleImages/${this.name}TrenchBookP${this.currentPage-=1}.jpg`;
            document.getElementById('pageNo').value = this.currentPage;
        } else {
            alert("You have reached the first page.")
        }
    }

    /**
     * Returns path to current page.
     */

    getCurrPage() {
        return `../TrenchBookExampleImages/${this.name}TrenchBookP${this.currentPage}.jpg`;
    }

    /**
     * Jumps to the page as indicated by sliding bar.
     */
    setSlider() {
        const slider = document.getElementById('slider');
        slider.min = this.pages[1];
        slider.max = this.pages[this.pages.length - 1] + 1;
    }

    /**
     * Jumps to the specified page with specific page number.
     * @param {number} num 
     */

    jumpToPage(num) {
        if (num > 0 && num < this.pages.length + 1) {
            this.currentPage = num; 
            document.getElementById('page').src = this.getCurrPage();
            document.getElementById('pageNo').value = this.currentPage;
        } else {
            alert('this page doesn\'t exit');
        } 
    }
}

