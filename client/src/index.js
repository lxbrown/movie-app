import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './App';
import {
  BrowserRouter
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
