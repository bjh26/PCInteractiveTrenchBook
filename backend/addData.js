import { sequelize, pageModel } from "./pageModel.js"; 
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import tesseract from "node-tesseract-ocr";

dotenv.config(); 
const s3 = new AWS.S3({
  region: 'us-east-2'
});

// configuration for tesseract module
const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
}

const BUCKET_NAME = "pc-interactive-trench-book-assets";

/**
 * Populates the database with attributes, including the imageURL which is pulled from Amazon S3.
 * When creating folders for each trench book in S3, follow the naming convention:
 * [TrenchName][TrenchNumber]-[ExcavationYear].
 * Ex: Tesoro26-2015
 * The function will populate fields using the following naming convention for images:
 * [TrenchName][TrenchNumber][ExcavationYear]P[PageNumber].
 * Ex: Tesoro262015P0.jpeg.
 * Page numbers are 0 indexed, with the first page, usually title page, set to 0.
 * @param {String} title 
 * @param {String} year 
 */
async function seedPages(title, year){
    await sequelize.sync({ force: true });
    const params = {
      Bucket: BUCKET_NAME
    };  
    const data = await s3.listObjectsV2(params).promise();
    for (const item of data.Contents) {
      const file = item.Key; 
      if (!file.includes(`${title}-${year}`)) continue;
      const matchPage = file.match(/(\d+)(?=\.\w+$)/);
      const pageNumber = matchPage ? parseInt(matchPage[0]) : null;
      if (pageNumber === null) continue;
      const imgUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${file}`;
      await pageModel.create({
        areaAndNumber: title,
        year: year,
        pageNumber: pageNumber,
        author: "PC",
        fileName: file,
        imageUrl: imgUrl,
        text: await getText(imgUrl)
      });
    }
};

async function getText(imgUrl) {
    const text = await tesseract.recognize(imgUrl, config);
    return text;
}

export { seedPages }