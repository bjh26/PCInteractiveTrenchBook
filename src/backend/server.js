import express from "express";
import AWS from 'aws-sdk';
import { sequelize, pageModel } from "./pageModel.js";
import { seedPages } from "./addData.js"
import dotenv from 'dotenv';
import path from 'path';

// This loads the .env file
dotenv.config({ path: '../../.env' });  
console.log(process.env)

// instantiate Express
const app = express();
const PORT = 3000;

// instantiate AWS
const s3 = new AWS.S3({
  region: 'us-us-east-2', 
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// app.use(express.static("../frontend/TrenchBookExampleImages"));
app.use(express.static("../frontend/Main"));
app.use(express.static("../frontend/Book"));
app.use(express.static("../frontend"));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

async function startServer() {
  console.log('loading pre-made data...')
    await seedPages(); 
  console.log('syncing database...')
    await sequelize.sync(); 
    console.log('SERVER STARTING')
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();

app.get(`/:areaAndNumber/:year/pages`, async (req, res) => {
    const pagesDir = path.join('../frontend/TrenchBookExampleImages');
    const author = req.query.author || 'PC';
    const areaAndNumber = req.params.areaAndNumber ? req.params.areaAndNumber : 'defaultPage';
    const year = req.params.year ? req.params.year : '1969';
    try {
        const pages = await pageModel.findAll({
          where: {
            areaAndNumber: areaAndNumber,
            year:year,
            author:author
          },
          order: [["pageNumber", "ASC"]]
        });
        res.json(pages);
      } catch (err) {
        console.error("Error fetching pages:", err);
        res.status(500).json({ error: "Failed to fetch pages from database." });
      }

    // fs.readdir(pagesDir, (err, files) => {
    //     if(err) {
    //         return res.status(400).json({ error: 'Cannot find the images folder.' });
    //     } 
    //     const pages = files.map(file => {
    //         const match = file.match(/(\d+)(?=\.\w+$)/); // regex to find the page number
    //         const pageNumber = match ? match[0] : null; 
    //         return { // a Page object
    //             trench: areaAndNumber,
    //             year: year,   
    //             pageNumber: pageNumber,
    //             fileName: file,
    //             author: author,  
    //             text: undefined  // to be added once texts can be scanned and stored in db
    //         };
    //     });
    //     res.json(pages);
    // })
});