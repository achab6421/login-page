import React, { useState } from 'react';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

function MainPage() {
  const [page, setPage] = useState('login');

  return (
    <div>
      <Navbar setPage={setPage} />
      {page === 'login' && <LoginPage />}
      {page === 'signup' && <SignUpPage />}
    </div>
  );
}

export default MainPage;
