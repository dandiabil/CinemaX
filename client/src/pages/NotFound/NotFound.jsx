import React from "react";
import Button from "../../components/Button/Button";
import Illustration from "../../assets/undraw_page_not_found_re_e9o6.svg";
import "./NotFound.scss";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <div className="notfound__wrapper">
        <figure className="notfound__image">
          <img src={Illustration} alt="404-not-found" />
        </figure>
        <div className="notfound__button">
          <Button
            name="Go to Homepage"
            className="button__back"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
