import React, { Component } from "react";
import PropTypes from "prop-types";

export function Saluda(props) {
  if (props.tipo === 0) return <h1>Adios {props.nombre}</h1>;
  return <h1>Hola {props.nombre}</h1>;
}
export class Card extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.titulo}</h2>
        {this.props.children}
      </div>
    );
  }
}
function ListItem(props) {
  return <li key={props.value}>{props.text}</li>;
}
function UnsortedList(props) {
  return (
    <ul>
      {props.listado &&
        props.listado.map(item => (
          <ListItem value={item[props.value]} text={item[props.text]} />
        ))}
    </ul>
  );
}
export class Lisado extends Component {
  constructor(props) {
    super(props);
    this.lisado = [
      {
        id: 1,
        nombre: "Madrid",
        municipios: [{ nombre: "Madrid" }, { nombre: "Alcobendas" }]
      },
      { id: 2, nombre: "Barcelona" },
      { id: 3, nombre: "Sevilla" }
    ];
  }
  render() {
    return (
      <ul>
        {this.lisado.map(item => (
          <li key={item.id}>
            {item.nombre}
            <UnsortedList
              listado={item.municipios}
              value="nombre"
              text="nombre"
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default class Demos extends Component {
  static propTypes = {
    destinatario: PropTypes.string.isRequired,
    init: PropTypes.number.isRequired,
    delta: PropTypes.any,
    onCambia: PropTypes.func
  };
  static defaultProps = {
    delta: 5
  };

  render() {
    let saludo = <h1>Adios</h1>;
    return (
      <div>
        <Lisado />
        <Card titulo="Esto es una tarjeta">
          El delta es: {this.props.delta}
          <Saluda nombre={this.props.destinatario} />
          PropTypes exporta una gama de validadores que se pueden usar para
          garantizar que los datos que reciba sean válidos. Cuando se
          proporciona un valor no válido, se mostrará una advertencia en la
          consola del navegador pero, por razones de rendimiento, solo se
          verifica en modo de desarrollo.
        </Card>
      </div>
    );
  }
}
