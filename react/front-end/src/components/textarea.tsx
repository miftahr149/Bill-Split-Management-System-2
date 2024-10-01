interface InputParams {
  callback: (value: string) => void;
  className?: string;
  value?: string;
}

const TextArea = ({ callback, className, value }: InputParams) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    callback(e.target.value);
  return (
    <textarea onChange={handleChange} className={className} value={value}>
      {value}
    </textarea>
  );
};

export default TextArea;
