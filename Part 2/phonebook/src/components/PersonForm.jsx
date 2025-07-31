import Input from "./Input"
import phonebook from "../services/phonebook"

const PersonForm = ({persons, setPersons, newName, setName, newNumber, setNumber, setErrorMessage}) => {
  const updateNotification = (msg) => {
      setErrorMessage(msg)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }  
  
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
        updateNotification(`Added ${person.name}`)
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
          updateNotification(`Updated ${person.name} phone number to: ${person.number}`)
        }
      } else{
        updateNotification(`${newName} - ${newNumber} is already added to phonebook or invalid`);
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

export default PersonForm