import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './homepage/homepage';
import About from './about/About';
import Messenger from './messages/Messenger';
import Form from './profile/Form';
import Discover from './discover/Discover'


const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} exact></Route>
      <Route path='/discover' element={<Discover />}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/messages' element={<Messenger />}></Route>
      <Route path='/profile' element={<Form />}></Route>
      <Route path='/login' element={<Form />}></Route>
    </Routes>
  );
}

export default Main;