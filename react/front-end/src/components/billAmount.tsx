import "../assets/css/billAmount.css";
import { UserAmountParams, UserParams } from "./billSplitCard";
import { useEffect, useState } from "react";
import { Dropdown, DropdownElement } from "./dropdown";
import InputTotalBill from "./inputTotalBill";
import CustomBillAmount from "./customBillAmount";
import Input from "./Input";

interface BillAmountParams {
  users: UserParams[];
  setUsersAmount: React.Dispatch<React.SetStateAction<UserAmountParams[]>>;
  usersAmount: UserAmountParams[];
}

const BillAmount = ({
  users,
  setUsersAmount,
  usersAmount,
}: BillAmountParams) => {
  const [billType, setBillType] = useState("Equal Share");

  useEffect(() => {
    /* Deleting userAmount that is not available in users */
    setUsersAmount((previousState: UserAmountParams[]) => {
      return previousState.filter((value: UserAmountParams) => {
        const username = value.user.username;
        const find = users.findIndex(
          (value: UserParams) => value.username === username
        );
        return find !== -1;
      });
    });

    /* Appending new users to the userAmount */
    users.forEach((user: UserParams) => {
      setUsersAmount((previousState: UserAmountParams[]) => {
        const find = previousState.find(
          (value: UserAmountParams) => value.user.username === user.username
        );

        if (find !== undefined) return previousState;
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
          <InputTotalBill setUsersAmount={setUsersAmount} />
        )}

        {billType === "Custom" && (
          <CustomBillAmount
            usersAmount={usersAmount}
            setUsersAmount={setUsersAmount}
          />
        )}
      </div>
    </div>
  );
};

export default BillAmount;
