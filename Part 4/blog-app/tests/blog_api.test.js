const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/blog_api_helper')

const api = supertest(app)

describe('Blog API Tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  after(async () => {
    await mongoose.connection.close()
  })

  describe('GET /api/blog', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blog')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blog')
    
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('unique identifier property of blog posts is named id', async () => {
      const response = await api.get('/api/blog')
    
      await Promise.all(
        response.body.map(async (blog) => {
          assert.ok(blog.id)
          assert.strictEqual(blog._id, undefined)
        })
      )
    })
  })

  describe('POST /api/blog', () => {
    test('creating a new blog increases total number of blogs by 1', async () => {
      const blogsAtStart = await Blog.find({})
    
      await api
        .post('/api/blog')
        .send(helper.newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const blogsAtEnd = await Blog.find({})
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)
    })
    
    test('newly created blog is saved correctly', async () => {
      const newBlog = helper.newBlog
      await api.post('/api/blog').send(newBlog)
    
      const blogs = await Blog.find({})
      const savedBlog = blogs.find(blog => blog.title === newBlog.title)

      assert.deepStrictEqual(savedBlog.toJSON(), {
        id: newBlog._id,
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        likes: newBlog.likes
      })
    })

    test('if likes property is missing, it defaults to 0', async () => {
      const blogWithoutLikes = helper.blogWithoutLikes

      const response = await api
        .post('/api/blog')
        .send(blogWithoutLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, 0)
    })

    describe('validation errors', () => {
      test('blog without title is not added', async () => {
        const blogWithoutTitle = helper.blogWithoutTitle

        const response = await api
          .post('/api/blog')
          .send(blogWithoutTitle)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.status, 400) 
      })

      test('blog without url is not added', async () => {
        const blogWithoutUrl = helper.blogWithoutUrl

        const response = await api
          .post('/api/blog')
          .send(blogWithoutUrl)
          .expect(400)
          .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.status, 400) 
      })
    })
  })

  describe('DELETE /api/blog/:id', () => {
    test('deleting a blog decreases total number of blogs by 1', async () => {
      const blogsAtStart = await Blog.find({})
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blog/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await Blog.find({})
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert.ok(!titles.includes(blogToDelete.title))
    })
  })

  describe('PUT /api/blog/:id', () => {
    test('updating a blog modifies its properties', async () => {
      const blogsAtStart = await Blog.find({})
      const blogToUpdate = blogsAtStart[0]
      
      const updatedData = {
        ...blogToUpdate.toObject(),
        likes: blogToUpdate.likes + 5
      }
      
      const response = await api
        .put(`/api/blog/${blogToUpdate.id}`)
        .send(updatedData)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.likes, updatedData.likes)
      assert.strictEqual(response.body.title, updatedData.title)
      assert.strictEqual(response.body.author, updatedData.author)
      assert.strictEqual(response.body.url, updatedData.url)
    })
  })
})