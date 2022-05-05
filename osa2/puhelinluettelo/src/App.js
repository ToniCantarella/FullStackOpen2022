import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const timeOut = 3000

  /* UseEffect to getting all units of the "database" on first render */
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  /* Add a new person on click with multiple conditions */
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    /* If an already existing person is attempted to be added with the same number, this sends out an alert to either add another person or to edit the number */
    if(persons.some(person => person.name.toUpperCase() === personObject.name.toUpperCase()) && persons.some(person => person.number === personObject.number)){
      console.log("on jo listassa")
      window.alert(`${personObject.name} is already in the phonebook with this number! Add a different name or give ${personObject.name} a new phonenumber.`)
    }

    /* If the name already exists, but is attempted to be added with a new number, this sends out a confirmation to either edit the number or to cancel */
    else if(persons.some(person => person.name.toUpperCase() === personObject.name.toUpperCase()) && !persons.some(person => person.number === personObject.number)){

      /* Editing the existing name to have a new number is done here */
      if(window.confirm(`${personObject.name} is already in the phonebook, replace the old number with a new one?`)){
        const personToUpdate = persons.find(person => person.name.toUpperCase() === personObject.name.toUpperCase())
        const newPersons = persons.map(person => {
          if(person.id === personToUpdate.id){
            return {...person, number: personObject.number}
          }
          return person
        })
        personService
          .update(personToUpdate.id, personObject)
          .then(response => {
            setPersons(newPersons)
            setNewName('')
            setNewNumber('')
          })
        console.log(personObject.name, ' updated')

        /* This renders a notification on update */
        setMessage(`Updated the number of ${personObject.name}!`)
        setTimeout(()=>{
        setMessage(null)
        }, timeOut)
      }
      else{
        console.log("No information was updated")
      }
    }

    /* Finally, if the information is not in the "database", the new person is added */
    else{
      console.log("ei ole listassa")
      personService
        .create(personObject)
        .then(response =>{
          console.log(response)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.message)
        })

      /* This renders a notification on add */
      setMessage(`${personObject.name} added to the phonebook!`)
      setTimeout(()=>{
        setMessage(null)
      }, timeOut)
    }
  }

  const deletePerson = (person) => {
    const deletedPerson = person.name
    if(window.confirm(`Delete ${person.name}?`)){
      console.log(person.id, " deleted")
      personService
        .remove(person.id)
        .then(response =>{
          console.log(response)
          setPersons(persons.filter(person => person.name !== deletedPerson))
        }) 

      /* This renders a notification on delete */
      setMessage(`${deletedPerson} deleted from the phonebook!`)
      setTimeout(()=>{
        setMessage(null)
      }, timeOut)
    } 
    else{
      console.log("Nothing deleted")
    }
  }

  /* Changes the state of the newName every time name input is changed */
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  /* Changes the state of the newNumber every time number input is changed */
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  /* Changes the state of the filter every time filter input is changed */
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  /* Checks if the filters length is above zero and returns an appropriate array of persons from the "database" to render on screen */
  const personsToShow = filter.length === 0
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <h2>Add new information</h2>
      <Notification message={message} />
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )

}

export default App