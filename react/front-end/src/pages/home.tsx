import "../assets/css/home.css";

import Navbar from "../components/navbar";
import { BillSplitParams } from "../components/billSplitCard";
import BillSplitBox from "../components/billSplitBox";
import AuthContext from "../context/authContext";
import {
  setBackendURL,
  setAuthorization,
  APIFetch,
  tryCatchFetch,
} from "../utility/myapi";
import {
  HostAttribute,
  AmountUserAttribute,
  ProgressBarAttribute,
} from "../components/billSplitAttribute";
import { ChoiceBox, ChoiceElement } from "../components/choice";

import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserProfileContext } from "../context/userProfileContext";

const Home = () => {
  const { authTokens, username, role } = useContext(AuthContext);
  const { getImage } = useContext(UserProfileContext);
  const [billSplit, setBillSplit] = useState<BillSplitParams[]>([]);
  const [choiceValue, setChoiceValue] = useState("ongoing");

  const getBillSplit = async () => {
    tryCatchFetch(async () => {
      const data = (await APIFetch({
        URL: setBackendURL(`billSplit/${choiceValue}`),
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: setAuthorization(authTokens.access),
        },
      })) as BillSplitParams[];

      setBillSplit(data);
    });
  };

  const HandleBillSplitBox = () => {
    interface DictValueParams {
      queryCallback: (value: BillSplitParams) => void;
      queryChildren: JSX.Element[] | undefined;
    }

    interface DictParams {
      [name: string]: DictValueParams;
    }
    const navigate = useNavigate();

    const dict: DictParams = {
      ongoing: {
        queryCallback: ({ id }) => {
          navigate(`/pay-bill-split/${id}`);
        },
        queryChildren: undefined,
      },

      pending: {
        queryCallback: ({ id }) => {
          navigate(`/bill-split/edit/${id}`);
        },
        queryChildren: [<HostAttribute />, <AmountUserAttribute />],
      },

      request: {
        queryCallback: ({ id }) => {
          navigate(`/bill-split/readonly/${id}`);
        },
        queryChildren: [<HostAttribute />, <AmountUserAttribute />],
      },

      reject: {
        queryCallback: ({ id }) => {
          navigate(`/bill-split/reject/${id}`);
        },
        queryChildren: [<HostAttribute />, <AmountUserAttribute />],
      },

      host: {
        queryCallback: ({ id }) => {
          navigate(`/bill-split/view/${id}`);
        },
        queryChildren: [<HostAttribute />, <ProgressBarAttribute />],
      },
    };

    return <BillSplitBox query={billSplit} {...dict[choiceValue]} />;
  };

  useEffect(() => {
    getBillSplit();
  }, [authTokens, choiceValue]);

  return (
    <div className="pages d-flex flex-column">
      <Navbar title="Home" />

      <main className="box text-color-white flex-grow-1 d-flex flex-column gap--l">
        <div className="greeting">
          <div className="d-flex justify-content-center">
            <img
              src={getImage(username)}
              alt=""
              className="img img--xl img--round"
            />
          </div>
          <div className="d-flex flex-column justify-content-center">
            <p className="my-text">Welcome Back!!</p>
            <h1 className="username my-header">{username}</h1>
          </div>
        </div>

        <ChoiceBox variable={choiceValue} callback={setChoiceValue}>
          <ChoiceElement value="ongoing" />
          <ChoiceElement value="host" />
          {role === "admin" ? (
            <ChoiceElement value="request" />
          ) : (
            <>
              <ChoiceElement value="pending" />
              <ChoiceElement value="reject" />
            </>
          )}
        </ChoiceBox>

        <HandleBillSplitBox />
      </main>
    </div>
  );
};

export default Home;
