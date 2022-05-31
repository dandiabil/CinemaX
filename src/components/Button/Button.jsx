import React from "react";
import "./Button.scss";

const Button = ({ name, className, onClick, ...attr }) => {
  return (
    <button className={className} onClick={onClick} {...attr}>
      {name}
    </button>
  );
};

export default Button;
