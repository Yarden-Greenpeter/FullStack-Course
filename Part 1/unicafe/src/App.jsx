import { useState } from 'react'

const Header = (props) => <h1>{props.title}</h1>

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}:</td><td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, total}) => {
  if(total == 0){
    return (
    <div>
      <Header title={'statistics'} />
      <div>No feedback given</div>
    </div>
    )
  }
  return (
      <div>
        <Header title={'statistics'} />
        <table>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='total' value={total} />
          <StatisticLine text='average' value={good-bad / total} />
          <StatisticLine text='positive' value={good / total} />
        </table>
      </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const increament = (setFunc, currentValue) => {
    console.log('new value: ', currentValue + 1)
    setFunc(currentValue + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <Header title={'give feedback'} />
      <Button onClick={() => increament(setBad, bad)} text='bad' />
      <Button onClick={() => increament(setNeutral, neutral)} text='neutral' />
      <Button onClick={() => increament(setGood, good)} text='good' />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App