const Persons = ({ personsToShow, deletePerson }) => {
    return (
      <ul>
        {personsToShow.map(person =>
          <li key={person.id}>{person.name}<p>{person.number}</p><button onClick={() => deletePerson(person)} className="delete">delete</button></li>
        )}
      </ul>
    )
}

export default Persons