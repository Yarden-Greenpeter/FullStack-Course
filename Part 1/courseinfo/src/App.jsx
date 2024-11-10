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
      <Part name = {props.names[0]} exercises = {props.exercises[0]}/>
      <Part name = {props.names[1]} exercises = {props.exercises[1]}/>
      <Part name = {props.names[2]} exercises = {props.exercises[2]}/>
    </div>
  )
}

const Part = (part) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header name={course} />
      <Content names = {[part1.name, part2.name, part3.name]} exercises = {[part1.exercises, part2.exercises, part3.exercises]}/>
      <Total count= {[part1.exercises, part2.exercises, part3.exercises]}/>
    </div>
  )
}

export default App