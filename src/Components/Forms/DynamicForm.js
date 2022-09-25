import React, { useState } from "react";
import "./DynamicForm.scss";
import axios from "axios";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

function IncomeForm() {
  const [changeBtn, setChangeBtn] = useState(true);
  const [message, setMessage] = useState("");
  const history = useHistory();

  const alert = (msg) => {
    if (msg === "") {
      return null;
    } else if (msg === "ok") {
      return "User successfully created:)";
    } else {
      return "User already exists!";
    }
  };

  const [cookies, setCookie] = useCookies(["sessionId"]);
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
        setMessage(response.data.status);
        setTimeout(function () {
          setMessage("");
        }, 5000);
      })
      .catch(function (error) {
        setMessage(error.response.data.error.message);
        setTimeout(function () {
          setMessage("");
        }, 5000);
      });
  };
  const handleLoginSubmit = async (value) => {
    axios
      .post("http://localhost:3000/api/users/login", {
        username: value.username,
        password: value.password,
      })
      .then(function (response) {
        console.log(response.data);
        const sessionId = response.data.session;
        setCookie("sessionId", sessionId, {
          secure: true,
          sameSite: "None",
        });
        console.log("cookie", cookies.sessionId);
        history.push("/applications");
      })
      .catch(function (error) {
        console.log(error);
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
      {alert(message) === null ? null : alert(message) ===
        "User successfully created:)" ? (
        <div className="form__message form__message--success">
          {alert(message)}
        </div>
      ) : (
        <div className="form__message form__message--danger">
          {alert(message)}
        </div>
      )}
    </div>
  );
}

export default IncomeForm;
