import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Demos, { Saluda } from "./demos";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hola Mundoooo</p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Demos destinatario="Madrid" init={0} delta={Saluda({ nombre: "tu" })} />
      <Saluda />
    </div>
  );
}

export default App;
