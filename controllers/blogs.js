const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const {authenticateToken} = require('../utils/middleware')


blogsRouter.get('/', authenticateToken, async(request, response) => {
    const user = await User.findById(request.user.id)
    const blogs = await Blog.find({user: user.id})
    response.json(blogs)
})
  

blogsRouter.post('/', authenticateToken, async (request, response) => {
    const body = request.body
    const user = await User.findById(request.user.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', authenticateToken, async (request, response) => {
    const user = await User.findById(request.user.id)
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user.id) {
        await Blog.findByIdAndRemove(request.params.id)
        return response.status(204).end()
    } else {
        return response.status(401).json({ error: 'operation not authorized' })
    }
    
    
})

blogsRouter.put('/:id', authenticateToken, async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true})
    response.json(updatedBlog)
})

module.exports = blogsRouter
