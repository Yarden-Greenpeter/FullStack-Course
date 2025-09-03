const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.length > 0 ? blogs.reduce(reducer, 0) : 0;
}

const isBlogArray = (array) => {
    if (!Array.isArray(array)) {
        return false;
    }

    return array.every(isBlog);
    }

/**
 * Validates if an object can be inferred as a blog from MongoDB
 * @param {any} obj - The object to validate
 * @returns {boolean} - True if object matches blog schema
 */
function isBlog(obj) {
    if (!obj || typeof obj !== 'object') {
      return false;
    }
  
    // Check required blog fields and types
    return (
      typeof obj.title === 'string' &&
      typeof obj.author === 'string' &&
      typeof obj.url === 'string' &&
      typeof obj.likes === 'number' &&
      // MongoDB fields (optional for new objects)
      (obj._id === undefined || typeof obj._id === 'string') &&
      (obj.__v === undefined || typeof obj.__v === 'number')
    );
}
  
const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null;
    }

    return blogs.reduce((fav, blog) => (blog.likes > fav.likes ? blog : fav), blogs[0]);
}

const mostBlogs = (blogs) => {
    if ( blogs.length === 0) {
        return null;
    }

    const authorCount = {};

    blogs.forEach(blog => {
        authorCount[blog.author] = (authorCount[blog.author] || 0) + 1;
    });

    let maxBlogs = 0;
    let prolificAuthor = null;

    for (const author in authorCount) {
        if (authorCount[author] > maxBlogs) {
            maxBlogs = authorCount[author];
            prolificAuthor = author;
        }
    }

    return { author: prolificAuthor, blogs: maxBlogs };
}

const mostLikes = (blogs) =>{
    if ( blogs.length === 0) {
        return null;
    }

    const authorLikes = {};

    blogs.forEach(blog => {
        authorLikes[blog.author] = (authorLikes[blog.author] || 0) + blog.likes;
    });

    let maxLikes = 0;
    let favoriteAuthor = null;

    for (const author in authorLikes) {
        if (authorLikes[author] > maxLikes) {
            maxLikes = authorLikes[author];
            favoriteAuthor = author;
        }
    }

    return { author: favoriteAuthor, likes: maxLikes };
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}