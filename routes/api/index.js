const router = require('express').Router();
const relativeRoutes = require('./relativeRoutes');

router.use('/relatives', relativeRoutes);

module.exports = router;
