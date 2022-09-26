import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import Header from "../../Layout/Header";

function EditApplcation() {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [secret, setSecret] = useState();
  const [lang, setLang] = useState();
  const [version, setVersion] = useState();
  const [applications, setApplications] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { idApp } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/applications/${idApp}`, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      })
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/api/applications/${idApp}`, {
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

  console.log(applications);
  
  return (
    <>
      <Header title={`Edit Application with name:${name}`} />
      {loading && <ReactLoading type="balls" color="#dddddd" />}
      {!loading && (
        <>
          <form onSubmit={handleSubmit}>
            <input
              name="id"
              type="text"
              placeholder="id"
              defaultValue={applications.id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              name="name"
              type="text"
              placeholder="name"
              defaultValue={applications.name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              name="secret"
              type="text"
              placeholder="secret"
              defaultValue={applications.secret}
              onChange={(e) => setSecret(e.target.value)}
            />
            <input
              name="lang"
              type="text"
              placeholder="lang"
              defaultValue={applications.lang}
              onChange={(e) => setLang(e.target.value)}
            />
            <input
              name="version"
              type="number"
              placeholder="version"
              defaultValue={applications.version}
              onChange={(e) => setVersion(e.target.value)}
            />
            <button type="submit">Edit</button>
            <Link to="/applications">Cancel</Link>
          </form>
        </>
      )}
    </>
  );
}

export default EditApplcation;
