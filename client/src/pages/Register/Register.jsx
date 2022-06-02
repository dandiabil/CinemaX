import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import InputText from "../../components/InputText/InputText";
import Password from "../../components/Password/Password";
import axios from "axios";
import "./Register.scss";
import { useSelector } from "react-redux";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.user.isAuthenticated) || false;

  const navigate = useNavigate();

  const { state } = useLocation();

  useEffect(() => {
    if (auth) {
      navigate("/", { replace: true });
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    if (state) {
      setEmail(state.email);
    }
  }, [state]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");
    try {
      const res = await axios
        .post("http://localhost:3001/register", {
          email,
          fullName,
          password,
        })
        .then((response) => {
          console.log(response);
          return response;
        })
        .catch((err) => {
          setStatus("Email already registered.");
          console.error(err.message);
        });

      if (res.status === 201) {
        setStatus(res.data.msg);
      }

      setEmail("");
      setFullName("");
      setPassword("");
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <section className="register">
      <div className="register__container">
        <div className="register__title">
          <h1>Create Account</h1>
        </div>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="register__input"
        >
          <div className="input__email">
            <InputText
              type="email"
              name="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input__name">
            <InputText
              name="Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="input__password">
            <Password
              name="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="status__text">{status && <p>{status}</p>}</div>
          <div className="input__button">
            <Button name="Sign Up" className="button__signin" />
          </div>
        </form>
        <div className="link">
          <Link to="/login" className="login__link">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
