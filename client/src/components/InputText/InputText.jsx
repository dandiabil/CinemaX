import React from "react";
import "./InputText.scss";

const InputText = ({ onChange, name, value, type = "text" }) => {
  return (
    <div className="input">
      <input
        type={type}
        placeholder={name}
        value={value}
        className="input__text"
        required
        onChange={onChange}
      />
    </div>
  );
};

export default InputText;
