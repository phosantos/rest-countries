import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = React.useState(null);
  const [filter, setFilter] = React.useState('All');
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    document.title = 'REST Countries';
    (async () => {
      try {
        setLoading(true);
        const response = await fetch('https://restcountries.com/v3.1/all');
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="loading">
        <div></div>
      </div>
    );

  return (
    <section className="home">
      <div className="search-filter-wrapper">
        <form className="search">
          <ion-icon name="search" />
          <input
            type="text"
            placeholder="Search for a country..."
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
        </form>
        <form className="filter">
          <select
            value={filter}
            onChange={({ target }) => setFilter(target.value)}
          >
            <option value="All">Filter By Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </form>
      </div>

      <div className="countries">
        {data
          ?.filter((country) => {
            return (
              country.name.common.toLowerCase().includes(search) ||
              country.name.official.toLowerCase().includes(search) ||
              country.capital?.toString().toLowerCase().includes(search)
            );
          })
          .filter((country) => {
            if (filter === 'All') return country;
            else return country.region === filter;
          })
          .map((country) => {
            return (
              <Link
                key={country.cca3}
                to={'/country/' + country.cca3.toLowerCase()}
              >
                <div className="flag">
                  <img
                    src={country.flags.svg}
                    alt={country.name.common + ' Flag'}
                  />
                </div>
                <div className="text-wrapper">
                  <h2 className="name">{country.name.common}</h2>
                  <p>
                    <strong>Population:</strong> {country.population}
                  </p>
                  <p>
                    <strong>Region:</strong> {country.region}
                  </p>
                  <p>
                    <strong>Capital:</strong> {country.capital}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default Home;
