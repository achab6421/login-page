// src/LoginPage.js
import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import userData from './userData';  // 引入靜態的 userData 資料

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [userList, setUserList] = useState(userData); // 用來顯示所有用戶資料

  // 重新整理頁面時，清除 localStorage 中的資料，並載入靜態預設資料
  useEffect(() => {
    // 不從 localStorage 載入資料，而是直接使用 userData
    setCurrentUser(null);
    setIsLoggedIn(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // 從 userData 中查找用戶
    const user = userData.find((user) => user.account === username && user.password === password);

    if (user) {
      setErrorMessage('');
      setIsLoggedIn(true);
      setCurrentUser(user);  // 登入後儲存當前用戶資料
      alert(`登入成功！歡迎，${user.name}`);
    } else {
      setErrorMessage('帳號或密碼錯誤');
    }
  };

  const handleEditProfile = () => {
    setEditing(true);
  };

  const handleSaveProfile = () => {
    // 修改資料後，只更新 currentUser 資料
    const updatedUserData = {
      ...currentUser,
      account: username,
      password: password,
      name: currentUser.name,  // 可以修改 name
    };

    // 更新 userList，這樣顯示的用戶資料就會反映出來
    const updatedUserList = userList.map(user =>
      user.account === currentUser.account ? updatedUserData : user
    );
    setUserList(updatedUserList); // 更新顯示的資料

    setCurrentUser(updatedUserData);  // 更新當前用戶
    setEditing(false);
    alert('資料已更新');
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

  return (
    <div className="login-container">
      <h2>{isLoggedIn ? '修改資料' : '登入'}</h2>
      
      {/* 顯示所有用戶資料 */}
      <h3>所有用戶資料</h3>
      <ul>
        {userList.map((user, index) => (
          <li key={index}>
            <strong>姓名:</strong> {user.name} 
            <strong>帳號:</strong> {user.account} 
            <strong>密碼:</strong> {user.password}<br />
          </li>
        ))}
      </ul>

      {isLoggedIn ? (
        <div>
          {!editing ? (
            <div>
              <button onClick={handleEditProfile}>修改資料</button>
              <button onClick={handleLogout}>登出</button>
            </div>
          ) : (
            <div>
              <div className="input-group">
                <label htmlFor="new-username">新的帳號</label>
                <input
                  type="text"
                  id="new-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="輸入新的帳號"
                />
              </div>
              <div className="input-group">
                <label htmlFor="new-name">新的姓名</label>
                <input
                  type="text"
                  id="new-name"
                  value={currentUser.name}
                  onChange={handleChangeName}
                  placeholder="輸入新的姓名"
                />
              </div>
              <div className="input-group">
                <label htmlFor="new-password">新的密碼</label>
                <input
                  type="password"
                  id="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="輸入新的密碼"
                />
              </div>
              <button onClick={handleSaveProfile}>儲存修改</button>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="username">帳號</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="輸入您的帳號"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">密碼</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="輸入您的密碼"
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="login-btn">登入</button>
        </form>
      )}
    </div>
  );
}

export default LoginPage;
