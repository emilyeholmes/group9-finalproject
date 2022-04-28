import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Homepage from './homepage/homepage';
import About from './about/About';
import Messenger from './messages/Messenger';
import Form from './profile/Form';
import Discover from './discover/Discover';
import Login from './login-signup/Login';
import useToken from './useToken';


const Main = () => {
  const { token, setToken } = useToken();
  
  return (
    <Routes>
      <Route path='/' element={<Homepage />} exact></Route>
      <Route path='/discover' element={!token ? <Navigate to="/login" /> :  <Discover token={token} />}></Route>
      <Route path='/about' element={!token ? <Navigate to="/login" /> :  <About token={token}/>}></Route>
      <Route path='/messages' element={!token ? <Navigate to="/login" /> :  <Messenger token={token}/>}></Route>
      <Route path='/profile' element={!token ? <Navigate to="/login" /> :  <Form token={token}/>}></Route>
      <Route path='/login' element={!token ? <Login setToken={setToken} /> : <Navigate to="/discover" />}></Route>
    </Routes>
  );
}

export default Main;