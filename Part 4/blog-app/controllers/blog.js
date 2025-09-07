const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
    })

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
    })

blogRouter.delete('/:id', async (request, response) => {
    const result = await Blog.findByIdAndDelete(request.params.id)
    if (result) {
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    if (!blog.title || !blog.url) {
        return response.status(400).json({ error: 'title or url missing' })
    }

    const result = await blog.save()
    response.status(201).json(result)
    
    })

blogRouter.put('/:id', async (request, response) => {
    const resualt = await Blog.findByIdAndUpdate( 
        request.params.id, 
        request.body,
        { new: true, runValidators: true })

    if (resualt) {
        response.status(200).json(resualt)
    } else {
        response.status(404).end()
    }
    
})
module.exports = blogRouter