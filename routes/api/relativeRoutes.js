const router = require('express').Router();
const relativesController = require('../../controllers/relativesController');

// match /api/relatives
router
  .route('/')
  .get(relativesController.findAll)
  .post(relativesController.saverelative);

// match /api/relatives/:id
router
  .route('/:id')
  .get(relativesController.findById)
  .delete(relativesController.deleterelative);

module.exports = router;
