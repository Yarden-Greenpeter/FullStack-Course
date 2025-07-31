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
  
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const showNotification = (message, type = 'success') => {
    setNotificationMessage(message)
    setNotificationType(type)
    
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(null)
    }, 5000)
  }

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
    showNotification
  };

  const handleDelete = (person) => {
    const confirmed = window.confirm(`Delete ${person.name} ?`)
  
    if(confirmed){
      phonebook
        .remove(person.id)
        .then(
          removedPerson => {
            setPersons(persons.filter(p => p.id !== person.id))
            showNotification(`${person.name} was deleted`, 'success')
          }, 
          () => {
            console.log(`at handleDelete couldn't delete: ${person.name} identifier: ${person.id}`)
            showNotification(`Failed to delete ${person.name}`, 'error')
        })
        .catch(error => {
        console.log(`Error deleting person:`, error)
        if (error.response && error.response.status === 404) {
          setPersons(persons.filter(p => p.id !== person.id))
          showNotification(`${person.name} was already removed from server`, 'error')
        } else {
          showNotification(`Failed to delete ${person.name}`, 'error')
        }})
    } 
    else{
      console.log(`user decided not to delete: ${person.name} id-${person.id}`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
      
      <Input label="filter shown with" value={sub} set={setSub} />

      <h2>Add a new person</h2>

      <PersonForm  {...children}/>

      <h2>Numbers</h2>

      <Persons persons={persons} sub={sub} handleDelete={handleDelete}/>
    </div>
  )
}


export default App