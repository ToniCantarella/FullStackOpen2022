import { useState } from 'react'
import './App.css'

const Button = ({ handleClick, text}) => {
  return(
    <button onClick={ handleClick }>
      { text }
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr className={`${text}`}>
      <td>{text}: </td>
      <td>{value} </td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, totalFeedback, average, positivePercentage}) =>{
  if(totalFeedback === 0){
    return(
      <p>Palautetta ei ole vielä annettu</p>
    )
  }

  return(
    <table>
      <thead>
        <tr>
          <th>Tilastot:</th>
        </tr>
      </thead>
      <tbody>
          <StatisticLine text='Hyvä' value={good}/>
          <StatisticLine text='Neutraali' value={neutral} />
          <StatisticLine text='Huono' value={bad} />
          <tr>
            <td>&nbsp;</td>
          </tr>
          <StatisticLine text='Yhteensä' value={totalFeedback} />
          <StatisticLine text='Keskiarvo' value={average} />
          <StatisticLine text='Positiivisten prosenttiosuus' value={positivePercentage} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })
  const good = feedback.good;
  const neutral = feedback.neutral;
  const bad = feedback.bad;
  const totalFeedback = good + neutral + bad;
  const average = (good - bad) / totalFeedback;
  const positivePercentage = `${(good * 100) / (totalFeedback)}%`;

  const increaseGoodFeedback = () => {
    setFeedback({...feedback, good: feedback.good + 1});
  }
  const increaseNeutralFeedback = () => {
    setFeedback({...feedback, neutral: feedback.neutral + 1});
  }
  const increaseBadFeedback = () => {
    setFeedback({...feedback, bad: feedback.bad + 1});
  }

  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button handleClick={increaseGoodFeedback} text={'Hyvä'}/>
      <Button handleClick={increaseNeutralFeedback} text={'Neutraali'}/>
      <Button handleClick={increaseBadFeedback} text={'Huono'}/>
      <Statistics good={good} neutral={neutral} bad={bad} totalFeedback={totalFeedback} average={average} positivePercentage={positivePercentage}/>
    </div>
  )
}

export default App