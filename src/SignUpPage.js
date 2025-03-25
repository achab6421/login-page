import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zwgazubwwjtqjxnhisos.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3Z2F6dWJ3d2p0cWp4bmhpc29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MDEzMDEsImV4cCI6MjA1ODQ3NzMwMX0.YHAN28S3wOawpOL9qkKU-LZ_3R_ijrT4ZgBZPYolJsg';
const supabase = createClient(supabaseUrl, supabaseKey);

function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setMessage(error.message);
    } else {
      const { data, error: insertError } = await supabase
        .from('users')
        .insert([{ name, account: email, password }]);
      if (insertError) {
        setMessage(insertError.message);
      } else {
        setMessage('註冊成功！請檢查您的電子郵件以確認您的帳戶。');
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('account', loginEmail)
      .eq('password', loginPassword);
    if (error) {
      setLoginMessage(error.message);
    } else if (data.length > 0) {
      setLoginMessage('Login successful!');
    } else {
      setLoginMessage('Invalid email or password.');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center">註冊</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">姓名</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="輸入您的姓名"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">電子郵件</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="輸入您的電子郵件"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">密碼</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="輸入您的密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">註冊</button>
        </form>
        {message && <div className="mt-3 alert alert-info">{message}</div>}
      </div>
    </div>
  );
}

export default SignUpPage;
