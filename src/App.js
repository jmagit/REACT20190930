import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Demos, { Saluda } from "./demos";
import Calculadora from "./calculadora";
import FotoMuro from "./fotos";
import ErrorBoundary from "./ErrorBoundary";
import PersonasMnt from "./personas";
import Blog from "./blog";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";

function PageNotFound(props) {
  return <h1>404 Page not found!</h1>;
}
export default class App extends Component {
  constructor(props) {
    super(props);
    this.menu = [
      {
        texto: "Blog",
        componente: <Blog />
      },
      {
        texto: "Personas",
        componente: <PersonasMnt />
      },
      {
        texto: "Calculadora",
        componente: <Calculadora />
      },
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
      { texto: "Muro", componente: <FotoMuro /> }
    ];
    this.state = { componenteActual: this.menu[0].componente };
    this.selecciona = index =>
      this.setState({ componenteActual: this.menu[index].componente });
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              <Link to="/demos">demos</Link> |&nbsp;
              <Link to="/chisme/de/hacer/numeros">calculadora</Link> |&nbsp;
              <Link to="/personas">personas</Link> |&nbsp;
              <Link to="/personas/2">pepito</Link> |&nbsp;
              <Link to="/blog">blog</Link> |&nbsp;
              <Link to="/calculadora">calculadora</Link> |&nbsp;
              <Link to="/falsa">falsa</Link>
            </p>
          </header>
          <ErrorBoundary>
            <div className="container-fluid">
              <Switch>
                <Route
                  path="/demos"
                  render={() => (
                    <Demos
                      destinatario="Madrid"
                      init={0}
                      delta={Saluda({ nombre: "tu" })}
                    />
                  )}
                />
                <Route
                  path="/chisme/de/hacer/numeros"
                  component={Calculadora}
                  exact
                />
                <Route path="/personas" component={PersonasMnt} exact />
                <Route path="/personas/:id" component={PersonasMnt} exact />
                <Route path="/blog" component={Blog} exact />
                <Redirect from="/" to="/demos" exact />
                <Redirect
                  from="/calculadora"
                  to="/chisme/de/hacer/numeros"
                  exact
                  push
                />
                <Route component={PageNotFound} exact />
              </Switch>
            </div>
          </ErrorBoundary>
        </div>
      </BrowserRouter>
    );
  }
}
