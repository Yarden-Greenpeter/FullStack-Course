const Note = ({ note, toggleImportance }) => {
    const label = note.importent
      ? 'make not important' 
      : 'make important'

    return (
      <li className="note"> 
        {note.content}
        <button onClick={toggleImportance}>{label} </button>
      </li>
  )}
  
  export default Note