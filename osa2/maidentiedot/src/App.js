import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({ handleFilterChange }) => {
  return(
    <div>
      Find countries: <input onChange={handleFilterChange}/>
    </div>
  )
}

const Countries = ({ countriesToShow, handleClick }) => {
  if(countriesToShow.length > 10){
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }else if(countriesToShow.length === 1){
    const country = countriesToShow[0]
    const languages = Object.values(country.languages)
    return(
      <>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>area: {country.area}</p>
        <h3>Languages:</h3>
        <ul>
          {languages.map(language =>
            <li key={language}>{language}</li>
          )}
        </ul>
        <img src={country.flags.png} alt="flag"></img>
      </>
    )
  }
  else{
    return(
      <ul>
        {countriesToShow.map(country =>
          <li key={country.name.common}>{country.name.common} <button onClick={handleClick}>show</button></li>
        )}
      </ul>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response =>{
        setCountries(response.data)
      })
  })

  const countriesToShow = filter.length === 0
    ? countries
    : countries.filter(country => country.name.common.toUpperCase().includes(filter.toUpperCase()))

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleClick = (event) => {
    console.log(event.target.parentElement.innerText)
    const country = event.target.parentElement.innerText
    const newFilter = country.substring(0, country.length - 5)
    console.log(newFilter)
    setFilter(newFilter)
  }

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange}/>
      <Countries countriesToShow={countriesToShow} handleClick={handleClick}/>
    </div>
  );
}

export default App;
