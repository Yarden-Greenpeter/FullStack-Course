const Header = (props) => {
    return (
      <h1>{props.content}</h1>
    )}
    
const Content = (props) => (
    <div>
    {props.parts
        .map(part => 
        <Part key={part.id} part={part} />
        )
    }
    </div>
)

const Part = (props) => (
    <p>
    {props.part.name} {props.part.exercises}
    </p>
)

const Total = ({course}) => (
    <b>
    Number of exercises {
        course.parts
        .reduce((sum, part) =>
            sum + part.exercises, 0
        )
    }
    </b>
)

const Course = ({course}) => {
    return (
    <div>
        <Header content={course.name} />
        <Content parts={course.parts} />
        <Total course={course} />
    </div>
    )
}

export default Course;