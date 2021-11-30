/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require('express').Router();
const controller = require('./reservations.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router
  .route('/:reservationId/status')
  .get(controller.read)
  .put(controller.updateStatus)
  .all(methodNotAllowed);

router
  .route('/')
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router.route('/:reservationId').get(controller.read).all(methodNotAllowed);

module.exports = router;
