import React from "react";
import "./Header.scss";

function Header({ title }) {
  return (
    <div className="header">
      <h4 className="header__title">{title}</h4>
      <div className="header__breadcrumb">
        <div className="header__breadcrumb__item">item1</div>
        <div className="header__breadcrumb__item">item2</div>
        <div className="header__breadcrumb__item">item10</div>
      </div>
    </div>
  );
}

export default Header;
