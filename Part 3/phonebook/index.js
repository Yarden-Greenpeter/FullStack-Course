require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

const Person = require('./modules/person')
const errorHandler = require('./middleware/errorHandler')
const logger = require('./middleware/logger')

app.use(logger)


app.get('/api/phonebook', (req, res, next) => {
    Person.find({})
        .then( persons =>
            res.json(persons))
        .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    const now = new Date()
    
    const timestamp = now.toLocaleString('en-GB', {
        weekday: 'short',
        year: 'numeric',
        month: 'short', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'longOffset'
    })

    Person.countDocuments({})
        .then(count => {
            response.send(`
                <p>Phonebook has info for ${count} people</p>
                <p>${timestamp}</p>
            `)
        })
        .catch(error => next(error))
})

app.get('/api/phonebook/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then( person => {
            if(person){
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/phonebook/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()})
        .catch(error => {next(error)})
})


app.post('/api/phonebook', (req, res, next) => {
    const body = req.body;
    const newName = body.name;
    const newNumber = body.number;
  
    const person = new Person({
      name: newName,
      number: newNumber,
    })
  
    person.save()
        .then(savedPerson => {
            res.json(savedPerson)})
        .catch(error => next(error))
})

app.put('/api/phonebook/:id', (req, res, next) => {
    const { name, number } = req.body

    Person.findByIdAndUpdate(
        req.params.id, 
        { name, number }, 
        { new: true, runValidators: true, context: 'query' }
    )
    .then(updatedPerson => {
        if (updatedPerson) {
            res.json(updatedPerson)
        } else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

app.use(unknownEndpoint)

//Keep as last middleware
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})
