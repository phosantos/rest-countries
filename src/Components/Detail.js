import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const Detail = () => {
  const { countryCode } = useParams();
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://restcountries.com/v3.1/alpha?codes=' + countryCode,
        );
        const json = await response.json();
        setData(json[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [countryCode]);

  React.useEffect(() => {
    if (data) document.title = data.name.common + ' | REST Countries';
  }, [data]);

  if (loading)
    return (
      <div className="loading">
        <div></div>
      </div>
    );

  return (
    <section className="detail">
      <button onClick={() => navigate(-1)} className="backBtn">
        <ion-icon name="arrow-back" /> Back
      </button>
      <div className="wrapper">
        <div className="flag">
          <img src={data?.flags.svg} alt={data?.name.common + ' Flag'} />
        </div>
        <div>
          <h1 className="name">{data?.name.common}</h1>
          <div className="details">
            <ul>
              <li>
                <strong>Native Name:</strong>{' '}
                {
                  data?.name.nativeName[Object.keys(data.name.nativeName)[0]]
                    .common
                }
              </li>
              <li>
                <strong>Population:</strong> {data?.population}
              </li>
              <li>
                <strong>Region:</strong> {data?.region}
              </li>
              <li>
                <strong>Sub Region:</strong> {data?.subregion}
              </li>
              <li>
                <strong>Capital:</strong> {data?.capital}
              </li>
            </ul>
            <ul>
              <li>
                <strong>Top Level Domain:</strong> {data?.tld}
              </li>
              <li>
                <strong>Currencies:</strong>{' '}
                {data &&
                  Object.keys(data.currencies).map(
                    (currencieKey, index, array) => {
                      if (index === array.length - 1) {
                        return (
                          <span key={currencieKey}>
                            {data.currencies[currencieKey].name}
                          </span>
                        );
                      }
                      return (
                        <span key={currencieKey}>
                          {data.currencies[currencieKey].name},{' '}
                        </span>
                      );
                    },
                  )}
              </li>
              <li>
                <strong>Languages: </strong>
                {data &&
                  Object.keys(data.languages).map(
                    (languageKey, index, array) => {
                      if (index === array.length - 1) {
                        return (
                          <span key={languageKey}>
                            {data.languages[languageKey]}
                          </span>
                        );
                      }
                      return (
                        <span key={languageKey}>
                          {data.languages[languageKey]},{' '}
                        </span>
                      );
                    },
                  )}
              </li>
            </ul>
          </div>

          {data?.borders && (
            <div className="border-countries">
              <p>Border Countries: </p>
              <div>
                {data.borders.map((border) => {
                  return (
                    <Link to={'/country/' + border.toLowerCase()} key={border}>
                      {border}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Detail;
