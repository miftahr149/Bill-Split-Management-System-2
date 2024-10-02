interface InputParams {
  callback: (value: string) => void;
  className?: string;
  value?: string;
  disabled?: boolean;
}

const Input = ({callback, ...params}: InputParams) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    callback(e.target.value);
  return <input type="text" onChange={handleChange} {...params} />;
};

export default Input;
