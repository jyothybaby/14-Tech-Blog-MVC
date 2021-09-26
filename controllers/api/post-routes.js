const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      const dbPostData = await Post.findAll({
//         where: {
//           user_id :req.session.user_id
//    },
   
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
  
      res.render('dashboard', {posts, loggedIn: req.session.loggedIn,});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  //Creating a new post

  router.post('/', withAuth, async (req, res) =>{
      try {
        const dbPostData = await Post.create({
           title: req.body.title, 
           content: req.body.content,
           user_id :req.session.user_id,
        })
        res.status(200).json(dbPostData)
      }catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
  })

  module.exports = router;