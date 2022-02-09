const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
// const withAuth = require('../../utils/auth');

// GET all posts - /api/posts
router.get('/', (req, res) => {
    Post.findAll({
        order: [['created_at', 'DESC']],
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
        ],
        include: [
            {
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
            }
        ]
    })
        .then(PostInfo => res.json(PostInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET one posts - /api/posts/(unique post id)
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
        ],
        include: [
            {
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
            }
        ]
    })
        .then(PostInfo => {
            if (!PostInfo) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(PostInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST one post - /api/posts/
router.post('/', (req, res) => {
    Post.create({
        post_url: req.body.post_url,
        title: req.body.title,
        user_id: req.session.user_id
      })
        .then(PostInfo => res.json(PostInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT update one post info - /api/posts/(unique post id)
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title,
            post_url: req.body.post_url,
            user_id: req.body.user_id
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(PostInfo => {
            if (!PostInfo) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(PostInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(PostInfo => {
            if (!PostInfo) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(PostInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports =  router;