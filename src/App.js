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
import { CounterStored } from "./counter-strored";
import { CounterUpCmd, store } from "./my-store";
import { Notificaciones } from "./notificaciones";

function PageNotFound(props) {
  return <h1>404 Page not found!</h1>;
}
export default class App extends Component {
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
              <Link to="/count">count</Link>
            </p>
          </header>
          <ErrorBoundary>
            <div className="container-fluid">
              <Notificaciones />
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
                  path="/count"
                  render={() => (
                    <button onClick={e => store.CounterUp()}>Sube</button>
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
