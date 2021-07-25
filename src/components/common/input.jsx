import React from "react";
const Input = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        id={props.name}
        type={props.type}
        className="form-control"
      />
      {props.error && (
        <button className="alert alert-danger">{props.error}</button>
      )}
    </div>
  );
};

export default Input;
