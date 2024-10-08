import dollarIcon from "../assets/img/dollar.png";
import groupIcon from "../assets/img/group.png";
import { UserProfileContext } from "../context/userProfileContext";
import { BillSplitCardContext } from "./billSplitCard";
import AuthContext from "../context/authContext";
import { useContext } from "react";

export const HostAttribute = () => {
  const { getImage } = useContext(UserProfileContext);
  const { host } = useContext(BillSplitCardContext);

  return (
    <div className="d-flex flex-center gap">
      <img src={getImage(host.username)} className="img img--round img--xs" />
      <p className="my-text text-bold attribute-text">{host.username}</p>
    </div>
  );
};

export const PriceAttribute = () => {
  const { username } = useContext(AuthContext);
  const { user_amount } = useContext(BillSplitCardContext);

  const getPrice = () => {
    const find = user_amount.find(({ user }) => user.username == username);
    if (typeof find === "undefined") return 0;
    return find.amount;
  };

  const priceFormat = `RM. ${getPrice()}`;

  return (
    <div className="d-flex gap--sm flex-center">
      <img src={dollarIcon} className="img img--round img--xs" />
      <p className="my-text text-bold attribute-text">{priceFormat}</p>
    </div>
  );
};

export const AmountUserAttribute = () => {
  const { user_amount } = useContext(BillSplitCardContext);
  return (
    <div className="d-flex flex-center gap">
      <img src={groupIcon} className="img img--xs" />
      <p className="my-text my-text--sm text-bold attribute-text">
        {`${user_amount.length} Users Participate`}
      </p>
    </div>
  );
};

export const ProgressBarAttribute = () => {
  const { user_amount } = useContext(BillSplitCardContext);
  const userAlreadyPaid = user_amount.filter(
    ({ amount }) => amount === 0
  ).length;
  const userTotal = user_amount.length;

  const styleProgressBar = {
    width: `${userAlreadyPaid / userTotal}%`,
  };

  const styleProgressContainer = {
    width: "8vw",
  };

  return (
    <div className="d-flex gap--sm flex-center">
      <p className="my-text text-bold">
        {`${userAlreadyPaid / userTotal}%`}
      </p>
      <div className="progress" style={styleProgressContainer}>
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={styleProgressBar}
          aria-valuemin={0}
          aria-valuenow={userAlreadyPaid}
          aria-valuemax={userTotal}
        >
        </div>
      </div>
    </div>
  );
};