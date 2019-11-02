import React from 'react';
import './App.css';
import WelcomeMessage from './WelcomeMessage'
import styled, {css} from 'styled-components'
import Applayout from './AppLayout'


function App() {
  return (
    <Applayout>
      <WelcomeMessage/>
    </Applayout>
  );
}

export default App;
