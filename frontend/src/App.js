import './App.css';
import React, { useState } from 'react';
import NavBar from './components/navbar/NavBar';
import { ChakraProvider, CSSReset, Box } from '@chakra-ui/react'
import Main from './components/Main'
import useToken from './components/useToken';

function App() {
  const { token, setToken } = useToken();
  
  return (
    <div>
      <CSSReset />
      <NavBar setToken={setToken} />
      <Main setToken={setToken} token={token} />
      {/* <Switch>
      </Switch> */}
      {/* <Discover /> */}
    </div>
  )
}

/*
function App() {
  return (
    <div>
      <CSSReset />
      <Box p={4} padding='none'>
        <Form />
      </Box>
    </div>
  )
}
*/

/*
function App() {
  return (
    <div>
      <CSSReset />
      <NavBar />
      <Box p={4} padding='none'>
        <About />
      </Box>
    </div>
  )
}
*/


/*
function App() {
  return (
    <div>
      <NavBar />
      <Messenger />
    </div>
  );
}
*/



export default App;
