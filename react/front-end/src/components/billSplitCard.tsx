import dollarIcon from "../assets/img/dollar.png";
import groupIcon from "../assets/img/group.png";
import "../assets/css/billSplitCard.css";
import AuthContext from "../context/authContext";
import { UserProfileContext } from "../context/userProfileContext";
import { useContext, createContext } from "react";

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

interface BillSplitCardParams {
  value: BillSplitParams;
  callback: (value: BillSplitParams) => void;
  children?: JSX.Element[];
}

const BillSplitCardContext = createContext<BillSplitParams>({
  id: 0,
  name: "",
  host: { username: "" },
  description: "",
  status: "Pending",
  tag: [],
  user_amount: [],
});

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

const BillSplitCard = ({ value, callback, children }: BillSplitCardParams) => {
  const { tag, name } = value;

  const renderTag = () => {
    return tag.map(({ name }: TagParams) => (
      <p className={"tag my-text text-bold"} key={name}>
        {name}
      </p>
    ));
  };

  const renderChildren = (children: JSX.Element[]) => {
    return children.map((value, index) => {
      if (index === children.length - 1) return value;
      return (
        <>
          {value}
          <img src="" alt="" className="separator img img--round" />
        </>
      );
    });
  };

  return (
    <button
      className="bill-split-card box box--bg-black text-color-white"
      onClick={() => callback(value)}
    >
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
          <BillSplitCardContext.Provider value={value}>
            {typeof children === "undefined"
              ? renderChildren([
                  <HostAttribute />,
                  <PriceAttribute />,
                ])
              : renderChildren(children)}
          </BillSplitCardContext.Provider>
        </div>
      </div>
    </button>
  );
};

export default BillSplitCard;
