import React from "react";
import "./ApplicationListItem.scss";

function ApplicationListItem({ applicationsList }) {
  return (
    <div className="application-list-item">
      yasamaaaan
      {applicationsList.map((item) => {
        <div key={item.id}>{item.name}</div>;
      })}
    </div>
  );
}

export default ApplicationListItem;
