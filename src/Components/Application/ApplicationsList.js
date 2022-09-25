import React, { useState, useEffect } from "react";
import "./ApplicationsList.scss";
import ApplicationListItem from "./ApplicationListItem";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Layout/Header";

function ApplicationList() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    const getApplications = async () => {
      const res = await axios
        .get("http://localhost:3000/api/applications", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          setApplications(response.data);
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getApplications();
  }, []);
  return (
    <div className="application-list">
      <Header title="This is a code challenge for Venture Leap" />
      <Link to="/applications/create">Add Application</Link>
      <ApplicationListItem applicationsList={applications} />
    </div>
  );
}

export default ApplicationList;
