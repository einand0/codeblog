const router = require('express').Router()
const PostsController = require('../controllers/PostsController')

//midlewares
const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, PostsController.create)
router.get('/', PostsController.getAll)
router.get('/myposts', verifyToken, PostsController.getAllUserPosts)
router.get('/:id', PostsController.getPostById)
router.delete('/:id', verifyToken, PostsController.removePostById)
router.patch('/:id', verifyToken, PostsController.updatePost)

module.exports = router