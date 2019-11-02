import React from 'react';
import './App.css';
import WelcomeMessage from './WelcomeMessage'
import styled, {css} from 'styled-components'
import Applayout from './AppLayout'
import AppBar from './AppBar'


function App() {
  return (
    <Applayout>
      <AppBar/>
      <WelcomeMessage/>
    </Applayout>
  );
}

export default App;
