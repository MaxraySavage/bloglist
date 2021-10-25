const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const { application } = require('express')

beforeEach(async () => {
    await Blog.deleteMany({})

    for(const blog of helper.multipleBlogList) {
        const blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('test blog api get requests', () => {

    test('blogs are returned as json', async () => {
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    })

    test('db contains correct number of blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.multipleBlogList.length)
    })

    test('the first blog in list contains correct number of likes', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].likes).toEqual(helper.multipleBlogList[0].likes)
    })    
})

describe('test blog api put', () => {

    test('a valid blog can be added', async () => {
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


})

afterAll(  async () => {
    await mongoose.connection.close()
})