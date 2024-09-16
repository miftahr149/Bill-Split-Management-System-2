import dollarIcon from "../assets/img/dollar.png";
import "../assets/css/billSplitCard.css";
import AuthContext from "../context/authContext";
import { useContext, useState, useEffect } from "react";
import {
  setBackendURL,
  setAuthorization,
  APIFetch,
  tryCatchFetch,
  setImageURL
} from "../utility/myapi";

export interface UserParams {
  username: string;
}

export interface UserAmountParams {
  user: UserParams;
  amount: number;
  receipt: string;
}


export interface TagParams {
  name: string;
}

export interface BillSplitParams {
  id: number;
  name: string;
  description: string;
  host: UserParams;
  status: "Pending" | "Ongoing";
  tag: TagParams[];
  user_amount: UserAmountParams[];
}

interface BillSplitCardTagsParams {
  tag: string;
}

const BillSplitCardTag = ({ tag }: BillSplitCardTagsParams) => {
  return <p className={"bill-split-card__tag my-text my-text--bold"}>{tag}</p>;
};

const BillSplitCard = ({
  name,
  host: hostData,
  user_amount,
  tag,
}: BillSplitParams) => {
  const getPrice = () => {
    const userAmount = user_amount.filter(
      (value: UserAmountParams) => value.user.username === username
    )[0];
    return userAmount.amount;
  };

  const renderTag = () => {
    return tag.map((element: TagParams) => (
      <BillSplitCardTag tag={element.name} />
    ));
  };

  const [hostImage, setHostImage] = useState("");
  const { username, authTokens } = useContext(AuthContext);
  const { username: host } = hostData;
  const priceFormat = `RM. ${getPrice()}`;

  const getHostImage = () => {
    tryCatchFetch(async () => {
      const { image } = await APIFetch({
        URL: setBackendURL("userImage/get"),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: setAuthorization(authTokens.access)
        },
        body: JSON.stringify({ username: host })
      })

      setHostImage(setImageURL(image));
      console.log(`${host}: ${image}`)
    })
  };

  useEffect(() => {
    getHostImage();
  }, [host]);

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
                src={hostImage}
                alt="hostImage"
                className="img img--round img--xs"
              />
              <p className="my-text my-text--bold">{host}</p>
            </div>
            <img src="" alt="" className="ball" />
            <div className="d-flex gap--sm flex-center">
              <img
                src={dollarIcon}
                alt="dollaricon"
                className="img img--round img--xs"
              />
              <p className="my-text my-text--bold">{priceFormat}</p>
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
                alt="dollar"
                className="img img--round img--xs"
              />
              <p className="my-text my-text--bold my-text--sm">{priceFormat}</p>
            </div>
          </div>

          <div className="d-flex gap--sm align-items-center">
            <img
              src={hostImage}
              alt="hostImage"
              className="img img--round img--xs"
            />
            <p className="my-text my-text--bold my-text--sm">{host}</p>
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
