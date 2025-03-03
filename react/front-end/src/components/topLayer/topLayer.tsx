import "../../assets/css/topLayer.css"

interface TopLayerParams {
  value: boolean;
  children: JSX.Element | JSX.Element[];
}

const TopLayer = ({ value, children }: TopLayerParams) => {
  
  return (
    <>
      {value && (
        <div className="top-layer flex-center text-color-white">{children}</div>
      )}
    </>
  );
};

export default TopLayer