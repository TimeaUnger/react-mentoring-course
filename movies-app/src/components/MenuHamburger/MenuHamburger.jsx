import React from "react";
import "./MenuHamburger.css";

const MenuHamburger = () => {
  return (
    <div className="editDeleteMenuWrapper">
      <section className="top-nav">
        <input id="menu-toggle" type="checkbox" />
        <label className="menu-button-container" for="menu-toggle">
          <div className="menu-button"></div>
        </label>
      </section>
    </div>
  );
};

export default MenuHamburger;
