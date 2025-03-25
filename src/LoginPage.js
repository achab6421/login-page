import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './LoginPage.css';

const supabaseUrl = 'https://zwgazubwwjtqjxnhisos.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3Z2F6dWJ3d2p0cWp4bmhpc29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MDEzMDEsImV4cCI6MjA1ODQ3NzMwMX0.YHAN28S3wOawpOL9qkKU-LZ_3R_ijrT4ZgBZPYolJsg';
const supabase = createClient(supabaseUrl, supabaseKey);

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUserList(data);
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('account', username)
      .eq('password', password);

    if (error) {
      setErrorMessage('登入錯誤：' + error.message);
    } else if (data.length > 0) {
      setErrorMessage('');
      setIsLoggedIn(true);
      setCurrentUser(data[0]);
      alert(`登入成功！歡迎，${data[0].name}`);
    } else {
      setErrorMessage('帳號或密碼錯誤');
    }
  };

  const handleEditProfile = () => {
    setEditing(true);
  };

  const handleSaveProfile = async () => {
    const updatedUserData = {
      ...currentUser,
      account: username,
      password: password,
      name: currentUser.name,
    };

    const { data, error } = await supabase
      .from('users')
      .update(updatedUserData)
      .eq('id', currentUser.id);

    if (error) {
      alert('更新資料錯誤：' + error.message);
    } else {
      setUserList(userList.map(user => (user.id === currentUser.id ? updatedUserData : user)));
      setCurrentUser(updatedUserData);
      setEditing(false);
      alert('資料已更新');
    }
  };

  const handleChangeName = (e) => {
    setCurrentUser({
      ...currentUser,
      name: e.target.value
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUsername('');
    setPassword('');
  };

  const handleDeleteProfile = async () => {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', currentUser.id);

    if (error) {
      alert('刪除資料錯誤：' + error.message);
    } else {
      setUserList(userList.filter(user => user.id !== currentUser.id));
      handleLogout();
      alert('資料已刪除');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">{isLoggedIn ? '修改資料' : '登入'}</h2>
      
      <h3 className="text-center">所有用戶資料</h3>
      <ul className="list-group mb-3">
        {userList.map((user, index) => (
          <li key={index} className="list-group-item">
            <strong>姓名:</strong> {user.name} 
            <strong>帳號:</strong> {user.account} 
            <strong>密碼:</strong> {user.password}<br />
          </li>
        ))}
      </ul>

      {isLoggedIn ? (
        <div className="d-flex justify-content-center">
          {!editing ? (
            <div>
              <button className="btn btn-secondary me-2" onClick={handleEditProfile}>修改資料</button>
              <button className="btn btn-danger me-2" onClick={handleDeleteProfile}>刪除帳號</button>
              <button className="btn btn-danger" onClick={handleLogout}>登出</button>
            </div>
          ) : (
            <div>
              <div className="mb-3">
                <label htmlFor="new-username" className="form-label">新的帳號</label>
                <input
                  type="text"
                  className="form-control"
                  id="new-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="輸入新的帳號"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="new-name" className="form-label">新的姓名</label>
                <input
                  type="text"
                  className="form-control"
                  id="new-name"
                  value={currentUser.name}
                  onChange={handleChangeName}
                  placeholder="輸入新的姓名"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="new-password" className="form-label">新的密碼</label>
                <input
                  type="password"
                  className="form-control"
                  id="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="輸入新的密碼"
                />
              </div>
              <button className="btn btn-primary" onClick={handleSaveProfile}>儲存修改</button>
            </div>
          )}
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <form onSubmit={handleLogin} className="login-form">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">帳號</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="輸入您的帳號"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">密碼</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="輸入您的密碼"
              />
            </div>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <button type="submit" className="btn btn-primary">登入</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
