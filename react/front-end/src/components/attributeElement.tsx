import cancelIcon from "../assets/img/cancel.png";
import "../assets/css/attributeElement.css";

interface AttributeElementParams {
  children: JSX.Element[] | JSX.Element;
  callback?: () => void;
}

const AttributeElement = ({ children, callback }: AttributeElementParams) => {
  const setClassName = () => {
    const defaultClass = "attribute-element my-button text-color-white";
    return typeof callback === "undefined"
      ? defaultClass
      : defaultClass + " attribute-element--enable-hover";
  };

  return (
    <button onClick={callback} className={setClassName()}>
      <div className="default">{children}</div>
      <div className="on-hover flex-center">
        <img src={cancelIcon} alt={cancelIcon} className="img img--xs" />
      </div>
    </button>
  );
};

export default AttributeElement;
