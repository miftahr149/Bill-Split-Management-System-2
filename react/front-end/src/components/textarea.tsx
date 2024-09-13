interface InputParams {
  callback: (value: string) => void;
  className?: string;
}

const TextArea = ({callback, className}: InputParams) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    callback(e.target.value);
  return <textarea onChange={handleChange} className={className}></textarea>;
};

export default TextArea;
