import React from "react";
import { connect } from "react-redux";

const counterStored = ({ contador, onSube, onBaja }) => (
  <div>
    <h1>{contador}</h1>
    <p>
      <button onClick={onSube}>Sube</button>&nbsp;{" "}
      <button onClick={onBaja}>Baja</button>
    </p>
  </div>
);

export const CounterStored = connect(
  (state, ownProps) => {
    return {
      contador: state.contador
    };
  },
  (dispatch, ownProps) => {
    return {
      onSube: () => {
        dispatch({ type: "COUNTER_UP" });
      },
      onBaja: () => {
        dispatch({ type: "COUNTER_DOWN" });
      }
    };
  }
)(counterStored);
