import React from 'react';
import './App.css';
import Settings from '../settings'
import Applayout from './AppLayout'
import AppBar from './AppBar'
import {AppProvider} from './AppProvider'
import Content from '../shared/Content'


function App() {
  return (
    <Applayout>
      <AppProvider>
        <AppBar/>
        <Content>
          <Settings/>
        </Content>
      </AppProvider>
    </Applayout>
  );
}

export default App;
