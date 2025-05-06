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

const seedPages = async () => {
  await sequelize.sync({ force: true });
  const params = {
    Bucket: BUCKET_NAME
  };

  const data = await s3.listObjectsV2(params).promise();
  for (const item of data.Contents) {
    const file = item.Key; 
    const matchPage = file.match(/(\d+)(?=\.\w+$)/);
    const matchTitle = file.match(/\/([^/-]+)-/);
    const pageNumber = matchPage ? parseInt(matchPage[0]) : null;
    const areaAndNumber = matchTitle ? matchTitle[1] : 'PC';
    if (pageNumber === null) continue;
    const imgUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${file}`;
    await pageModel.create({
      areaAndNumber: areaAndNumber,
      year: "1969",
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
  console.log('TEXT', text);
  return text;
}

export { seedPages }