require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(
  DATABASE_URL,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Reviews, Theaters, Tickets, Viewers, Shows, Favorites } =
  sequelize.models;

Theaters.hasMany(Shows);
Shows.belongsTo(Theaters);

Shows.hasMany(Tickets);
Tickets.belongsTo(Shows);

Viewers.hasMany(Tickets);
Tickets.belongsTo(Viewers);

Viewers.hasMany(Reviews);
Reviews.belongsTo(Viewers);

Shows.hasMany(Reviews);
Reviews.belongsTo(Shows);

Theaters.hasMany(Reviews);
Reviews.belongsTo(Theaters);

Favorites.hasMany(Shows);
Shows.belongsTo(Favorites);

Viewers.belongsToMany(Favorites, { through: "FavoritesViewers" });
Favorites.belongsToMany(Viewers, { through: "FavoritesViewers" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,
  Op,
};
