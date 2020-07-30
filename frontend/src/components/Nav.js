import React from "react";

const Nav = () => {
  return (
    <nav className="navbar nav-user">
      <a class=" nav-user-brand ">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/blog-730e6.appspot.com/o/49398.png?alt=media&token=16314b95-b130-4d39-8a0b-4ecfeb11b056"
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
          loading="lazy"
        />
        <span>reddit</span>
      </a>
      <span className="nav-search-bar ">
        <input placeholder="Search" type="text" />
      </span>
      <span className="user-info-bar">
        <button className="btn btn-primary mr-1">Sign Up</button>
        <button className="btn btn-primary">Sign In</button>
      </span>
    </nav>
  );
};

export default Nav;
