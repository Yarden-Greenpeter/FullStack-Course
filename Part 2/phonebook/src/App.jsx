import { useState } from 'react'

const Input = ({label, value, set}) => {
  const handleNoteChange = event => {
    set(event.target.value);
  };
  return (
  <div>
    {label}: <input 
          value={value}
          onChange={(event) => handleNoteChange(event)}/>
  </div>
  )
}

const PersonForm = ({persons, setPersons,newName, setName,newNumber, setNumber, id, setID,}) => {
  const addPerson =(event) => {
    event.preventDefault()
    console.log(newName, " ", newNumber)

    const isNew = (person) => {
      return (
        (persons.find(person => person.name === newName || person.number === newNumber) === undefined) &&
        (person.number != '' && person.name != '')
      )
    }

    const person = {name : newName, number : newNumber, id: id}
    if(isNew(person)){
      setPersons(persons.concat(person))
      setName('')
      setNumber('')
      setID(id+1)
    } else{
      const msg = `${newName} - ${newNumber} is already added to phonebook or invalid`
      alert(msg);
    }

  }

  return (
    <form onSubmit={addPerson}>
      <Input label={'name'} value={newName} set={setName}/>
      <Input label={'number'} value={newNumber} set={setNumber} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const PersonRow = ({person}) => <li>{person.name} - {person.number}</li> 

const Persons = ({persons, sub}) => {
  return (
    persons
      .filter(person => person.name.toLowerCase().includes(sub.toLowerCase()))
        .map(person => <PersonRow key={person.id} person={person} />)
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Yarden Greenpeter' , number: '054-8315145', id: 0 },
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setName] = useState('');
  const [newNumber, setNumber] = useState('');
  const [id, setID] = useState(persons.length+1);
  const [sub, setSub] = useState('')

  const children = {
    persons, setPersons,
    newName, setName,
    newNumber, setNumber,
    id, setID,
  };
  return (
    <div>
      <h2>Phonebook</h2>

      <Input label="filter shown with" value={sub} set={setSub} />

      <h2>Add a new person</h2>

      <PersonForm  {...children}/>

      <h2>Numbers</h2>

      <Persons persons={persons} sub={sub} />
    </div>
  )
}

export default App