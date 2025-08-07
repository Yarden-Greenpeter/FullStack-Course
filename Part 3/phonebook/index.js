const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

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
  
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
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

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id);

    if(person){
        res.status(200).json(person)
    } else {
        res.status(404).json({error: `invalid content id: ${id}`})
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(p => p.id != id);

    res.status(204).end();
})

const generateId = () =>{
    return Math.floor(Math.random() * (25000)) + 1
}

app.post('/api/persons', postLogger, (req, res) => {
    const body = req.body;
    const newName = body.name;
    const newNumber = body.number;

    if (!newName || newName === '') {
        return res.status(400).json({
            error: 'Name is required'
        });
    }
    if (!newNumber || newNumber === '') {
        return res.status(400).json({
            error: 'Phone number is required'
        });
    }
    if (persons.find(p => p.name === newName)) {
        return res.status(409).json({
            error: 'Name must be unique'
        });
    }
    if (persons.find(p => p.number === newNumber)) {
        return res.status(409).json({
            error: 'Phone number must be unique'
        });
    }

    const person = {
        id: generateId(),
        name: newName,
        number: newNumber
    }

    persons = persons.concat(person);

    res.status(201).json(person);

})




const PORT = 3001
app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})
