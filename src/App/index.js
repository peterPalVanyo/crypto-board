import React from 'react';
import './App.css';
import Settings from '../settings'
import Applayout from './AppLayout'
import AppBar from './AppBar'
import {AppProvider} from './AppProvider'


function App() {
  return (
    <Applayout>
      <AppProvider>
        <AppBar/>
        <Settings/>
      </AppProvider>
    </Applayout>
  );
}

export default App;
