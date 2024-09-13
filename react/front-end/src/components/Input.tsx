interface InputParams {
  callback: (value: string) => void;
  className?: string;
}

const Input = ({callback, className}: InputParams) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    callback(e.target.value);
  return <input type="text" onChange={handleChange} className={className} />;
};

export default Input;
