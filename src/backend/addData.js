import { sequelize, pageModel } from "./pageModel.js"; 
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config(); 
const s3 = new AWS.S3({
  region: 'us-east-2'
});

const BUCKET_NAME = "pc-interactive-trench-book-assets";

const seedPages = async () => {
  await sequelize.sync({ force: true });
  const params = {
    Bucket: BUCKET_NAME
  };

  const data = await s3.listObjectsV2(params).promise();
  for (const item of data.Contents) {
    const file = item.Key; 
    const match = file.match(/(\d+)(?=\.\w+$)/);
    const pageNumber = match ? parseInt(match[0]) : null;
    // need to add here how to get the areaAndNumber using regex!
    if (pageNumber === null) continue;
    const imgUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${file}`;
    await pageModel.create({
      areaAndNumber: "1969",
      year: "1969",
      pageNumber: pageNumber,
      author: "PC",
      fileName: file,
      imageUrl: imgUrl,
      keywords: [] // you just added this
    });
  }
  // const imageDir = path.join("../frontend/TrenchBookExampleImages");
  // const files = fs.readdirSync(imageDir);
  // const BUCKET_NAME = "pc-interactive-trench-book-assets";
  // console.log('seeding pages...')
  // for (const file of files) {
  //   const match = file.match(/(\d+)(?=\.\w+$)/);
  //   const pageNumber = match ? parseInt(match[0]) : null;
  //   if (pageNumber === null) continue;
  //   const page = await pageModel.create({
  //     areaAndNumber: "1969",
  //     year: "1969",
  //     pageNumber: pageNumber,
  //     author: "PC",
  //     fileName: file,
  //     imageUrl: `${file}`
  //   });
  // }
};

export { seedPages }