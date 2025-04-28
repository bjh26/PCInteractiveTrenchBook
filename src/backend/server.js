import express from "express";
import fs from "fs";
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.static("../frontend/TrenchBookExampleImages"));
app.use(express.static("../frontend/Main"));
app.use(express.static("../frontend/Book"));
app.use(express.static("../frontend/Page"));
app.use(express.static("../frontend"));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get(`/:areaAndNumber/:year/pages`, (req, res) => {
    const pagesDir = path.join('../frontend/TrenchBookExampleImages');
    const author = req.query.author || 'PC';
    const areaAndNumber = req.params.areaAndNumber ? req.params.areaAndNumber : 'defaultPage';
    const year = req.params.year ? req.params.year : '1969';

    fs.readdir(pagesDir, (err, files) => {
        if(err) {
            return res.status(400).json({ error: 'Cannot find the images folder.' });
        } 
        const pages = files.map(file => {
            const match = file.match(/(\d+)(?=\.\w+$)/); // regex to find the page number
            const pageNumber = match ? match[0] : null; 
            return { // a Page object
                trench: areaAndNumber,
                year: year,   
                pageNumber: pageNumber,
                fileName: file,
                author: author,  
                text: undefined  // to be added once texts can be scanned and stored in db
            };
        });
        res.json(pages);
    })
});