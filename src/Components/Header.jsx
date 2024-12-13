import React from 'react';
import { Link } from 'react-router-dom';

// Example: Import an external image or font-awesome CSS if required
// import logo from './path-to-your-logo.svg';
// import 'path-to-fontawesome.css';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/">
          {/* Replace <i> with your logo or keep it */}
          <i className="fa-solid fa-book ms-5 me-2"></i>
          Book Management
        </a>
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link text-white"  to='/'><i class="fa-solid fa-house me-1"></i>Home</Link>
            <Link className="nav-link text-white" to="/form"><i class="fa-solid fa-plus me-1"></i>Add Book</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
