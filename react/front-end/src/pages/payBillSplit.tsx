import "../assets/css/payBillSplit.css";

import { BillSplitParams } from "../components/billSplitCard";
import {
  APIFetch,
  setAuthorization,
  setBackendURL,
  tryCatchFetch,
} from "../utility/myapi";
import AuthContext from "../context/authContext";
import Navbar from "../components/navbar";

import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ignoreFirstRender } from "../utility/utility";

interface BuyBillSplitParams {
  data: BillSplitParams;
}

const PayBillSplitContent = ({ data }: BuyBillSplitParams) => {
  const { username } = useContext(AuthContext);

  const getBillAmount = () => {
    const find = data.user_amount.find(
      ({ user: findUser }) => findUser.username === username
    );

    if (typeof find === "undefined") {
      console.log("can't find the user amount bill");
      return 0;
    }

    return find.amount;
  };

  const handleSubmit = () => {};

  return (
    <form
      className="pages text-color-white d-flex flex-column"
      onSubmit={handleSubmit}
    >
      <Navbar title={data?.name} />
      <main className="content-view box d-flex flex-column gap--l flex-grow-1">
        <div className="d-flex flex-column gap flex-grow-1">
          <h2 className="my-header text-color-primary-green">Description</h2>
          <p className="my-text">{data?.description}</p>
        </div>
        <div className="d-flex flex-column gap flex-grow-1">
          <h2 className="my-header text-color-primary-green">Pay</h2>
          <p className="my-text">Bill to Pay: RM {getBillAmount()}</p>
          <input type="file" name="" id="" />
        </div>
        <button className="btn btn-success">Pay Bill</button>
      </main>
    </form>
  );
};

const PayBillSplit = () => {
  const [billSplitData, setBillSplitData] = useState<BillSplitParams>({
    id: 0,
    name: "",
    host: { username: "" },
    description: "",
    tag: [],
    user_amount: [],
    status: "Ongoing",
  });
  const { id } = useParams();
  const { authTokens, username } = useContext(AuthContext);
  const navigate = useNavigate();

  const getBillSplit = () => {
    tryCatchFetch(async () => {
      const data = (await APIFetch({
        URL: setBackendURL("billSplit/all"),
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: setAuthorization(authTokens.access),
        },
      })) as BillSplitParams[];

      const find = data.find(({ id: valueId }) => valueId === Number(id));

      if (typeof find === "undefined") {
        console.log("id is not available");
        navigate("/404");
        return;
      }

      setBillSplitData(find);
    });
  };

  const checkOngoing = () => {
    if (billSplitData?.status !== "Ongoing") {
      console.log("bill split is not in ongoing status");
      navigate("/404");
    }
  };

  const checkValidUser = () => {
    const user = billSplitData?.user_amount.map(({ user }) => user);
    const find = user?.find(
      ({ username: findUsername }) => findUsername === username
    );

    if (typeof find === "undefined") {
      console.log("user is not register in the bill split user!");
      navigate("/404");
    }
  };

  useEffect(() => {
    getBillSplit();
  }, []);

  ignoreFirstRender(() => {
    if (typeof billSplitData === "undefined") return;
    checkOngoing();
    checkValidUser();
  }, [billSplitData]);

  return <PayBillSplitContent data={billSplitData as BillSplitParams} />;
};

export default PayBillSplit;
