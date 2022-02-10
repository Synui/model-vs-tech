const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all comments - /api/comments/
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'user_id',
            'post_id',
            'comment_text'
        ],
    })
        .then(commentInfo => res.json(commentInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET one comment - api/comments/(unique comment id)
router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_id',
            'user_id',
            'comment_text'
        ]
    })
        .then(commentInfo => {
            if (!commentInfo) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(commentInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST one comment - api/comments/
router.post('/', withAuth, (req, res) => {
    if (req.session) {
      Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id
      })
        .then(commentInfo => res.json(commentInfo))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  });

  // DELETE one comment - /api/comments/(unique id)
  router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(commentInfo => {
            if (!commentInfo) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports =  router;