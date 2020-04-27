import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
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
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons([
      ...persons,
      { name: newName.trim(), number: newNumber.trim() }
    ]);
    setNewName("");
    setNewNumber("");
  };

  const personsToShow = filterName
    ? persons.filter(
        person =>
          person.name.toLowerCase().search(filterName.toLowerCase()) != -1
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} onChange={handleFilterNameChange} />

      <PersonForm
        onSubmit={handleNewPersonSubmit}
        name={newName}
        number={newNumber}
        onNameChange={handleNewNameChange}
        onNumberChange={handleNewNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
