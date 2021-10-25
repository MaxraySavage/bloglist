const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('test blog api', () => {

    test('blogs are returned as json', async () => {
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
        console.log('hmm')
    })

    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(2)
    })

    test('the first blog has 2 likes', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].likes).toEqual(2)
    })

    afterAll(  async () => {
        await mongoose.connection.close()
    })
})