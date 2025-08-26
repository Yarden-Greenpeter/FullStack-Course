require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

const Person = require('./modules/person')

//Logging---------------------------------------------------------------------------------------------------
const morgan = require('morgan')
app.use((req, res, next) => {
    if (req.method !== 'POST') {
      morgan('tiny')(req, res, next)
    } else {
      next()
    }
  })

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
  })
  
const postLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')
//----------------------------------------------------------------------------------------------------------


app.get('/api/phonebook', (req, res) => {
    Person.find({}).then( persons =>
         res.json(persons))
})

app.get('/info', (request, response) => {
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

    const contentsAmount = persons.length;
    
    response.send(`
        <p>Phonebook has info for ${contentsAmount} people</p>
        <p>${timestamp}</p>
    `)
})

app.get('/api/phonebook/:id', (req, res) => {
    Person.findById(req.params.id).then( person => {
        res.json(person)
    })
})

app.delete('/api/phonebook/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id).then(result => {
        res.status(204).end()
    })
    .catch(error => {
        console.log(error)
        res.status(400).send({ error: 'malformatted id' })
    })
})


app.post('/api/phonebook', postLogger, (req, res) => {
    const body = req.body;
    const newName = body.name;
    const newNumber = body.number;
  
    const person = new Person({
      name: newName,
      number: newNumber,
    })
  
    person.save().then(savedPerson => {
      res.json(savedPerson)
    })
})




const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})
