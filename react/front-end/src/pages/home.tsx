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

  const getBillSplitCallback = () => {
    
    interface dictFunctionParams {
      [name: string]: (value: BillSplitParams) => void; 
    }

    const navigate = useNavigate();
    const dictFunction: dictFunctionParams = {
      "pending": ({ id }) => {
        navigate(`/bill-split/edit/${id}`)
      },

      "ongoing": ({ }) => {
        navigate("create-bill-split")
      },

      "request": ({ id }) => {
        console.log("Hello world")
        navigate(`/bill-split/readonly/${id}`)
      },
      "reject": ({ id }) => {
        navigate(`/bill-split/reject/${id}`)
      }
    }

    return dictFunction[choiceValue];
  }

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
          {role === "admin" ? (
            <ChoiceElement value="request" />
          ) : (
          <>
            <ChoiceElement value="pending" />
            <ChoiceElement value="reject" />
          </>
          )}
        </ChoiceBox>

        <BillSplitBox query={billSplit} queryCallback={getBillSplitCallback()}/>
      </main>
    </div>
  );
};

export default Home;
