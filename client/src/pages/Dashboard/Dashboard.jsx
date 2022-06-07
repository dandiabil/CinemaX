import { useState, useEffect } from "react";
import InputText from "../../components/InputText/InputText";
import Button from "../../components/Button/Button";
import Illustration from "../../assets/undraw_horror_movie_3988.svg";
import Illustration2 from "../../assets/undraw_video_streaming_re_v3qg.svg";
import Illustration3 from "../../assets/undraw_programmer_re_owql.svg";
import "./Dashboard.scss";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthenticity } from "../../Redux/reducer/userSlice";

const Dashboard = () => {
  const [email, setEmail] = useState("");
  const auth = useSelector((state) => state.user.isAuthenticated) || false;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    verifyAuth();
  }, []);

  async function verifyAuth() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios
        .get("http://localhost:3001/verify", {
          headers: {
            jwt_token: token,
          },
        })
        .then((response) => response)
        .catch((err) => console.log(err.message));

      if (res.status === 200) {
        dispatch(
          checkAuthenticity({ isAuthenticated: res.data.authenticated })
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/register", { state: { email } });
  }

  return (
    <>
      <section className="hero">
        <div className="hero__wrapper">
          <div>
            <div className="hero__title">
              <h1>Watch Movies In Easy Way</h1>
            </div>
            <div className="hero__subtitle">
              <h3>Rent or Buy. It's Up To You</h3>
            </div>
            <div className="hero__button">
              <Button
                className="button__catalogs"
                name="Browse Catalogs"
                onClick={() => navigate("/catalogs")}
              />
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
              <h3>
                Watch your favorite movies anytime with family, friends or your
                loved ones.
              </h3>
            </div>
          </div>
        </div>
      </section>
      <section className="section3">
        <div className="section3__wrapper">
          <div className="rectangle"></div>
          <header className="section3__header">
            <div className="section3__title">
              <h1>Don't know what to watch?</h1>
            </div>
            <div className="section3__subtitle">
              <p>
                There are over 1,000 movies that you can watch with few simple
                steps
              </p>
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
          <p>Let's start watching movies by creating an account below.</p>
          <form
            autoComplete="off"
            className="section4__input"
            onSubmit={handleSubmit}
          >
            <InputText
              type="email"
              name="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="button__signup" name="Sign Up" />
          </form>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
