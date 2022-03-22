import { useState } from 'react'

const Anecdote = ({text, anecdote, points}) =>{
  return(
    <>
      <h1>{text}</h1>
      <p>{anecdote}</p>
      <p>Tällä anekdootilla on {points} ääntä.</p>
    </>
  )
}

const Button = ({text, handleClick}) =>{
  return(
    <button onClick={handleClick}>
      {text}
    </button>
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
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const [mostPoints, setMostPoints] = useState(0)
  const [index, setIndex] = useState(0)

  const random = () =>{
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const vote = () =>{
    const copyArray = [...points]
    copyArray[selected]++
    setPoints(copyArray)
    for(let i = 0; i < copyArray.length; i++){
      if(mostPoints < copyArray[i]){
        setMostPoints(copyArray[i]) 
        setIndex(i)
      }
    }
  }

  return (
    <div>
      <Anecdote text='Päivän anekdootti' anecdote={anecdotes[selected]} points={points[selected]}/>
      <Button text={'Äänestä'} handleClick={vote}/>
      <Button text={'Seuraava anekdootti'} handleClick={random}/>
      <Anecdote text='Anekdootti, jolla on eniten ääniä' anecdote={anecdotes[index]} points={mostPoints}/>
    </div>
  )
}

export default App