import React from "react";
import Button from "../../components/Button/Button";
import InputText from "../../components/InputText/InputText";
import Password from "../../components/Password/Password";
import "./Register.scss";

const Register = () => {
  return (
    <section className="register">
      <div className="register__container">
        <div className="register__title">
          <h1>Create Account</h1>
        </div>
        <form autoComplete="off" onSubmit="" className="register__input">
          <InputText name="Name" />
          <InputText name="Email" />
          <Password name="Password" />
          <Password name="Confirm Password" />
          <Button name="Sign Up" className="button-signin-red" />
        </form>
      </div>
    </section>
  );
};

export default Register;
