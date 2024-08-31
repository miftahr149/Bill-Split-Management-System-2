import dollarIcon from "../assets/img/dollar.png";
import "../assets/css/billSplitCard.css";

interface BillSplitCardTagsParams {
  tag: string;
}

const BillSplitCardTag = ({ tag }: BillSplitCardTagsParams) => {
  return <p className={"bill-split-card__tag my-text my-text--bold"}>{tag}</p>;
};

const BillSplitCard = () => {
  const defaultUserImage =
    "http://127.0.0.1:8000/api/media/image/defaultUserProfile.png";
  const name = "Rent House";
  const host = "User";
  const price = 312.5;
  const tagList = ["Hello World", "Hi", "Hi There"];

  const renderTag = () => {
    return tagList.map((element: string) => <BillSplitCardTag tag={element} />);
  };

  return (
    <div className="box box--bg-black">
      <div className="display-desktop">
        <div className="d-flex flex-column gap">
          <div className="d-flex bill-split-card__header flex-center">
            <p className="my-text bill-split-card__name my-text--bold flex-grow-1">
              {name}
            </p>
            <div className="bill-split-card__tag-list d-flex justify-content-end gap--sm flex-grow-1">
              {renderTag()}
            </div>
          </div>

          <div className="d-flex align-items-center gap--l">
            <div className="d-flex gap--sm flex-center">
              <img
                src={defaultUserImage}
                alt="userImage"
                className="img img--round img--xs"
              />
              <p className="my-text my-text--bold">{host}</p>
            </div>
            <img src="" alt="" className="ball" />
            <div className="d-flex gap--sm flex-center">
              <img
                src={dollarIcon}
                alt="userImage"
                className="img img--round img--xs"
              />
              <p className="my-text my-text--bold">{`RM. ${price}`}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="display-mobile">
        <div className="d-flex flex-column gap">
          <div className="bill-split-card__header d-flex flex-center">
            <p className="bill-split-card__name my-text my-text--bold">
              {name}
            </p>
            <div className="d-flex gap--sm flex-center">
              <img
                src={dollarIcon}
                alt="userImage"
                className="img img--round img--xs"
              />
              <p className="my-text my-text--bold my-text--sm">
                {`RM. ${312.5}`}
              </p>
            </div>
          </div>

          <div className="d-flex gap--sm align-items-center">
            <img
              src={defaultUserImage}
              alt="userImage"
              className="img img--round img--xs"
            />
            <p className="my-text my-text--bold my-text--sm">{name}</p>
          </div>
          <div className="bill-split-card__tag-list d-flex gap--sm">
            {renderTag()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillSplitCard;
