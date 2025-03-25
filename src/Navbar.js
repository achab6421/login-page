import React from 'react';

function Navbar({ setPage }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">MyApp</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => setPage('login')}>Login</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => setPage('signup')}>Sign Up</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
}

export default Navbar;
