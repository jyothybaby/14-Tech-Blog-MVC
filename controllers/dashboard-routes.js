const router = require('express').Router();
const {Comment, Post, User  } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

router.get('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },

      attributes: [
        'id',
        'title',
        'content',
        'created_at'
      ],
      include: [{
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      },

      ]
    });


    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render('dashboard', { posts, loggedIn: req.session.loggedIn, });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

  router.get('/new', (req, res) => {
    res.render('add-post');
});



// when a user clicks on a specific id, make sure they are logged in
router.get('/edit/:id', withAuth, async (req, res) =>{
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id
      },

      attributes: [
        'id',
        'title',
        'content',
        'created_at'
      ],
      include: [{
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      },

      ]
    });
    const posts = dbPostData.get({ plain: true });
    console.log(posts);
    res.render('edit-post', { posts, loggedIn: req.session.loggedIn, });
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;
