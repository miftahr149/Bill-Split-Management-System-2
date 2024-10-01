import "../assets/css/billAmount.css";
import { UserAmountParams, UserParams } from "./billSplitCard";
import { useEffect, useState } from "react";
import { Dropdown, DropdownElement } from "./dropdown";
import InputTotalBill from "./inputTotalBill";
import CustomBillAmount from "./customBillAmount";
import { setImageURL } from "../utility/myapi";

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
  const [billType, setBillType] = useState("Custom");

  useEffect(() => {
    /* Deleting userAmount that is not available in users */
    setUsersAmount((previousState) => {
      return previousState.filter(({ user }) => {
        const find = users.findIndex(
          (value: UserParams) => value.username === user.username
        );
        return find !== -1;
      });
    });

    /* Appending new users to the userAmount */
    users.forEach((user) => {
      setUsersAmount((previousState) => {
        const find = previousState.find(
          ({ user }) => user.username === user.username
        );

        if (find !== undefined) return previousState;
        return [
          ...previousState,
          { user: user, amount: 0, receipt: setImageURL("/receipt/") },
        ];
      });
    });
  }, [users]);

  return (
    <div className="bill-amount d-flex flex-column gap--l">
      <Dropdown name={billType} callback={setBillType}>
        <DropdownElement value="Equal Share" />
        <DropdownElement value="Custom" />
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
