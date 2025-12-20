import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container d-flex justify-content-center">
        <span className="navbar-brand mb-0 h1 fw-bold text-white">
          PA CRUD APP
        </span>
      </div>
    </nav>
  );
};
export default Header;
