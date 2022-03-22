import { useState } from "react";

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello { name }, you are { age } years old      
      </p>
      <p>
        So you were probably born in {bornYear()}
      </p>
    </div>
  )
}

const Display = (props) => {
  return (
    <div>
      {props.message}
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const History = (props) => {
  if(props.allClicks.length === 0){
    return(
      <div>
        Paina nappeja nähdäksesi painallushistoriasi:
      </div>
    )
  }
  return(
    <>
      Nappeja painettu: {props.allClicks.join(' ')}
    </>
  )
}

const App = (props) => {
  const [counter, setCounter] = useState(0);
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  });
  const [allClicks, setAll] = useState([])
  const nimi = 'Pekka';
  const ika = 10;
  let zero = false;

  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const reset = () => {
    setCounter(0);
    zero = true;
  }

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    setClicks({...clicks, left: clicks.left + 1});
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setClicks({...clicks, right: clicks.right + 1});
  }

  return (
    <div>
      <div>
        <Display message={clicks.left}/>
          <Button handleClick={handleLeftClick} text={'Vasemmalle'}/>
          <Button handleClick={handleRightClick} text={'Oikealle'}/>
        <Display message={clicks.right}/>
      </div>
      <History allClicks={allClicks}/>
      <Display message={ counter }/>
      <Button handleClick={ increaseByOne } text={ 'Lisää numero' }/>
      <Button handleClick={ decreaseByOne } text={ 'Vähennä numero' }/>
      <Button handleClick={ reset } text={'Nollaa'}/>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />      
      <Hello name={nimi} age={ika} />    
    </div>
  )
}

export default App