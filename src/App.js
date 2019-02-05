import React, { Component } from 'react';
import './App.css';
import "antd/dist/antd.css";
import WrappedDragger from './components/Dragger.js';

class App extends Component {

  render() {

    return (
    <div id="body">
      <div id="header">
        <h1 id="title">Files droper</h1>
      </div>

      <div id="content">
        <WrappedDragger />
      </div>

      <div id="footer">
        <h2 id="signature">Florian Merle</h2>
      </div>
    </div>
    );
  }
}

export default App;
