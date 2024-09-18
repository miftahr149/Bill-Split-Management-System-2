import { UserAmountParams } from "./billSplitCard";
import { useContext, useEffect, useState } from "react";
import InputNumber from "./inputNumber";
import { UserProfileContext } from "../context/userProfileProvider";

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
        <p className="my-text currency">RM</p>
        <InputNumber
          callback={handleChange}
          className="input text-color-white my-text--l"
          value={billAmount}
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
      setUsersAmount((previousState: UserAmountParams[]) => {
        const index = previousState.findIndex(
          (value: UserAmountParams) => value.user.username == username
        );

        if (index === -1) return previousState;

        previousState[index].amount = Number(value);
        console.log(previousState[index].amount);
        return previousState;
      });
    };
  };

  useEffect(() => {
    console.log(usersAmount);
  }, [usersAmount]);

  return (
    <div className="custom-bill">
      {usersAmount !== undefined &&
        usersAmount.map((value: UserAmountParams) => (
          <CustomBillAmountElement
            userAmount={value}
            callback={setCallbackFunction(value)}
          />
        ))}
    </div>
  );
};

export default CustomBillAmount;
