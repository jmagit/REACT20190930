import React, { Component } from "react";
import PropTypes from "prop-types";
import { ValidationMessage } from "./ErrorBoundary";
import { runInThisContext } from "vm";
export default class PersonasForm extends Component {
  constructor(props) {
    super(props);
    this.state = { elemento: props.elemento, msgErr: [], invalid: false };
    this.handleChange = this.handleChange.bind(this);
    this.onSend = () => {};
    this.onCancel = () => {};
  }
  handleChange(event) {
    const cmp = event.target.name;
    const valor = event.target.value;
    this.setState(prev => {
      prev.elemento[cmp] = valor;
      return { elemento: prev.elemento };
    });
    this.validar();
  }
  validar() {
    if (this.form) {
      const errors = {};
      let invalid = false;
      for (var cntr of this.form.elements) {
        if (cntr.name) {
          errors[cntr.name] = cntr.validationMessage;
          if (!errors[cntr.name])
            switch (cntr.name) {
              case "nombre":
                errors[cntr.name] =
                  cntr.value !== cntr.value.toUpperCase()
                    ? "Debe estar en mayusculas"
                    : null;
                break;
            }
          invalid =
            invalid ||
            (errors[cntr.name] !== "" &&
              errors[cntr.name] !== null &&
              typeof errors[cntr.name] !== "undefined");
        }
      }
      this.setState({ msgErr: errors, invalid: invalid });
    }
  }
  componentDidMount() {
    this.validar();
  }
  render() {
    return (
      <form
        ref={tag => {
          this.form = tag;
        }}
      >
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={this.state.elemento.nombre}
            onChange={this.handleChange}
            required
            minLength="2"
            maxLength="10"
          />
          <ValidationMessage msg={this.state.msgErr.nombre} />
        </div>
        <div className="form-group">
          <label htmlFor="apellidos">Apellidos</label>
          <input
            type="text"
            className="form-control"
            id="apellidos"
            name="apellidos"
            value={this.state.elemento.apellidos}
            onChange={this.handleChange}
            minLength="2"
            maxLength="10"
          />
          <ValidationMessage msg={this.state.msgErr.apellidos} />
        </div>
        {this.state.elemento.nombre} {this.state.elemento.apellidos}
        <div className="form-group">
          <button
            className="btn"
            type="button"
            disabled={this.state.invalid}
            onClick={this.onSend}
          >
            Enviar
          </button>
          <button className="btn" type="button" onClick={this.onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    );
  }
}
