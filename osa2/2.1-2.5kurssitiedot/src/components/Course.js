const Course = ({ courses }) => {
    return(
      <>
        {courses.map(course =>
        <div key={course.id}>
          <Header name={course.name}/>
          <Content parts={course.parts}/>
        </div>
        )}
      </>
    )
  }
  
  const Header = ({ name }) => {
    return(
      <h1>
        {name}
      </h1>
    )
  }
  
  const Content = ({ parts }) => {
    return(
      <>
        {parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises}/>
        )}
        <Total total={parts}/>
      </>
    )
  }
  
  const Total = ({ total }) =>{
    const tempArray = new Uint8Array(total.length)
    for(let i = 0; i < tempArray.length; i++){
      tempArray[i] = total[i].exercises
    }
    const totalExercises = tempArray.reduce((prevElement, currElement) => {
      return prevElement + currElement
    })
  
    return(
      <p style={{fontWeight: "900"}}>Total of {totalExercises} exercises</p>
    )
  }
  
  const Part = ({ name, exercises }) => {
    return(
      <p>{name} {exercises}</p>
    )
  }

  export default Course