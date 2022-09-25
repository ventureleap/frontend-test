import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../../Layout/Header";

function AddApplcation() {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [secret, setSecret] = useState();
  const [lang, setLang] = useState();
  const [version, setVersion] = useState();
  const history = useHistory();

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
      .then(function (res) {
        // console.log(res);
        history.push("/applications");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // const id=1
  return (
    <div>
      <Header title="Add new Application" />
      <form onSubmit={handleSubmit}>
        {/* <div>
        id: {id+1}
      </div> */}
        <input
          name="id"
          type="text"
          placeholder="id"
          onChange={(e) => setId(e.target.value)}
        />
        <input
          name="name"
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          name="secret"
          type="text"
          placeholder="secret"
          onChange={(e) => setSecret(e.target.value)}
        />
        <input
          name="lang"
          type="text"
          placeholder="lang"
          onChange={(e) => setLang(e.target.value)}
        />
        <input
          name="version"
          type="number"
          placeholder="version"
          onChange={(e) => setVersion(e.target.value)}
        />
        <button type="submit">add</button>
        <Link to="/applications">Cancel</Link>
      </form>
    </div>
  );
}

export default AddApplcation;
