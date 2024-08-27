interface MenuElementParams {
  handleSubmit: () => void;
  imageURL: string;
  name: string;
  imageRound?: boolean;
}

const MenuElement = ({
  handleSubmit,
  imageURL,
  name,
  imageRound,
}: MenuElementParams) => {
  
  const setImageClass = () => {
    const defaultClass = "img img--sm";
    return imageRound ? defaultClass + " img--round" : defaultClass;
  };

  return (
    <button
      className="my-menu__elements my-button d-flex align-items-center"
      onClick={handleSubmit}
    >
      <img src={imageURL} alt="" className={setImageClass()} />
      <div className="d-flex flex-grow-1 justify-content-center align-items-center">
        <p className="my-text my-text--align-center flex-grow-1">{name}</p>
      </div>
    </button>
  );
};

export default MenuElement;
