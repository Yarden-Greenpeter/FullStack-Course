import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = (props) => <button onClick={props.onClick}> {props.text}</button>

const AnecdoteOfTheDay = ({anecdotes, selected, setSelected, votes, onVote, setVotes}) => {
  return (
    <div>
      <Header text={'Anecdote Of The Day'} />
      <div> {anecdotes[selected]} </div>
      <div>has {votes[selected] || 0} votes</div>
      <Button onClick={() => {onVote(selected)}} text={'vote'} />
      <Button onClick = {() => setSelected(Math.floor(Math.random() * anecdotes.length))} text={'next anecdot'} />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [votes, setVotes] = useState({});
  const [populerAnecdote, setPopulerAnecdote] = useState([0, 0])

  const onVote = (key) => {
    setVotes(prev => {
      const newValue = (prev[key] || 0) + 1;
      console.log(`Key ${key} was incremented to ${newValue}`);
      if(newValue > populerAnecdote[1]) setPopulerAnecdote(prev => [key, newValue]);
      return {
        ...prev,
        [key]: newValue
      };
    });
  };

  return (
    <div>
      <AnecdoteOfTheDay anecdotes={anecdotes} 
                        selected={selected} 
                        setSelected={setSelected} 
                        votes={votes} 
                        onVote={onVote} 
                        setVotes={setVotes} />
        
      <Header text={'Anecdote with most Votes'} />
      <div> {anecdotes[populerAnecdote[0]]} </div>
      <div>has {votes[populerAnecdote[0]]} votes</div>

    </div>
  )
}

export default App