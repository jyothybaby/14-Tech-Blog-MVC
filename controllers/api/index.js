//Info about route
const router = require('express').Router();
const userRoutes = require('./user-routes');
//const projectRoutes = require('./projectRoutes');

//for signup and login
router.use('/users', userRoutes);

//router.use('/projects', projectRoutes);

module.exports = router;