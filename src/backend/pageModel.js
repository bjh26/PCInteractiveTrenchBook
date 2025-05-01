import { Sequelize, DataTypes } from "sequelize";

// initializes a new Sequelize instance with SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite"
});

// Define the Page model
const pageModel = sequelize.define("Pages", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    areaAndNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pageNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fileName: { // this would match the filename or image key in cloud storage
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imageUrl: { // optional if using cloud storage
      type: DataTypes.STRING,
      allowNull: true
    }
});

export {sequelize, pageModel};