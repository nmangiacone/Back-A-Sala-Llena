const server = require("./src/app.js");
const {PORT} = process.env
const { conn } = require("./src/db.js");
const {
  loadTheaters,
  loadShows,
  loadReviews,
  loadViewers,
  loadTickets,
  loadFavoriteViewers,
  loadFavorites,
} = require("./preload-Db");

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  loadViewers();
  loadFavorites();
  loadTheaters();
  loadShows();
  loadReviews();
  loadTickets();
  loadFavoriteViewers();

  server.listen(PORT, () => {
    console.log("%s listening at 3001 - Data base loaded."); // eslint-disable-line no-console
  });
});
