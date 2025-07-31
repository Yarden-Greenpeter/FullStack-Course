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

export default Input