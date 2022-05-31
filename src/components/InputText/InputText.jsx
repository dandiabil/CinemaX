import React from "react";
import "./InputText.scss";

const InputText = ({ onChange, name, value }) => {
  return (
    <div className="input">
      <input
        type="text"
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
