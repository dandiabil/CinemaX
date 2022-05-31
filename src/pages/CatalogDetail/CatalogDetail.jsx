import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoPoster from "../../assets/img-unavailable.png";
import Button from "../../components/Button/Button";
import axios from "axios";
import "./CatalogDetail.scss";

const CatalogDetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);

  useEffect(() => {
    getMovieDetail();

    async function getMovieDetail() {
      await axios
        .get(`http://www.omdbapi.com/?apikey=7819d7f3&i=${id}`)
        .then((res) => {
          setMovieDetail(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const movieData = [
    { title: "Title", result: movieDetail?.Title || "" },
    { title: "Genre", result: movieDetail?.Genre || "" },
    {
      title: "Released Date",
      result: `${movieDetail?.Released} (${movieDetail?.Country})` || "",
    },
    {
      title: "Director",
      result: movieDetail?.Director || "",
    },
    {
      title: "Actors",
      result: movieDetail?.Actors || "",
    },
    {
      title: "Writers",
      result: movieDetail?.Writer || "",
    },
    { title: "Plot", result: movieDetail?.Plot || "" },
    {
      title: "IMDb Rating",
      result: `${movieDetail?.imdbRating}/10` || "",
    },
    {
      title: "Metacritic",
      result: `${movieDetail?.Metascore}/100` || "",
    },
  ];

  return (
    <section className="detail">
      <div className="detail__container">
        <header className="detail__header">
          <h1 className="detail__title">Movie Details</h1>
        </header>
        <div className="detail__description">
          <figure className="poster">
            <img
              src={
                movieDetail?.Poster === "N/A" ? NoPoster : movieDetail?.Poster
              }
              alt=""
              className="photo"
            />
            {movieDetail?.Awards === "N/A" ? (
              ""
            ) : (
              <p className="awards">{movieDetail?.Awards}</p>
            )}
          </figure>
          <div className="description">
            <header className="description__header">
              <h2 className="description__title">{movieDetail?.Title}</h2>
              <div className="description__subtitle">
                <p className="description__year">{movieDetail?.Year}</p>
                <p className="description__rated">{movieDetail?.Rated}</p>
                <p className="description__runtime">{movieDetail?.Runtime}</p>
                <p className="description__imdb">{movieDetail?.imdbID}</p>
              </div>
            </header>
            <div className="description__body">
              {movieData.map((data) => (
                <div className="body">
                  <p className="body__title">{data.title}</p>
                  <p className="body__result">{data.result}</p>
                </div>
              ))}
            </div>
            <div className="description__buttons">
              <h1>Watch this amazing movie</h1>
              <div className="buttons">
                <Button name="Buy" className="button-buy" />
                <Button name="Rent" className="button-rent" />
                {/* <Button name="Buy For Rp.210.000" className="button-buy" />
                <Button
                  name="Rent For Rp.96.000/30 Days"
                  className="button-rent"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogDetail;
