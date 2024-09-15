import "../assets/css/topLayer.css"

interface TopLayerParams {
  value: boolean;
  children: JSX.Element | JSX.Element[];
}

const TopLayer = ({ value, children }: TopLayerParams) => {
  const setClass = () => {
    const defaultClass = "top-layer flex-center box--white-text";
    return value ? defaultClass : defaultClass + " none";
  };

  return <div className={setClass()}>{children}</div>;
};

export default TopLayer