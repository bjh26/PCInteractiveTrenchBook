import express from "express";
import AWS from 'aws-sdk';
import { sequelize, pageModel } from "./pageModel.js";
import { seedPages } from "./addData.js"
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

// This loads the .env file
dotenv.config({ path: '../.env' });  
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
});

app.get('/trenchbooks', async (_req, res) => {
  try {
    const books = await fs.readFile('../data/areaAndNumber_year_uri.json', 'utf8');
    const booksArr = JSON.parse(books);
    res.json(booksArr);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books."});
  }
});

app.get(`/areaAndNumber`, async (req, res) => {
  const pageNumber = 0;
  const areaAndNumber = req.query.areaAndNumber;
  try {
    const books = await pageModel.findAll({
      where:{
        areaAndNumber: areaAndNumber,
        pageNumber: pageNumber
      }
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch desired books"});
  }
});

app.get('/author', async (req, res) => {
  const author = req.query.author;
  try {
    const books = await pageModel.findAll({
      where:{
        author:author
      }
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch desired author"});
  }
}); 

app.get('/trenchbooks/:year', async (req, res) => {
  const year = req.params.year;
  try {
    const books = await fs.readFile('../data/areaAndNumber_year_uri.json', 'utf8');
    const booksArr = JSON.parse(books);
    const byYear = booksArr.filter(b => b.Year === parseInt(year));
    res.json(byYear);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch desired year"});
  }
});

app.get('/trenchbooks/:author', async (req, res) => {
  const author = req.params.author;
  try {
    const books = await fs.readFile('../data/areaAndNumber_year_uri.json', 'utf8');
    const booksArr = JSON.parse(books);
    const byAuthor = booksArr.filter(b => b.Author === author);
    res.json(byAuthor);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch desired year"});
  }
});

app.get('/trenchbooks/:trench', async (req, res) => {
  const areaAndNumber = req.params.areaAndNumber;
  try {
    const books = await fs.readFile('../data/areaAndNumber_year_uri.json', 'utf8');
    const booksArr = JSON.parse(books);
    const byArea = booksArr.filter(b => b['Trench and Trench Number'] === areaAndNumber);
    res.json(byArea);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch desired year"});
  }
});