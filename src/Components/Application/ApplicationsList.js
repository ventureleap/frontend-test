import React, { useState, useEffect } from "react";
import "./ApplicationsList.scss";
import ApplicationListItem from "./ApplicationListItem";
import axios from "axios";
import { Cookies } from "react-cookie";

function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const cookies = new Cookies();

  useEffect(() => {
    const sessionId = cookies.get("sessionId");
    axios.defaults.withCredentials = true;
    const getApplications = async () => {
      const res = await axios
        .get("http://localhost:3000/api/applications", {
          headers: {
            "Content-Type": "application/json",
            //   Cookie: `sessionId=${sessionId}`,
          },
        })
        .then(function (response) {
          console.log(response);
          setApplications(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    // const getApplications = async () => {
    //   const testURL = "https://frontend-test.getsandbox.com/applications";
    //   const myHeaders = new Headers();
    //   myHeaders.append("Content-Type", "application/json");
    //   myHeaders.append("Cookie", `sessionId=${sessionId}`);
    //   myHeaders.append("asghar", `sessionId=${sessionId}`);

    //   const myInit = {
    //     method: "GET",
    //     mode: "cors",
    //     headers: myHeaders,
    //     credentials: "include",
    //   };

    //   const myRequest = new Request(testURL, myInit);

    //   fetch(myRequest)
    //     .then(function (response) {
    //       return response;
    //     })
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (e) {
    //       console.log(e);
    //     });
    // };
    getApplications();
  }, []);
  return (
    <div className="application-list">
      <div className="application-list__header">
        <h4 className="application-list__header__title">
          This is a code challenge for Venture Leap
        </h4>
        <div className="application-list__header__breadcrumb">
          <div className="breadcrumb-item">item1</div>

          <div className="breadcrumb-item">item2</div>
          <div className="breadcrumb-item">item10</div>
        </div>
      </div>
      <ApplicationListItem applicationsList={applications} />
    </div>
  );
}

export default ApplicationList;
