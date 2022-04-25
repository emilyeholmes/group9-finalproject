import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './homepage/homepage';
import About from './about/About';
import Messenger from './messages/Messenger';
import Form from './profile/Form';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} exact></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/messages' element={<Messenger />}></Route>
      <Route path='/profile' element={<Form />}></Route>
    </Routes>
  );
}

export default Main;