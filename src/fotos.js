import React, { Component } from "react";
import Contador from "./contador";

export class FotoCard extends Component {
  render() {
    return (
      <div
        className="card"
        style={{ width: this.props.dim + "px" }}
        onClick={this.props.onClick}
      >
        <img
          src={this.props.foto}
          className="card-img-top"
          alt={this.props.titulo}
        />
        {this.props.dim >= 96 && (
          <div className="card-body">
            <h5 className="card-title">{this.props.titulo}</h5>
            {this.props.dim >= 256 && (
              <p className="card-text">{this.props.children}</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default class FotoMuro extends Component {
  constructor(props) {
    super(props);
    this.tipos = ["people", "animals", "arch", "nature", "tech"];
    const max = 10;
    const t = [];
    for (let i = 0; i < this.tipos.length; i++) {
      let f = new Array(max);
      //t.push(f.fill(null, 0, max));
      t[i] = f.fill(null, 0, max);
    }
    this.state = { listado: t, dim: 64 };
  }
  cambia(f, c) {
    this.setState(prev => {
      let alea = Math.floor(Math.random() * 1000000);
      prev.listado[f][
        c
      ] = `http://placeimg.com/512/512/${this.tipos[f]}?t=${alea}`;
      return { listado: prev.listado };
    });
  }
  anula(f, c) {
    this.setState(prev => {
      prev.listado[f][c] = null;
      return { listado: prev.listado };
    });
  }
  componentDidMount() {
    setInterval(() => {
      const f = Math.floor(Math.random() * this.state.listado.length);
      const c = Math.floor(Math.random() * this.state.listado[0].length);
      if (!this.state.listado[f][c]) this.cambia(f, c);
    }, 1000);
  }
  render() {
    if (this.state.listado[0][0]) throw new Error("Es el cero");
    const rslt = this.state.listado.map((fila, index) => {
      const tamaño = {
        height: this.state.dim,
        width: this.state.dim,
        fontSize: this.state.dim / 64 + "em"
      };
      return (
        <div className="row" key={"F" + index.toString()}>
          {fila.map((celda, subindex) => (
            <div
              className="col"
              key={"F" + index.toString() + "C" + subindex.toString()}
            >
              {celda && (
                <FotoCard
                  foto={celda}
                  titulo={index + 1 + "-" + (subindex + 1)}
                  dim={this.state.dim}
                  onClick={e => this.anula.bind(this, index, subindex)}
                >
                  Descargado de {celda}
                </FotoCard>
              )}
              {!celda && (
                <button
                  style={tamaño}
                  onClick={this.cambia.bind(this, index, subindex)}
                >
                  {index + 1 + "-" + (subindex + 1)}
                </button>
              )}
            </div>
          ))}
        </div>
      );
    });
    return (
      <div>
        <Contador
          init={this.state.dim}
          delta={32}
          min={32}
          max={512}
          onCambia={rslt => this.setState({ dim: rslt })}
        />
        <div className="container-fluid">{rslt}</div>
      </div>
    );
  }

  renderTable() {
    const rslt = this.state.listado.map((fila, index) => {
      const tamaño = { height: this.state.dim, width: this.state.dim };
      return (
        <tr key={"F" + index.toString()}>
          {fila.map((celda, subindex) => (
            <td key={"F" + index.toString() + "C" + subindex.toString()}>
              {celda && (
                <FotoCard
                  foto={celda}
                  titulo={index + 1 + "-" + (subindex + 1)}
                  dim={this.state.dim}
                  onClick={this.anula.bind(this, index, subindex)}
                >
                  Descargado de {celda}
                </FotoCard>
              )}
              {!celda && (
                <button
                  style={tamaño}
                  onClick={this.cambia.bind(this, index, subindex)}
                >
                  {index + 1 + "-" + (subindex + 1)}
                </button>
              )}
            </td>
          ))}
        </tr>
      );
    });
    return (
      <div>
        <Contador
          init={this.state.dim}
          delta={32}
          min={32}
          max={512}
          onChange={rslt => this.setState({ dim: rslt })}
        />
        <table>
          <tbody>{rslt}</tbody>
        </table>
      </div>
    );
  }
}
