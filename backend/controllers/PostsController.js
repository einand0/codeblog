const Post = require('../models/Post')

//middlewares
const ObjectId = require('mongoose').Types.ObjectId
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')


module.exports = class PostsController {

    //create a post
    static async create(req, res) {

        const { title, content } = req.body
           
        //validations

        if (!title) {
            res.status(422).json({ message: "O título é obrigatório!" })
            return
        }

        if (!content) {
            res.status(422).json({ message: "O conteúdo é obrigatório!" })
            return
        }

        //get post maker

        const token = getToken(req)
        const user = await getUserByToken(token)

        //creating post object
        const post = new Post({
            title,
            content,
            user: {
                _id: user._id,
                name: user.name,
            }
        })

        try {

            const newPost = await post.save()
            res.status(201).json({
                message: "Post criado com sucesso!",
                newPost
            })

        } catch (error) {
            res.status(500).json({ message: error })
        }

    }

    //get all posts

    static async getAll(req, res) {

        const posts = await Post.find().sort("-createdAt")

        res.status(200).json({ posts: posts })

    }

    static async getAllUserPosts(req, res) {

        //get user from token
        const token = getToken(req)
        const user = await getUserByToken(token)

        const posts = await Post.find({ "user._id": user._id }).sort("-createdAt")

        res.status(200).json({
            posts
        })
    }

    static async getPostById(req, res) {

        const id = req.params.id

        //check if ID is valid
        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: "ID inválido!" })
            return
        }

        //check if post exists by ID
        const post = await Post.findOne({ _id: id })

        if (!post) {
            res.status(404).json({ message: "O post não existe!" })
            return
        }

        res.status(200).json({
            post: post
        })

    }


    static async removePostById(req, res) {

        const id = req.params.id

        //check if ID is valid
        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: "ID inválido!" })
            return
        }

        //check if post exists by ID
        const post = await Post.findOne({ _id: id })

        if (!post) {
            res.status(404).json({ message: "O post não existe!" })
            return
        }

        //check it logged user is post owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        if (post.user._id.toString() !== user._id.toString()) {
            res.status(422).json({ message: 'Houve um problema em processar a requisição!' })
            return
        }

        await Post.findByIdAndRemove(id)

        res.status(200).json({ message: "O post foi removido com sucesso!" })

    }

    static async updatePost(req, res) {

        const id = req.params.id
        const { title, content } = req.body

        const updatedData = {}

        //check if post exists
        const post = await Post.findOne({ _id: id })

        if (!post) {
            res.status(404).json({ message: "O post não existe!" })
            return
        }

        //check it logged user is post owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        if (post.user._id.toString() !== user._id.toString()) {
            res.status(422).json({ message: 'Houve um problema em processar a requisição!' })
            return
        }


        //validations

        if (!title) {
            res.status(422).json({ message: "O título é obrigatório!" })
            return
        } else {
            updatedData.title = title
        }

        if (!content) {
            res.status(422).json({ message: "O conteúdo é obrigatório!" })
            return
        } else {
            updatedData.content = content
        }

        await Post.findByIdAndUpdate(id, updatedData)

        res.status(200).json({ message: "Post atualizado com sucesso!" })

    }
}