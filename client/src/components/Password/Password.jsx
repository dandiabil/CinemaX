import "./Password.scss";

const Password = ({ onChange, name, value }) => {
  return (
    <div className="input">
      <input
        value={value}
        type="password"
        onChange={onChange}
        placeholder={name}
        className="input__password"
        required
      />
    </div>
  );
};

export default Password;
