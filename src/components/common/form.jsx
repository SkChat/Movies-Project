import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import Joi from "joi-browser";
class Form extends Component {
  state = { data: {}, errors: {} };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (error === null) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  validateProperty = (input) => {
    const obj = { [input.name]: input.value }; //we can write {name}value} bt thn we have to write for
    //password as well.Hence to dynamically get the name we use [input.name]
    const schema = { [input.name]: this.schema[input.name] };
    const { error } = Joi.validate(obj, schema); //we use obj instead of this.state.data since unless it will change the
    //entire object that is if we dont write{name}message will show for password as well
    if (error === null) return null;
    return error.details[0].message;
  };
  handleSubmit = (e) => {
    e.preventDefault(); //prevents default beahviour of teh event i.e here submitting
    //the form to the server which causes a full page reload
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };
  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };
  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
  renderInput(name, label, type = "text") {
    return (
      <Input
        name={name}
        label={label}
        type={type}
        error={this.state.errors[name]}
        value={this.state.data[name]}
        onChange={this.handleChange}
      />
    );
  }
  renderSelect(name, label, options) {
    return (
      <Select
        name={name}
        label={label}
        options={options}
        error={this.state.errors[name]}
        value={this.state.data[name]}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
