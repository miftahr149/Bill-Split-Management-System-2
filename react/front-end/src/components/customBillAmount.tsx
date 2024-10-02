import { UserAmountParams } from "./billSplitCard";
import { useContext, useState } from "react";
import InputNumber from "./inputNumber";
import { UserProfileContext } from "../context/userProfileContext";
import { BillAmountContext } from "./billAmount";

interface CustomBillAmountParams {
  usersAmount: UserAmountParams[];
  setUsersAmount: React.Dispatch<React.SetStateAction<UserAmountParams[]>>;
}

interface CustomBillAmountElementParams {
  userAmount: UserAmountParams;
  callback: (value: number) => void;
}

const CustomBillAmountElement = ({
  userAmount,
  callback,
}: CustomBillAmountElementParams) => {
  const [billAmount, setBillAmount] = useState<number>(userAmount.amount);
  const { getImage } = useContext(UserProfileContext);
  const { notReadOnlyRestriction } = useContext(BillAmountContext)

  const handleChange = (value: number) => {
    setBillAmount(value);
    callback(value);
  };

  return (
    <div className="element d-flex gap align-items-center">
      <div className="d-flex gap--sm align-items-center">
        <img
          src={getImage(userAmount.user.username)}
          alt="Photo"
          className="img img--xs img--round"
        />
        <p className="my-text text-bold my-text--l">
          {userAmount.user.username}
        </p>
      </div>
      <div className="d-flex gap align-items-center">
        <p className="my-text text-color-dark">RM</p>
        <InputNumber
          callback={handleChange}
          className="input text-color-white my-text--l"
          value={billAmount}
          disabled= {typeof notReadOnlyRestriction(1) === "undefined"}
        />
      </div>
    </div>
  );
};

const CustomBillAmount = ({
  usersAmount,
  setUsersAmount,
}: CustomBillAmountParams) => {
  
  const setCallbackFunction = (userAmount: UserAmountParams) => {
    return (value: Number) => {
      const username = userAmount.user.username;
      setUsersAmount((previousState) => {
        const find = previousState.find(
          (value) => value.user.username == username
        );

        if (typeof find === "undefined") return previousState;

        return [
          ...previousState.filter((value) => value !== find),
          { ...find, amount: value } as UserAmountParams,
        ];
      });
    };
  };

  return (
    <div className="custom-bill">
      {usersAmount !== undefined &&
        usersAmount.map((value) => (
          <CustomBillAmountElement
            userAmount={value}
            callback={setCallbackFunction(value)}
            key={value.user.username}
          />
        ))}
    </div>
  );
};

export default CustomBillAmount;
