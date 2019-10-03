import React, { Component } from "react";
import loading from "./loading.gif";

export class ValidationMessage extends React.Component {
  render() {
    if (this.props.msg) {
      return <span className="errorMsg">{this.props.msg}</span>;
    }
    return null;
  }
}
export class ErrorMessage extends React.Component {
  render() {
    if (this.props.msg) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {this.props.msg}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={e => this.props.onClear && this.props.onClear()}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
    return null;
  }
}
export class Esperando extends React.Component {
  render() {
    return (
      <div>
        <div className="ajax-wait"></div>
        <img src={loading} alt="Cargando ..." />
      </div>
    );
  }
}
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el siguiente renderizado lo muestre
    return { hasError: true, error: error };
  }
  componentDidCatch(error, info) {
    // También puedes registrar el error en un servicio de reporte de errores
    this.setState({ hasError: true, error: error, errorInfo: info });
  }
  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier interfaz de repuesto
      return (
        <div>
          <h1>ERROR</h1>
          {this.state.error && <p>this.state.error.toString()</p>}
          {this.state.errorInfo && <p>this.state.errorInfo.componentStack</p>}
        </div>
      );
    }
    return this.props.children;
  }
}
