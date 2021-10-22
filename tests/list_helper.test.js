const listHelper = require('../utils/list_helper')

const emptyList = []
    
const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const listWitMultipleBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }  
]

describe('total likes', () =>{

    test('empty list returns zero', () => {

        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
    })

    test('singleton list returns likes value of sole element', () => {

        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('list with multiple elements returns correct value', () => {

        const result = listHelper.totalLikes(listWitMultipleBlogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () =>{

    test('empty list returns empty object', () => {

        const result = listHelper.favoriteBlog(emptyList)
        expect(result).toEqual({})
    })

    test('singleton list returns sole element', () => {

        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toBe(listWithOneBlog[0])
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
        const result = listHelper.favoriteBlog(listWitMultipleBlogs)
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
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual(expectedTopAuthor)
    })

    test('list with multiple elements returns correct blog', () => {
        const expectedTopAuthor = {
            author: 'Robert C. Martin',
            blogs: 3
        }
        const result = listHelper.mostBlogs(listWitMultipleBlogs)
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
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual(expectedTopAuthor)
    })

    test('list with multiple elements returns correct blog', () => {
        const expectedTopAuthor = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        }
        const result = listHelper.mostLikes(listWitMultipleBlogs)
        expect(result).toEqual(expectedTopAuthor)
    })
})