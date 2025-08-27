const morgan = require('morgan')

// Custom token for request body
morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

// Custom POST logger
const postLoggerFormat = ':method :url :status :res[content-length] - :response-time ms :body'

// Conditional logger middleware
const logger = (req, res, next) => {
    if (req.method !== 'POST') {
        morgan('tiny')(req, res, next)
    } else if(req.method === 'POST' ) {
        morgan(postLoggerFormat)(req, res, next)
    } else{
        next()
    }
}

module.exports = logger