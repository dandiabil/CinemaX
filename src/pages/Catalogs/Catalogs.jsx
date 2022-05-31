import React, { useEffect, useState } from "react";
import InputText from "../../components/InputText/InputText";
import NoPoster from "../../assets/img-unavailable.png";
import "./Catalogs.scss";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Catalogs = () => {
  const [title, setTitle] = useState("");
  const [lastTitle, setLastTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  const navigate = useNavigate();

  const pageNumber = Math.ceil(totalResults / 10) || 1;

  useEffect(() => {
    searchMovieChangePage();

    async function searchMovieChangePage() {
      await axios
        .get(
          `http://www.omdbapi.com/?apikey=7819d7f3&s=${lastTitle}&page=${currentPage}&type=movie`
        )
        .then((res) => {
          setSearchResults(res.data.Search);
        })
        .catch((err) => console.log(err));
    }
  }, [currentPage]);

  async function searchMovie(e) {
    e.preventDefault();
    if (!title) return;

    await axios
      .get(
        `http://www.omdbapi.com/?apikey=7819d7f3&s=${title}&page=1&type=movie`
      )
      .then((res) => {
        setSearchResults(res.data.Search);
        setTotalResults(res.data.totalResults);
      })
      .catch((err) => console.log(err));

    setLastTitle(title);
    setTitle("");
  }

  function changeNextPage() {
    setCurrentPage((prevState) => prevState + 1);
  }

  function changePrevPage() {
    if (currentPage === 1) return;
    setCurrentPage((prevState) => prevState - 1);
  }

  function changePage(e) {
    const page = parseInt(e.target.innerText);
    setCurrentPage(page);
  }

  function populatePagination() {
    return Array(pageNumber)
      .fill()
      .map((item, i) => i + 1);
  }

  console.log(pageNumber);

  return (
    <section className="catalogs">
      <header className="catalogs__header">
        <div className="header__title">
          <h1>Movie Catalogs</h1>
        </div>
        <div className="header__subtitle">
          <p>Find your favourite movies here</p>
        </div>
        <form
          autoComplete="off"
          className="header__input"
          onSubmit={searchMovie}
        >
          <InputText
            name="Movie name"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </form>
      </header>

      <section className="catalogs__results">
        {!searchResults ? (
          <div className="placeholder">
            <h1>Nothing to show</h1>
          </div>
        ) : (
          <div className="results">
            {searchResults.map((result) => (
              <figure
                key={result.imdbID}
                className="photo__container"
                onClick={() => navigate(`/catalogs/${result.imdbID}`)}
              >
                <img
                  src={result.Poster === "N/A" ? NoPoster : result.Poster}
                  alt=""
                  className="photo"
                />
                <div className="description">
                  <p className="title">{result.Title}</p>
                  <p className="year">({result.Year})</p>
                  <p className="imdb">IMDB: {result.imdbID}</p>
                </div>
              </figure>
            ))}
          </div>
        )}
        <div className="buttons">
          {currentPage === 1 ? (
            <Button
              disabled
              name="Prev"
              className="button-prev-page-disabled"
            />
          ) : (
            <Button
              name="Prev"
              onClick={changePrevPage}
              className="button-prev-page"
            />
          )}

          {/* <h3>{!pageNumber ? "" : `Page ${currentPage} of ${pageNumber}`}</h3> */}
          {populatePagination().map((item) => (
            <Button
              onClick={changePage}
              className={`button-page-number ${
                currentPage === item ? "button-page-number-active" : ""
              }`}
              name={item}
            />
          ))}
          {currentPage === pageNumber || !searchResults ? (
            <Button
              disabled
              name="Next"
              className="button-next-page-disabled"
            />
          ) : (
            <Button
              name="Next"
              onClick={changeNextPage}
              className="button-next-page"
            />
          )}
        </div>
      </section>
    </section>
  );
};

export default Catalogs;
