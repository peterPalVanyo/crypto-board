import React from 'react';
import './App.css';
import WelcomeMessage from './WelcomeMessage'
import Applayout from './AppLayout'
import AppBar from './AppBar'
import {AppProvider} from './AppProvider'


function App() {
  return (
    <Applayout>
      <AppProvider>
        <AppBar/>
        <WelcomeMessage/>
      </AppProvider>
    </Applayout>
  );
}

export default App;
