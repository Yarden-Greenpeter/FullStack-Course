const Header = (props) => {
  console.log("Rendering Header component");

  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log("Rendering Contents component");

  return (
    <div>
      <Part title = {props.titles[0]} exercises = {props.exercises[0]}/>
      <Part title = {props.titles[1]} exercises = {props.exercises[1]}/>
      <Part title = {props.titles[2]} exercises = {props.exercises[2]}/>
    </div>
  )
}

const Part = (part) => {
  return (
    <div>
      <p>
        {part.title} {part.exercises}
      </p>
    </div>
  )
}

const Total = (props) => {
  console.log("Rendering Total component");

  return (
    <p>Number of exercises {props.count[0] + props.count[1] + props.count[2]}</p>
  )

}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content titles= {[part1, part2, part3]} exercises= {[exercises1, exercises2, exercises3]}/>
      <Total count= {[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

export default App