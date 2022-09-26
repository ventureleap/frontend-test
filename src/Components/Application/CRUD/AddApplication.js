import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Header from "../../Layout/Header";
import "./CRUDApplication.scss";

function AddApplcation() {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [secret, setSecret] = useState();
  const [lang, setLang] = useState();
  const [version, setVersion] = useState();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/applications", {
        id: id,
        name: name,
        secret: secret,
        lang: lang,
        version: version,
      })
      .then(function () {
        history.push("/applications");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Header title="Add new Application" location={location.pathname} />
      <div className="crud-form">
        <form onSubmit={handleSubmit} className="crud-form__card">
          <label htmlFor="id">Id:</label>
          <input
            name="id"
            type="text"
            onChange={(e) => setId(e.target.value)}
          />
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="secret">Secret:</label>
          <input
            name="secret"
            type="text"
            onChange={(e) => setSecret(e.target.value)}
          />
          <label htmlFor="lang">Lang:</label>
          <input
            name="lang"
            type="text"
            onChange={(e) => setLang(e.target.value)}
          />
          <label htmlFor="version">Version:</label>
          <input
            name="version"
            type="number"
            onChange={(e) => setVersion(e.target.value)}
          />
          <div className="crud-form__card__bottom">
            <Link className="btn-item btn-item--red" to="/applications">
              Cancel
            </Link>
            <button className="btn-item btn-item--green" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddApplcation;
