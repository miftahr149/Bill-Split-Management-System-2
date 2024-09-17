import { UserAmountParams } from "./billSplitCard";
import { useContext, useEffect, useState } from "react";
import { getImage } from "../utility/myapi";
import AuthContext from "../context/authContext";
import InputNumber from "./inputNumber";

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
  const [image, setImage] = useState("");
  const [billAmount, setBillAmount] = useState<number>(userAmount.amount);
  const { authTokens } = useContext(AuthContext);

  const handleChange = (value: number) => {
    setBillAmount(value);
    callback(value);
  }

  useEffect(() => {
    getImage(setImage, authTokens, userAmount.user.username);
  }, []);

  return (
    <div className="element d-flex gap align-items-center">
      <div className="d-flex gap--sm align-items-center">
        <img src={image} alt={image} className="img img--xs img--round" />
        <p className="my-text my-text--bold my-text--l">
          {userAmount.user.username}
        </p>
      </div>
      <div className="d-flex gap align-items-center">
        <p className="my-text currency">RM</p>
        <InputNumber
          callback={handleChange}
          className="input box--white-text my-text--l"
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
  }, [usersAmount])

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
