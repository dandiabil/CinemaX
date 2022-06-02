import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoPoster from "../../assets/img-unavailable.png";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../Redux/reducer/cartSlice";
import { formatMoney } from "../../utils/utils";
import "./CatalogDetail.scss";

const CatalogDetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [buyPrice, setBuyPrice] = useState(200000);
  const [rentPrice, setRentPrice] = useState(95000);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setBuyPrice(Math.round(Math.floor(Math.random() * 50000) + 200000));
    setRentPrice(Math.round(Math.floor(Math.random() * 50000) + 95000));
  }, [id]);

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
      <div className="back__button">
        <Button
          name="Go Back"
          className="button__back"
          onClick={() => navigate("/catalogs")}
        />
      </div>
      <div className="detail__wrapper">
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
              {movieData.map((data, i) => (
                <div className="body" key={i}>
                  <p className="body__title">{data.title}</p>
                  <p className="body__result">{data.result}</p>
                </div>
              ))}
            </div>
            <div className="description__buttons">
              <h1>Watch this amazing movie</h1>
              <div className="buttons">
                <div className="buttons__group">
                  <p>Buy for {formatMoney(buyPrice)}</p>
                  <Button
                    name="Buy"
                    className="button__buy"
                    onClick={() =>
                      dispatch(
                        addItemToCart({
                          price: buyPrice,
                          data: movieDetail,
                          type: "Buy",
                        })
                      )
                    }
                  />
                </div>
                <div className="buttons__group">
                  <p>Buy for {formatMoney(rentPrice)}</p>
                  <Button
                    name="Rent"
                    className="button__rent"
                    onClick={() =>
                      dispatch(
                        addItemToCart({
                          price: rentPrice,
                          data: movieDetail,
                          type: "Rent",
                        })
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogDetail;
