interface InputParams {
  callback: (value: string) => void;
  className?: string;
  value?: string;
  disabled?: boolean;
}

const TextArea = ({ callback, ...params }: InputParams) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    callback(e.target.value);
  return <textarea onChange={handleChange} {...params}></textarea>;
};

export default TextArea;
