const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    for(const blog of helper.multipleBlogList) {
        const blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('when there are some blogs in the database', () => {

    test('blogs are returned as json', async () => {
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.multipleBlogList.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].likes).toEqual(helper.multipleBlogList[0].likes)
    })    

    test('blogs are returned with id property not _id', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()

        expect(response.body[0]._id).not.toBeDefined()
    })
})

describe('addition of a new blog', () => {

    test('succeeds with valid data', async () => {
        const newBlog = {
            title: 'I love to dream',
            author: 'Genji',
            url: 'www.example.com',
            likes: 132,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.multipleBlogList.length + 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).toContain(newBlog.title)
    })

    test('sets likes to 0 by default', async () => {
        const newBlog = {
            title: 'I love to dream',
            author: 'Genji',
            url: 'www.example.com',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const addedBlog = blogsAtEnd.find(blog => blog.author === 'Genji')
        expect(addedBlog.likes).toEqual(0)
    })

    test('fails with status code 400 if data invaild', async () => {
        const missingTitle = {
            author: 'Genji',
            url: 'www.example.com',
            likes: 132,
        }

        const missingUrl = {
            title: 'I love to dream',
            author: 'Genji',
            likes: 132,
        }

        await api
            .post('/api/blogs')
            .send(missingTitle)
            .expect(400)

        await api
            .post('/api/blogs')
            .send(missingUrl)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.multipleBlogList.length)
    })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
    
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
    
        const blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(
            helper.multipleBlogList.length - 1
        )
    
        const contents = blogsAtEnd.map(r => r.title)
    
        expect(contents).not.toContain(blogToDelete.title)
    })
})

describe('updating a blog', () => {
    test('succeeds if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToChange = blogsAtStart[0]
        blogToChange.likes = blogToChange.likes + 1

        await api
            .put(`/api/blogs/${blogToChange.id}`)
            .send(blogToChange)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        const changedBlog = blogsAtEnd.find(blog => blog.id === blogToChange.id)
        expect(changedBlog.likes).toEqual(blogToChange.likes)
    })
})

afterAll(  async () => {
    await mongoose.connection.close()
})