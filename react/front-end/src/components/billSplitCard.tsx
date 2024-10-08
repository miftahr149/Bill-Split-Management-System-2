import "../assets/css/billSplitCard.css";
import { createContext } from "react";
import { HostAttribute, PriceAttribute } from "./billSplitAttribute";

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
  status: "Pending" | "Ongoing" | "Reject";
  tag: TagParams[];
  user_amount: UserAmountParams[];
}

interface BillSplitCardParams {
  value: BillSplitParams;
  callback: (value: BillSplitParams) => void;
  children?: JSX.Element[];
}

export const BillSplitCardContext = createContext<BillSplitParams>({
  id: 0,
  name: "",
  host: { username: "" },
  description: "",
  status: "Pending",
  tag: [],
  user_amount: [],
});

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
              ? renderChildren([<HostAttribute />, <PriceAttribute />])
              : renderChildren(children)}
          </BillSplitCardContext.Provider>
        </div>
      </div>
    </button>
  );
};

export default BillSplitCard;
