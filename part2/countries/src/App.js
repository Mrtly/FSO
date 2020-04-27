import React, { useState, useEffect } from "react";
import axios from "axios";

import CountriesFilter from "./components/CountriesFilter";
import CountriesDetails from "./components/CountriesDetails";

const App = () => {
  const [countriesFilter, setCountriesFilter] = useState("");
  const [countries, setCountries] = useState([]);

  const filteredCountries = countriesFilter
    ? countries.filter(
        country =>
          country.name.toLowerCase().search(countriesFilter.toLowerCase()) !==
          -1
      )
    : countries;

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleCountriesFilterChange = event => {
    setCountriesFilter(event.target.value);
  };

  const changeCountriesFilter = filter => {
    setCountriesFilter(filter);
  };

  return (
    <div className="App">
      <h2>data for countries</h2>
      <CountriesFilter
        value={countriesFilter}
        onChange={handleCountriesFilterChange}
      />
      <CountriesDetails
        countries={filteredCountries}
        changeFilter={changeCountriesFilter}
      />
    </div>
  );
};

export default App;
