import React from "react";
import "./Header.scss";

function Header({ title, location }) {
  const locationArr = location.slice(1).split("/");

  return (
    <div className="header">
      <div className="header__title">{title}</div>
      <div className="header__breadcrumb">
        {locationArr.map((item, index) => (
          <div key={index} className="header__breadcrumb__item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Header;
