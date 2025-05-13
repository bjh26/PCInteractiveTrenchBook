/**
 * Gets all pages of a trench book.
 * @returns Object[] 
 */
export async function getPages(areaAndNumber, year, author){
    try {
        const res = await fetch(`/${areaAndNumber}/${year}/pages?author=${author}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if(!res.ok) {
            const errorMessage = await res.json(); 
            throw new Error(errorMessage.error);
        }

        const pages = await res.json();
        return pages;

    } catch(err) {
        alert(`${err.message}`);
        return [];
    }
}   

/**
 * Gets all trench books.
 * @returns Object[]
 */
export async function allBooks() {
    try {
        const res = await fetch(`/trenchbooks`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });    
        if(!res.ok) {
            const errorMessage = await res.json(); 
            throw new Error(errorMessage.error);
        }      
        const books = await res.json();
        return books;
    } catch(err) {
        alert(`${err.message}`);
        return [];
    }
}
