// get total number of likes across all blogs in a list
const totalLikes = (blogs) => {
    return blogs.reduce((prev,current) => {
        return prev + current.likes
    },0)
}

// get blog in a list with most number of likes
const favoriteBlog = (blogs) => {
    return blogs.reduce((favorite, next) => {
        if(!favorite.likes || next.likes > favorite.likes) {
            return next
        }
        return favorite
    }, {})
}

// receives an array of blogs as a parameter and returns the author who has the largest amount of blogs
const mostBlogs = (blogs) => {
    const tally = {}
    return blogs.reduce((topAuthor, next) => {
        const { author } = next
        if(!tally[author]){
            tally[author] = 1
        } else {
            tally[author] = tally[author] + 1
        }
        if(!topAuthor.blogs || tally[author] > topAuthor.blogs) {
            return {
                author: author,
                blogs: tally[author]
            }
        }
        
        return topAuthor
    }, {})
}

// receives an array of blogs as a parameter and returns the author who has the largest amount of likes acorss all their blogs
const mostLikes = (blogs) => {
    const tally = {}
    return blogs.reduce((topAuthor, next) => {
        const { author } = next
        if(!tally[author]){
            tally[author] = next.likes
        } else {
            tally[author] = tally[author] + next.likes
        }
        if(!topAuthor.likes || tally[author] > topAuthor.likes) {
            return {
                author: author,
                likes: tally[author]
            }
        }
        
        return topAuthor
    }, {})
}
  
module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}