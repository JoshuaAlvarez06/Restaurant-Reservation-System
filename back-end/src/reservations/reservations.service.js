const knex = require('../db/connection');

const list = (date) => {
  return knex('reservations')
    .where({ reservation_date: date })
    .whereNot('status', 'finished')
    .orderBy('reservation_time');
};

const create = (newReservation) => {
  return knex('reservations')
    .insert(newReservation, '*')
    .then((rows) => rows[0]);
};

const read = (reservationId) => {
  return knex('reservations').where({ reservation_id: reservationId }).first();
};

const updateStatus = (reservation_id, status) => {
  return knex('reservations')
    .where({ reservation_id })
    .update('status', status)
    .returning('*')
    .then((rows) => rows[0]);
};

const searchNum = (mobile_number) => {
  return knex('reservations')
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, '')}%`
    )
    .orderBy('reservation_date');
};

module.exports = {
  list,
  create,
  read,
  updateStatus,
  searchNum,
};
