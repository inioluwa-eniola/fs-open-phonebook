import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import people from "./services/people";
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({ status: null, type: 'success', style:{} })

  const successMessageStyle = {
    color: 'green',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const failureMessageStyle = {
    color: 'red',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  useEffect(() => {
    people
      .getAll()
      .then((initialPeople) => {
      setPersons(initialPeople);
    })
    .catch(error => {
      console.log(error)
      setMessage({...message, status: `There is an error and the operation does not succeed` } )
    });
  }, [persons]);

  function addPerson(event) {
    event.preventDefault();

    const nameExists = persons
      .some((person) => person.name === newName)

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (!nameExists) {
      people.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage({ ...message, status:`Added ${returnedPerson.name}`, style: successMessageStyle })
        setTimeout(() => setMessage({ ...message, status: null}), 5000)
      });
    }

    setNewName("");
    setNewNumber("");

    if (nameExists && newNumber) {
      const existingPerson = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase(),
      );
      const id = existingPerson.id;
      const changedPerson = { ...existingPerson, number: `${newNumber}` };

      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`,
        )
      ) {
        people.update(id, changedPerson).then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === id ? returnedPerson : person,
            ),
          )
          setMessage({ ...message, status: `Information of ${newName} has been updated`, style: successMessageStyle});
          setTimeout(() => setMessage({ ...message, status: null}), 5000)
        });
      }
    }
    return;
  }

  function handleFilter(event) {
    setFilter(event.target.value);
  }

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  function handleDelete(id, name) {
    if (window.confirm(`Delete ${name}?`)) {
      people.remove(id);
      setMessage({ ...message, status: `INformation of ${name} has been removed from server`, style: failureMessageStyle})
      setTimeout(() => setMessage({ ...message, status: null}), 5000)
    } 
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={message}
      />
      <Filter filter={filter} handleFilter={handleFilter} />

      <h2>add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
