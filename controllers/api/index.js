//Info about route
// imports our user, post, and comment routes from the api folder

const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes')

//for signup and login
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
//router.use('/projects', projectRoutes);

module.exports = router;