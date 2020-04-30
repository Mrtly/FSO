import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    //move the axios call to personService
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNewNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterNameChange = event => {
    setFilterName(event.target.value);
  };

  const handleNewPersonSubmit = event => {
    event.preventDefault();
    const duplicatePersons = persons.filter(person => person.name === newName);
    if (duplicatePersons.length) {
      const personToUpdate = duplicatePersons[0];
      const replace = window.confirm(
        `${personToUpdate.name} is already on the list, do you wish to replace the number?`
      );
      if (replace) {
        personToUpdate.number = newNumber;
        personService.update(personToUpdate).then(data => {
          setPersons(
            persons.map(person => {
              return person.id === data.id ? data : person;
            })
          );
          setNotification(`Updated ${personToUpdate.name}'s number`);
        })
      }
    } else {
      const newPerson = {
        name: newName.trim(),
        number: newNumber.trim(),
        id: persons.length + 1
      };

      personService.create(newPerson).then(createdPerson => {
        setPersons([...persons, createdPerson]);
      });
      setNotification(`Added ${newName}`);
    }
    setNewName("");
    setNewNumber("");
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const personsToShow = filterName
    ? persons.filter(
      person =>
        person.name.toLowerCase().search(filterName.toLowerCase()) !== -1
    )
    : persons;

  return (
    <div>
      <h2>phonebook</h2>
      {notification ? <Notification message={notification} /> : null}

      <Filter value={filterName} onChange={handleFilterNameChange} />

      <h2>add new</h2>
      <PersonForm
        onSubmit={handleNewPersonSubmit}
        name={newName}
        number={newNumber}
        onNameChange={handleNewNameChange}
        onNumberChange={handleNewNumberChange}
      />

      <h2>numbers</h2>
      <Persons persons={personsToShow} setPersons={setPersons} />
    </div>
  );
};

export default App;
