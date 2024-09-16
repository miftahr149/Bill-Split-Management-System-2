import "../assets/css/billAmount.css";
import { UserAmountParams, UserParams } from "./billSplitCard";
import { useEffect, useState } from "react";
import { Dropdown, DropdownElement } from "./dropdown";

interface BillAmountParams {
  users: UserParams[];
  setUsersAmount: React.Dispatch<React.SetStateAction<UserAmountParams[]>>;
}

const BillAmount = ({ users, setUsersAmount }: BillAmountParams) => {
  const [billType, setBillType] = useState("Equal Share");
  const [totalBill, setTotalBill] = useState(0);

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
    <div className="bill-amount">
      <Dropdown name={billType}>
        <DropdownElement callback={() => setBillType("Equal Share")}>
          <p className="my-text my-text--bold">Equal Share</p>
        </DropdownElement>
        <DropdownElement callback={() => setBillType("Custom")}>
          <p className="my-text my-text--bold">Custom</p>
        </DropdownElement>
      </Dropdown>

      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, amet
          eius. Aspernatur suscipit asperiores blanditiis aliquam ipsa rerum
          libero animi, veritatis ullam qui perferendis tenetur maxime corporis
          odit laborum, ut perspiciatis nostrum, nam impedit temporibus ipsum
          laudantium. Esse quia dolor veniam nesciunt illum natus, et magni,
          quas aliquid reiciendis facere molestiae nihil iste sint dolore
          doloribus, dicta amet recusandae. Earum culpa illo dolorum harum
          molestiae ipsum, unde explicabo rem? Deserunt sequi molestiae,
          reiciendis placeat consequatur officiis ab nulla natus corrupti, ut
          adipisci! Ullam optio dolorem libero esse velit, quod voluptatum
          molestiae neque doloribus incidunt labore explicabo nemo nostrum
          voluptates et?
        </p>
      </div>
    </div>
  );
};

export default BillAmount;
