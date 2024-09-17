interface InputParams {
  callback: (value: string) => void;
  className?: string;
  value?: string;
}

const Input = ({callback, ...param}: InputParams) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    callback(e.target.value);
  return <input type="text" onChange={handleChange} {...param} />;
};

export default Input;
