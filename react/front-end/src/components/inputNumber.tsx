
interface InputNumberParams {
  callback: (value: number) => void;
  className?: string;
  value?: any;
  disabled?: Boolean;
}

const InputNumber = ({callback, disabled, ...params}: InputNumberParams) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled === true) {
      e.preventDefault();
      return;
    }
    
    if (e.target.value[0] === "0") {
      e.target.value = e.target.value.slice(1);
    }

    callback(Number(e.target.value));
  }
  
  return <input type="number" onChange={handleChange} {...params} />
}

export default InputNumber;