import React, { useState } from "react";
import "./DynamicForm.scss";
import axios from "axios";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
// import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import Message from "../Public/Message";

function IncomeForm() {
  const [changeBtn, setChangeBtn] = useState(true);
  const [message, setMessage] = useState({});
  const history = useHistory();


  // const [cookies, setCookie] = useCookies(["sessionId"]);
  const setMessageEmpty = () => {
    setTimeout(function () {
      setMessage("");
    }, 5000);
  };
  const handleSignUpSubmit = async (value) => {
    axios
      .post(
        "http://localhost:3000/api/users",
        {
          username: value.username,
          password: value.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        setMessage({
          message: response.data.status,
          status: response.status,
        });
        setMessageEmpty();
      })
      .catch(function (error) {
        setMessage({
          message: error.response.data.error.message,
          status: error.response.status,
        });
        setMessageEmpty();
      });
  };
  const handleLoginSubmit = async (value) => {
    axios
      .post("http://localhost:3000/api/users/login", {
        username: value.username,
        password: value.password,
      })
      .then(function (response) {
        // console.log(response.data);
        // const sessionId = response.data.session;
        // setCookie("sessionId", sessionId, {
        //   secure: true,
        //   sameSite: "None",
        // });
        // console.log("cookie", cookies.sessionId);
        history.push("/applications");
      })
      .catch(function (error) {
        setMessage({
          message: error.response.data.errors[0].message,
          status: error.response.status,
        });
        setMessageEmpty();
      });
  };

  return (
    <div className="form">
      <div className="form__wrapper">
        <div className="form__wrapper__selector">
          <button
            className={changeBtn === true ? "active" : null}
            onClick={() => setChangeBtn(!changeBtn)}
          >
            Sign up
          </button>
          <button
            className={changeBtn === false ? "active" : null}
            onClick={() => setChangeBtn(!changeBtn)}
          >
            Log in
          </button>
        </div>

        {changeBtn === true ? (
          <SignUpForm onSubmit={handleSignUpSubmit} />
        ) : (
          <LoginForm onSubmit={handleLoginSubmit} />
        )}
      </div>
      {message === null ? null : (
        <Message
          responseMessage={message.message}
          responseStatus={message.status}
        />
      )}
    </div>
  );
}

export default IncomeForm;
