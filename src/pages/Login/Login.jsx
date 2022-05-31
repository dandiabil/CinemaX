import React from "react";
import InputText from "../../components/InputText/InputText";
import Password from "../../components/Password/Password";
import Button from "../../components/Button/Button";
import "./Login.scss";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="login">
      <div className="login__container">
        <div className="login__title">
          <h1>Sign In</h1>
        </div>
        <form autoComplete="off" onSubmit="" className="login__input">
          <InputText name="Email" />
          <Password name="Password" />
          <Button name="Sign In" className="button-signin-red" />
        </form>
        <div className="link">
          <Link to="/register" className="login__link">
            Create Account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
