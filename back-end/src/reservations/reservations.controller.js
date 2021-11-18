const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
/**
 * List handler for reservation resources
 */

function validProperties(req, res, next) {
  const { data } = req.body;
  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  const timeFormat = /\d\d:\d\d/;

  const errors = [];

  if (!data) {
    return next({
      status: 400,
      message: "Data is missing",
    });
  }

  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = data;

  if (!first_name || first_name.trim() === "") {
    errors.push("first_name is missing or is empty");
  }

  if (!last_name || last_name.trim() === "") {
    errors.push("last_name is missing or is empty");
  }
  if (!mobile_number || mobile_number.trim() === "") {
    errors.push("mobile_number is missing or is empty");
  }

  if (
    !reservation_date ||
    reservation_date === "" ||
    !dateFormat.test(reservation_date)
  ) {
    errors.push("reservation_date is missing or is empty or is not a date");
  }

  if (
    !reservation_time ||
    reservation_time === "" ||
    !timeFormat.test(reservation_time)
  ) {
    errors.push("reservation_time is missing or is empty or is not a time");
  }

  if (!people || typeof 1 !== typeof people || people < 1) {
    errors.push("people is missing or is zero or is not a number");
  }

  if (errors.length) {
    return next({
      status: 400,
      message: errors.join(", "),
    });
  }

  next();
}

async function list(req, res) {
  const { date } = req.query;
  res.json({ data: await service.list(date) });
}

async function create(req, res) {
  const newReservation = req.body.data;
  const data = await service.create(newReservation);
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [validProperties, asyncErrorBoundary(create)],
};
