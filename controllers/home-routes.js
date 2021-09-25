// This is for all home page calls like initial home page display, login and logout

const router = require('express').Router();
const { Comment, Post, User } = require('../models');

router.get('/', async (req, res) => {
    try {
      const dbPostData = await Post.findAll({
        include: [
            {
              model: Post,
              attributes: ['id', 'title', 'content'],
            },
          ],
          include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'content'],
            },
          ],
          include: [
            {
              model: User,
              attributes: ['username'],
            },
          ]
      
      });
  
      const posts = dbPostData.map((post) =>
        post.get({ plain: true })
      );
  
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


  // if login button is clicked, redirect to login handlebars page
// if on route and user is logged in, redirect to home page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/sign-up', (req, res) => {
    res.render('sign-up');
});
module.exports = router;