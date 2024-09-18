import cancelIcon from "../assets/img/cancel.png"
import "../assets/css/attributeElement.css"

interface AttributeElementParams {
  children: JSX.Element[] | JSX.Element;
  callback: () => void;
}

const AttributeElement = ({children, callback}: AttributeElementParams) => {
  return (
    <button onClick={callback} className="my-button attribute-element text-color-white">
      <div className="default">
        {children}
      </div>
      <div className="on-hover flex-center">
        <img src={cancelIcon} alt={cancelIcon} className="img img--xs" />
      </div>
    </button>
  )
}

export default AttributeElement