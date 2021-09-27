const router = require('express').Router();

const { User, Comment, Post } = require('../../models');

const sequelize = require('../../config/connection');
// Users shouldn't post or update comments if they are not loggedIn
const withAuth = require('../../utils/auth');

// When a post/:id is viewed, make sure to include/display all its related comments
router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// Click into a specific comment
router.get('/:id', (req, res) => {
    Comment.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

//Creating a new comment
router.post('/', withAuth, async (req, res) =>{
    try {
      const dbCommentData = await Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
      })
      res.status(200).json(dbCommentData)
    }catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

//updating or replacing a comment

router.put('/:id', withAuth, async (req, res) => {
    try {
      const dbCommentData = await Comment.create({

        comment_text: req.body.comment_text,
      },
      {
        where: {
          id: req.params.id
      }
      }) 
      res.status(200).json(dbCommentData);
      
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // To delete a comment, click on button associated with the comment id
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
  



