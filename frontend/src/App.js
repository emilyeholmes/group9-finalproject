import './App.css';
import React from 'react';
import Messenger from './components/messages/Messenger';
import Form from './components/profile/Form';
import NavBar from './components/navbar/NavBar';
import About from './components/about/About';
import { ChakraProvider, CSSReset, Box } from '@chakra-ui/react'
import Main from './components/Main'
import { Switch } from '@chakra-ui/react';
import Discover from './components/discover/Discover'

function App() {
  return (
    <div>
      <CSSReset />
      <NavBar />
      {/* <Switch>
        <Main />
      </Switch> */}
      <Discover />
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
