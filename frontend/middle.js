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

// export async function getBooks(){
//     try{
//         const res = await fetch('/trenchbooks', {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             }
//         });
        
//         if(!res.ok){
//             const errorMessage = await res.json();
//             throw new Error(errorMessage.error);
//         }

//         const books = await res.json();
//         return books;

//     } catch(err) {
//         alert(`${err.message}`);
//         return [];
//     }
// }

/**
 * Gets all trench books.
 * @returns 
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

/**
 * Gets all trench books created in specified year.
 * @param {String} year 
 * @returns 
 */
export async function booksByYear(year) {
    try {
        const res = await fetch(`/trenchbooks/${year}`, {
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

/**
 * Gets all trench books related to specified trench.
 * @param {String} areaAndNumber 
 * @returns 
 */
export async function booksByTrench(areaAndNumber) {
    try {
        const res = await fetch(`/trenchbooks/${areaAndNumber}`, {
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