import React from "react";
import InputText from "../../components/InputText/InputText";
import Button from "../../components/Button/Button";
import Illustration from "../../assets/undraw_horror_movie_3988.svg";
import Illustration2 from "../../assets/undraw_video_streaming_re_v3qg.svg";
import Illustration3 from "../../assets/undraw_programmer_re_owql.svg";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <>
      <section className="hero">
        <div className="hero__wrapper">
          <div>
            <div className="hero__title">
              <h1>Tagline</h1>
            </div>
            <div className="hero__subtitle">
              <h3>Subhealine</h3>
            </div>
            <div className="hero__input">
              <InputText name="Email address" />
              <Button className="button-signup-red" name="Sign Up" />
            </div>
          </div>
          <div className="image__container">
            <figure>
              <img src={Illustration} alt="" className="image" />
            </figure>
          </div>
        </div>
      </section>
      <section className="section2">
        <div className="section2__wrapper">
          <div className="image__container">
            <figure>
              <img src={Illustration2} alt="" className="image" />
            </figure>
          </div>
          <div>
            <div className="section2__title">
              <h1>Anytime & Anywhere.</h1>
            </div>
            <div className="section2__subtitle">
              <h3>Subhealine</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="section3">
        <div className="section3__wrapper">
          <div className="rectangle"></div>
          <header className="section3__header">
            <div className="section3__title">
              <h1>Tagline here</h1>
            </div>
            <div className="section3__subtitle">
              <p>Watch over 1,000 movies with few simple steps</p>
            </div>
          </header>
          <div className="section3__description">
            <figure className="image__container">
              <img src={Illustration3} alt="" className="image" />
            </figure>
            <div className="description">
              <div className="description__step">
                <p className="description__number">01</p>
                <p className="description__text">Login / Create an account</p>
              </div>
              <div className="description__step">
                <p className="description__number">02</p>
                <p className="description__text">
                  Look for the preferred movie
                </p>
              </div>
              <div className="description__step">
                <p className="description__number">03</p>
                <p className="description__text">
                  Rent or Buy the preferred movie
                </p>
              </div>
              <div className="description__step">
                <p className="description__number">04</p>
                <p className="description__text">
                  Sit back, relax and enjoy the movie
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section4">
        <div className="section4__wrapper">
          <h1>What are you waiting for ?</h1>
          <p>Watch over 1,000 movies with few simple steps</p>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
