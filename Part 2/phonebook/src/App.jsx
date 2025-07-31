import { useState, useEffect } from 'react'
import phonebook from './services/phonebook';

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

const PersonForm = ({persons, setPersons, newName, setName, newNumber, setNumber}) => {
  const addPerson =(event) => {
    event.preventDefault()
    console.log(newName, " ", newNumber)

    const isNewName = () => (persons.find(p => p.name === newName) === undefined)

    const isNewNumber = () => (persons.find(p => p.number === newNumber) === undefined)

    const isValidDetails = (person) => (person.number != '' && person.name != '')

    const isNew = (person) => {
      return (
        isValidDetails(person) && isNewName() && isNewNumber()
      )
    }
    const isFamilier = (person) => {
      return (isValidDetails(person) && !isNewName() && isNewNumber())
    }
    const person = {
      name : newName, 
      number : newNumber
    }

    if(isNew(person)){
      phonebook
        .create(person)
        .then( returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setName('')
          setNumber('')
        })
    } else if(isFamilier(person)){
      const existingPerson = persons.find(p => p.name === newName) // Get the existing person with ID
      const confirmed = window.confirm(`Update ${existingPerson.name}'s number from ${existingPerson.number} to ${newNumber}?`)
      
      if(confirmed) {
        phonebook
          .update(existingPerson.id, {...existingPerson, number: newNumber}) // Use the ID from persons list
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id === existingPerson.id ? updatedPerson : p))
            setName('')
            setNumber('')
          })
      }
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
  )}

const PersonRow = ({person , handleDelete}) => {
  return (
  <li>
    {person.name}  {person.number}
    <button onClick={() => handleDelete(person)}>delete</button>
  </li> 
)}

const Persons = ({persons, sub, handleDelete}) => {
  return (
    persons
      .filter(person => person.name.toLowerCase().includes(sub.toLowerCase()))
        .map(person => <PersonRow key={person.id} person={person} handleDelete={handleDelete} />)
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setName] = useState('');
  const [newNumber, setNumber] = useState('');
  const [sub, setSub] = useState('')

  useEffect (() => {
      phonebook
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const children = {
    persons, setPersons,
    newName, setName,
    newNumber, setNumber,
  };

  const handleDelete = (person) => {
    const confirmed = window.confirm(`Delete ${person.name} ?`)
  
    if(confirmed){
      phonebook
        .remove(person.id)
        .then(
          removedPerson => setPersons(persons.filter(p => p.id !== person.id)), 
          () => console.log(`at handleDelete couldn't delete: ${person.name} identifier: ${person.id}`)
      )
    }
    else{
      console.log(`user decided not to delete: ${person.name} id-${person.id}`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Input label="filter shown with" value={sub} set={setSub} />

      <h2>Add a new person</h2>

      <PersonForm  {...children}/>

      <h2>Numbers</h2>

      <Persons persons={persons} sub={sub} handleDelete={handleDelete}/>
    </div>
  )
}


export default App