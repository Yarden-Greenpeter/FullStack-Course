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
      {props.parts.map((part, index) => {
        console.log(`Rendering part ${index}:`, part);
        return <Part key={index} part={part} />;
      })}
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  )
}

const Total = (props) => {
  console.log("Rendering Total component");
  const totalExercises = props.parts.reduce((sum, part)=> part.exercises + sum, 0);

  return (
    <p>Number of exercises {totalExercises}</p>
  )

}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header name = {course.name} />
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
}

export default App