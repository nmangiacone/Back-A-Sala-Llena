const { Shows, Tickets, Reviews, Theaters } = require("../db");

const postShows = async (
  CUIT,
  name,
  genre,
  length,
  image,
  summary,
  ticketsQty,
  rated,
  date,
  time,
  score
) => {
  try {
    let newShow = await Shows.create({
      name,
      genre,
      length,
      image,
      summary,
      ticketsQty,
      rated,
      date,
      time,
      score,
    });

    const theater = await Theaters.findOne({
      where: {
        CUIT,
      },
    });
    await theater.addShows(newShow);

    return newShow;
  } catch (err) {
    console.error(err);
  }
};

const getAllShows = async () => await Shows.findAll({});

module.exports = { postShows, getAllShows };
