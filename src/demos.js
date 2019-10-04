import React, { Component } from "react";
import PropTypes from "prop-types";
import Contador from "./contador";
import Calculadora from "./calculadora";
import { CounterStored } from "./counter-strored";
import { CounterDownCmd, store } from "./my-store";

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

function MiSelect(props) {
  return (
    <select>
      <option value="">Selecciona una opción</option>
      {props.listado &&
        props.listado.map(item => (
          <option value={props.value ? item[props.value] : item[props.text]}>
            {item[props.text]}
          </option>
        ))}
    </select>
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
      <React.Fragment>
        <MiSelect
          name="cbProvincias"
          listado={this.lisado}
          value="id"
          text="nombre"
        />
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
      </React.Fragment>
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
  constructor(props) {
    super(props);
    this.state = { valor: 1, coma: true };
    console.warn("constructor");
  }
  componentWillMount() {
    console.warn("componentWillMount");
  }
  componentWillReceiveProps(next_props) {
    console.warn("componentWillReceiveProps");
  }
  shouldComponentUpdate(next_props, next_state) {
    console.warn("shouldComponentUpdate");
    return true;
  }
  componentWillUpdate(next_props, next_state) {
    console.warn("componentWillUpdate");
  }
  render() {
    console.warn("render");
    //let saludo = <h1>Adios</h1>;
    return (
      <div>
        <CounterStored />
        <button onClick={e => CounterDownCmd()}>Baja</button>
        <button onClick={e => store.AddNotify("Estos es una noticación")}>
          Notifica
        </button>
        <Calculadora
          coma={this.state.coma}
          value={this.state.valor}
          onChange={rslt => this.setState({ valor: rslt })}
        />
        <input
          type="button"
          value="coma"
          onClick={e => this.setState({ coma: true })}
        />
        <input
          type="button"
          value="punto"
          onClick={e => this.setState({ coma: false })}
          ref={tag => {
            this.btnSalir = tag;
          }}
        />
        <Contador
          init={this.state.valor}
          onCambia={rslt => this.setState({ valor: rslt })}
        />
        {/* <Lisado /> */}
        <Card titulo="Esto es una tarjeta">
          El valor es: {this.state.valor}
          <Saluda nombre={this.state.valor} />
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
  componentDidMount() {
    console.warn("componentDidMount");
    this.unsubscribe = store.subscribe(() => {
      this.setState({ valor: store.getState().contador });
      console.log("Cambia estorage.");
    });

    this.btnSalir.focus();
  }
  componentDidUpdate(next_props, next_state) {
    console.warn("componentDidUpdate");
    this.btnSalir.focus();
  }
  componentWillUnmount() {
    console.warn("componentWillUnmount");
    this.unsubscribe();
  }
}
