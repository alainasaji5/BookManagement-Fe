import React from 'react';

// You can import an external image or use a local path like this:
// import logo from './path-to-your-logo.svg'; 

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {/* You can replace the src below with the actual path to your logo */}
          <i class="fa-solid fa-book ms-5 me-2"></i>
          Book Management
        </a>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup" className='d-flex justify-content-end'>
      <div class="navbar-nav ">
        <a class="nav-link"  href="/">Home</a>
        <a class="nav-link" href="/form">Add Book</a>
        
      </div>
    </div>
      </div>
    </nav>
  );
}

export default Header;
