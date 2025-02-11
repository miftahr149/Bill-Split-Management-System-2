interface LoginFieldParams {
  name: string;
  type: string;
  callback: (value: string) => void;
  onBlur?: () => void;
}

const LoginField = ({ name, type, callback, onBlur }: LoginFieldParams) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    callback(e.target.value);
  };

  return (
    <div className="field d-flex flex-column">
      <label htmlFor={name}>{name[0].toUpperCase() + name.slice(1)}</label>
      <input
        type={type}
        name={name}
        placeholder={name}
        onChange={handleChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default LoginField;