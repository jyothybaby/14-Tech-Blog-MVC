//Info about route
// imports our user, post, and comment routes from the api folder

const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes')

//for signup and login
router.use('/users', userRoutes);
//for post
router.use('/posts', postRoutes);
//for comments
router.use('/comments',commentRoutes);


module.exports = router;