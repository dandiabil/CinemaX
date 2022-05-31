import React from "react";
import "./Password.scss";

const Password = ({ onChange, name }) => {
  return (
    <div className="input">
      <input
        type="password"
        placeholder={name}
        className="input__password"
        required
      />
    </div>
  );
};

export default Password;
