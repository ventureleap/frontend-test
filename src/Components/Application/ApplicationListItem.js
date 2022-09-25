import React from "react";
import "./ApplicationListItem.scss";

function ApplicationListItem({ applicationsList }) {
  return (
    <div className="application-list-item">
      
      {applicationsList.map((item) => {
        <div key={item.id}>{item.name}</div>;
      })}
    </div>
  );
}

export default ApplicationListItem;
