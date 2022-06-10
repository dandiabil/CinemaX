import { useEffect, useState } from "react";
import InputText from "../../components/InputText/InputText";
import NoPoster from "../../assets/img-unavailable.png";
import "./Catalogs.scss";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  fetchMoviesByPage,
  getSearchResults,
  getSearchTitle,
  lastSearch,
} from "../../Redux/reducer/searchSlice";

const Catalogs = () => {
  const [title, setTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const searchTitle = useSelector(getSearchTitle) || "";
  const searchResults = useSelector(getSearchResults) || [];

  const navigate = useNavigate();

  const pageCount =
    searchResults.Response === "True"
      ? Math.ceil(searchResults.totalResults / 10) || 1
      : 1;

  useEffect(() => {}, [currentPage]);

  function handleSearch(e) {
    e.preventDefault();
    if (!title) return;

    dispatch(fetchMovies(title));
    dispatch(lastSearch({ title }));

    setTitle("");
    setCurrentPage(1);
  }

  function changeLastPage() {
    setCurrentPage(pageCount);
    dispatch(fetchMoviesByPage({ title: searchTitle, page: pageCount }));
  }

  function changeFirstPage() {
    setCurrentPage(1);
    dispatch(fetchMoviesByPage({ title: searchTitle, page: 1 }));
  }

  function changePage(e) {
    const page = parseInt(e.target.innerText);
    setCurrentPage(page);
    dispatch(fetchMoviesByPage({ title: searchTitle, page }));
  }

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
          onSubmit={handleSearch}
        >
          <InputText
            name="Movie name"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </form>
      </header>

      <section className="catalogs__results">
        {searchResults.Response === "False" || searchResults.length === 0 ? (
          <div className="placeholder">
            <h1>Nothing to show</h1>
          </div>
        ) : (
          <div className="results">
            {searchResults.Search.map((result) => (
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
