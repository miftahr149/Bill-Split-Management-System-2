import InputNumber from "./inputNumber";
import { useState, useEffect } from "react";
import { UserAmountParams } from "./billSplitCard";

interface InputTotalBillParams {
  setUsersAmount: React.Dispatch<React.SetStateAction<UserAmountParams[]>>;
}

const InputTotalBill = ({ setUsersAmount }: InputTotalBillParams) => {
  const [totalBill, setTotalBill] = useState(0);
  const [averageBill, setAverageBill] = useState(0);

  useEffect(() => {
    setUsersAmount((previousState) => {
      const billAmount = totalBill / (previousState.length + 1);
      setAverageBill(billAmount);
      return previousState.map(value => ({...value, amount: billAmount}));
    });
  }, [totalBill]);

  return (
    <>
      <h3 className="my-header my-header--sm">Total Bill</h3>
      <div className="input-total-bill d-flex gap">
        <p className="my-text text-color-dark">RM</p>
        <InputNumber
          callback={setTotalBill}
          className="input text-color-white flex-grow-1"
          value={totalBill}
        />
      </div>
      <p className="my-text">
        note: every user in this bill-split should pay RM {averageBill}
      </p>
    </>
  );
};

export default InputTotalBill;
