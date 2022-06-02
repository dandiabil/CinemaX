import React, { useEffect, useState } from "react";
import InputText from "../../components/InputText/InputText";
import NoPoster from "../../assets/img-unavailable.png";
import "./Catalogs.scss";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../Redux/reducer/searchSlice";

const Catalogs = () => {
  const [title, setTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  const dispatch = useDispatch();

  const searchTitle = useSelector((state) => state.search.searchTitle) || "";
  const lastSearchResults =
    useSelector((state) => state.search.searchResults) || [];

  const navigate = useNavigate();

  const pageCount = Math.ceil(totalResults / 10) || 1;

  useEffect(() => {
    if (!searchResults) {
      setSearchResults(lastSearchResults.Search);
      setTotalResults(lastSearchResults.totalResults);
    }
  }, []);

  useEffect(() => {
    searchMovieChangePage();

    async function searchMovieChangePage() {
      await axios
        .get(
          `http://www.omdbapi.com/?apikey=7819d7f3&s=${searchTitle}&page=${currentPage}&type=movie`
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
        dispatch(
          getMovies({
            data: { searchTitle: title, searchResults: res.data },
          })
        );
      })
      .catch((err) => console.log(err));

    setTitle("");
    setCurrentPage(1);
  }

  function changeLastPage() {
    setCurrentPage(pageCount);
  }

  function changeFirstPage() {
    setCurrentPage(1);
  }

  function changePage(e) {
    const page = parseInt(e.target.innerText);
    setCurrentPage(page);
  }

  // console.log("page number", pageCount);

  function populatePagination() {
    let length = pageCount;
    return Array.from({ length }, (_, idx) => idx + 1);
  }

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
          <div className="buttons__firstpage">
            <Button
              name="First"
              onClick={currentPage === 1 ? null : changeFirstPage}
              className={
                currentPage === 1
                  ? "button__prevpage--disabled"
                  : "button__prevpage"
              }
            />
          </div>
          <div className="buttons__page">
            {populatePagination().map((item, i) => (
              <Button
                onClick={changePage}
                className={`button__page${
                  currentPage === item ? " button__page--active" : ""
                }`}
                name={item}
              />
            ))}
          </div>
          <div className="buttons__lastpage">
            <Button
              name="Last"
              onClick={
                currentPage === pageCount || !searchResults
                  ? null
                  : changeLastPage
              }
              className={
                currentPage === pageCount || !searchResults
                  ? "button__nextpage--disabled"
                  : "button__nextpage"
              }
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Catalogs;
