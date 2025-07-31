
const Persons = ({persons, sub, handleDelete}) => {
    return (
      persons
        .filter(person => person.name.toLowerCase().includes(sub.toLowerCase()))
          .map(person => <PersonRow key={person.id} person={person} handleDelete={handleDelete} />)
    )
  }

const PersonRow = ({person , handleDelete}) => {
return (
<li>
    {person.name}  {person.number}
    <button onClick={() => handleDelete(person)}>delete</button>
</li> 
)}

export default Persons