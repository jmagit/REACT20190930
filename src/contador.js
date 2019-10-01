import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Contador extends Component {
  static propTypes = {
    init: PropTypes.number.isRequired,
    delta: PropTypes.number,
    onCambia: PropTypes.func
  };
  static defaultProps = {
    delta: 1
  };
  constructor(props) {
    super(props);
    this.state = { contador: props.init };

    this.sube = function() {
      this.calcula(this.props.delta);
    };
    this.baja.bind(this);
  }
  calcula(delta) {
    this.setState((perv, props) => {
      const nuevo = perv.contador + delta;
      if (this.props.onCambia) this.props.onCambia(nuevo);
      return { contador: nuevo };
    });
  }
  baja() {
    this.calcula(-this.props.delta);
  }

  render() {
    return (
      <div>
        <h1>{this.state.contador}</h1>
        <p>
          <input type="button" value="-" onClick={this.baja.bind(this)} />
          <input type="button" value="+" onClick={this.sube.bind(this)} />
          <input
            type="button"
            value="Init"
            onClick={e => this.setState({ contador: this.props.init })}
          />
        </p>
      </div>
    );
  }
}
