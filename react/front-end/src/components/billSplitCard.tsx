import dollarIcon from "../assets/img/dollar.png";
import "../assets/css/billSplitCard.css";
import AuthContext from "../context/authContext";
import { useContext, useState, useEffect } from "react";
import { UserProfileContext } from "../context/userProfileContext";

export interface UserParams {
  username: string;
}

export interface UserAmountParams {
  user: UserParams;
  amount: number;
  receipt: string | undefined;
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

const BillSplitCard = ({
  name,
  host: hostData,
  user_amount,
  tag,
}: BillSplitParams) => {
  const getPrice = () => {
    const find = user_amount.find(({ user }) => user.username == username);
    if (typeof find === "undefined") return 0;
    return find.amount;
  };

  const renderTag = () => {
    return tag.map(({ name }: TagParams) => (
      <p className={"tag my-text text-bold"} key={name}>{name}</p>
    ));
  };

  const { username } = useContext(AuthContext);
  const { getImage } = useContext(UserProfileContext);
  const { username: host } = hostData;
  const priceFormat = `RM. ${getPrice()}`;

  return (
    <div className="bill-split-card box box--bg-black">
      <div className="d-flex flex-column">
        <div className="header-box d-flex flex-center gap">
          <div className="flex-grow-1">
            <p className="name my-text text-bold flex-grow-2 text-nowrap">
              {name}
            </p>
          </div>
          <div className="tag-list d-flex gap--sm">{renderTag()}</div>
        </div>

        <div className="d-flex align-items-center gap--l">
          <div className="d-flex gap--sm flex-center">
            <img
              src={getImage(hostData.username)}
              alt="hostImage"
              className="img img--round img--xs"
            />
            <p className="my-text text-bold attribute-text">{host}</p>
          </div>
          <img src="" alt="" className="separator img img--round" />
          <div className="d-flex gap--sm flex-center">
            <img
              src={dollarIcon}
              alt="dollaricon"
              className="img img--round img--xs"
            />
            <p className="my-text text-bold attribute-text">{priceFormat}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillSplitCard;
