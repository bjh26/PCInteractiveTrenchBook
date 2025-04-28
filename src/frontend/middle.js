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