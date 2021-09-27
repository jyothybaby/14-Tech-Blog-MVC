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


  

//updating or replacing a post

router.put('/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.update({
      title: req.body.title,
      content: req.body.content 
    },
    {
      where: {
        id: req.params.id
    }
    }) 
    res.status(200).json(dbPostData);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//for getting a specific post based on Id

router.get('/:id',withAuth, async (req, res)=> {
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
  console.log("from api/post/:id", posts);
  res.render('single-post', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//Deleting a post

router.delete('/:id', withAuth, (req, res) => {
  // Delete multiple instances, in this case just where the id has been selected. On a post/:id page, clicking the delete button will trigger the front end form that will ship a delete request back here
      Post.destroy({
          where: {
              id: req.params.id
          }
      }).then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
          res.json(dbPostData);
      }).catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
  });



    
  

  module.exports = router;

  