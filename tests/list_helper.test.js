const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')


const emptyList = []

describe('total likes', () =>{

    test('empty list returns zero', () => {

        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
    })

    test('singleton list returns likes value of sole element', () => {

        const result = listHelper.totalLikes(helper.oneBlogList)
        expect(result).toBe(5)
    })

    test('list with multiple elements returns correct value', () => {

        const result = listHelper.totalLikes(helper.multipleBlogList)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () =>{

    test('empty list returns empty object', () => {

        const result = listHelper.favoriteBlog(emptyList)
        expect(result).toEqual({})
    })

    test('singleton list returns sole element', () => {

        const result = listHelper.favoriteBlog(helper.oneBlogList)
        expect(result).toBe(helper.oneBlogList[0])
    })

    test('list with multiple elements returns correct blog', () => {
        const expectedFavoriteBlog = {
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        }
        const result = listHelper.favoriteBlog(helper.multipleBlogList)
        expect(result).toEqual(expectedFavoriteBlog)
    })
})

describe('author with most blogs', () =>{

    test('empty list returns empty object', () => {

        const result = listHelper.mostBlogs(emptyList)
        expect(result).toEqual({})
    })

    test('singleton list returns sole element', () => {
        const expectedTopAuthor = {
            author: 'Edsger W. Dijkstra',
            blogs: 1
        }
        const result = listHelper.mostBlogs(helper.oneBlogList)
        expect(result).toEqual(expectedTopAuthor)
    })

    test('list with multiple elements returns correct blog', () => {
        const expectedTopAuthor = {
            author: 'Robert C. Martin',
            blogs: 3
        }
        const result = listHelper.mostBlogs(helper.multipleBlogList)
        expect(result).toEqual(expectedTopAuthor)
    })
})


describe('author with most likes', () =>{

    test('empty list returns empty object', () => {

        const result = listHelper.mostLikes(emptyList)
        expect(result).toEqual({})
    })

    test('singleton list returns sole element', () => {
        const expectedTopAuthor = {
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
        const result = listHelper.mostLikes(helper.oneBlogList)
        expect(result).toEqual(expectedTopAuthor)
    })

    test('list with multiple elements returns correct blog', () => {
        const expectedTopAuthor = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        }
        const result = listHelper.mostLikes(helper.multipleBlogList)
        expect(result).toEqual(expectedTopAuthor)
    })
})