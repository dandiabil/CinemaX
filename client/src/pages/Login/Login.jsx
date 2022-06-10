import { useEffect, useState } from "react";
import InputText from "../../components/InputText/InputText";
import Password from "../../components/Password/Password";
import Button from "../../components/Button/Button";
import "./Login.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const auth = useSelector((state) => state.user.isAuthenticated) || false;

  const { state } = useLocation();

  useEffect(() => {
    if (auth) {
      navigate("/", { replace: true });
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    if (state) {
      setStatus(state.msg);
    }
  }, [state]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");
    try {
      const res = await axios
        .post("http://localhost:3001/login", {
          email,
          password,
        })
        .then((response) => response)
        .catch((err) => {
          setStatus("Email/Password mismatch");
          console.error(err.message);
        });

      if (res.status === 200) {
        const jwt = localStorage.setItem("token", res.data.jwToken);
        navigate("/", { replace: true });
      }
      setStatus(res.data.msg);

      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <section className="login">
      <div className="login__container">
        <div className="login__title">
          <h1>Sign In</h1>
        </div>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="login__input"
        >
          <div className="input__email">
            <InputText
              type="email"
              name="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <Button name="Sign In" className="button__signin" />
          </div>
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
