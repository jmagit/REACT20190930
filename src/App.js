import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Demos, { Saluda } from "./demos";
import Calculadora from "./calculadora";
import FotoMuro from "./fotos";
import ErrorBoundary from "./ErrorBoundary";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.menu = [
      {
        texto: "Demos",
        componente: (
          <Demos
            destinatario="Madrid"
            init={0}
            delta={Saluda({ nombre: "tu" })}
          />
        )
      },
      { texto: "Calculadora", componente: <Calculadora coma /> },
      { texto: "Muro", componente: <FotoMuro /> }
    ];
    this.state = { componenteActual: this.menu[0].componente };
    this.selecciona = index =>
      this.setState({ componenteActual: this.menu[index].componente });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <p>Hola Mundoooo</p>
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
        </a> */}
          {this.menu.map((item, index) => (
            <input
              type="button"
              value={item.texto}
              onClick={this.selecciona.bind(this, index)}
            />
          ))}
        </header>
        <ErrorBoundary>
          <div className="container-fluid">
            {this.state.componenteActual}
            {/* <FotoMuro />
             <Calculadora coma /> 
        <Demos
          destinatario="Madrid"
          init={0}
          delta={Saluda({ nombre: "tu" })}
        />
        <Saluda /> */}
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}
