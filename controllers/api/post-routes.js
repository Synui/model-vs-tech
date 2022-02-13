const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all posts - /api/posts
router.get('/', (req, res) => {
    Post.findAll({
        order: [['created_at', 'DESC']],
        attributes: [
            'id',
            'title',
            'content',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id', 
                    'comment_text', 
                    'post_id', 
                    'user_id', 
                    'created_at'
                ],
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
        .then(postInfo => res.json(postInfo))
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
            'title',
            'content',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id', 
                    'comment_text', 
                    'post_id', 
                    'user_id', 
                    'created_at'],
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
        .then(postInfo => {
            if (!postInfo) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(postInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST one post - /api/posts/
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
      })
        .then(postInfo => res.json(postInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT update one post info - /api/posts/(unique post id)
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(postInfo => {
            if (!postInfo) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(postInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(postInfo => {
            if (!postInfo) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(postInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports =  router;