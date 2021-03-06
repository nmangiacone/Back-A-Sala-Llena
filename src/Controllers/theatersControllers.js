const { Theaters, Shows, Reviews } = require("../db");

const postTheatersRegistration = async (
  name,
  CUIT,
  email,
  password,
  province,
  adress,
  image,
  phoneNumber,
  seatsQTY,
  score
) => {
  try {
    let newTheater = await Theaters.create({
      name,
      CUIT,
      email,
      password,
      province,
      adress,
      image,
      phoneNumber,
      seatsQTY,
      score,
    });
    return newTheater;
  } catch (err) {
    console.error(err);
  }
};

const getAllTheaters = async () => await Theaters.findAll({
  
});

const getTheater = async (id) => {
  const theater = await Theaters.findOne({
    where: {
      id: id
    },
    include: {
      model: Shows
    }
  })
  return theater
}

module.exports = { postTheatersRegistration, getAllTheaters, getTheater };
