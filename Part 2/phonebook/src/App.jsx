import { useState, useEffect } from 'react'
import phonebook from './services/phonebook';
import Input from './components/Input';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setName] = useState('');
  const [newNumber, setNumber] = useState('');
  const [sub, setSub] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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
    setErrorMessage
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
      <Notification message={errorMessage} />
      
      <Input label="filter shown with" value={sub} set={setSub} />

      <h2>Add a new person</h2>

      <PersonForm  {...children}/>

      <h2>Numbers</h2>

      <Persons persons={persons} sub={sub} handleDelete={handleDelete}/>
    </div>
  )
}


export default App