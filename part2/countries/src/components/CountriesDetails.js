import React from "react";

const CountriesDetails = ({ countries, changeFilter }) => {
  switch (true) {
    case countries.length > 10: {
      return <p>type to specify the filter</p>;
    }
    case countries.length > 1 && countries.length < 10: {
      return (
        <div>
          {countries.map(country => {
            return (
              <div key={country.name}>
                <span>{country.name}</span>
                <button
                  onClick={() => {
                    changeFilter(country.name);
                  }}
                >
                  show
                </button>
              </div>
            );
          })}
        </div>
      );
    }
    case countries.length === 1: {
      return (
        <div>
          <h1>{countries[0].name}</h1>
          <p>capital: {countries[0].capital}</p>
          <p>population: {countries[0].population}</p>
          <p>
            languages:{" "}
            {countries[0].languages.map(lang => {
              return <span key={lang.name}>{lang.name}</span>;
            })}
          </p>

          <img src={countries[0].flag} width="150px" alt="flag" />
        </div>
      );
    }
    default:
      return null;
  }
};

export default CountriesDetails;
