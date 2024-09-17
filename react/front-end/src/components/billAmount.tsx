import "../assets/css/billAmount.css";
import { UserAmountParams, UserParams } from "./billSplitCard";
import { useEffect, useState } from "react";
import { Dropdown, DropdownElement } from "./dropdown";
import InputTotalBill from "./inputTotalBill";
import Input from "./Input";

interface BillAmountParams {
  users: UserParams[];
  setUsersAmount: React.Dispatch<React.SetStateAction<UserAmountParams[]>>;
}

const BillAmount = ({ users, setUsersAmount }: BillAmountParams) => {
  const [billType, setBillType] = useState("Equal Share");

  const changeUserAmount = (username: string, amount: number) => {
    setUsersAmount((previousState: UserAmountParams[]) => {
      const find = previousState.find(
        (value: UserAmountParams) => value.user.username === username
      );

      if (typeof find === "undefined") {
        console.log(`can't find username "${username}" `);
        return previousState;
      }

      const index = previousState.indexOf(find);
      previousState[index].amount = amount;

      return previousState;
    });
  };

  useEffect(() => {
    users.forEach((user: UserParams) => {
      setUsersAmount((previousState: UserAmountParams[]) => {
        return [...previousState, { user: user, amount: 0, receipt: "" }];
      });
    });
  }, [users]);

  return (
    <div className="bill-amount d-flex flex-column gap--l">
      <Dropdown name={billType}>
        <DropdownElement callback={() => setBillType("Equal Share")}>
          <p className="my-text my-text--bold">Equal Share</p>
        </DropdownElement>
        <DropdownElement callback={() => setBillType("Custom")}>
          <p className="my-text my-text--bold">Custom</p>
        </DropdownElement>
      </Dropdown>

      <div className="d-flex flex-column gap">
        {billType === "Equal Share" && (
          <InputTotalBill  setUsersAmount={setUsersAmount}/>
        )}
      </div>
    </div>
  );
};

export default BillAmount;
