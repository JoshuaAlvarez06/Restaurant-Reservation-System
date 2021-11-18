const knex = require("../db/connection");

const list = (date) => {
  return knex("reservations")
    .where({ reservation_date: date })
    .orderBy("reservation_time");
};

// const listWithQuery = (date) => {
//   return knex("reservations")
//     .where({ reservation_date: date })
//     .orderBy("reservation_time");
// };

const create = (newReservation) => {
  return knex("reservations")
    .insert(newReservation, "*")
    .then((rows) => rows[0]);
};

module.exports = {
  list,
  create,
};
