import React from "react";
const Select = ({ value, name, label, options, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        value={value}
        name={name}
        onChange={onChange}
        id={name}
        options={options}
        className="form-control"
      >
        <option value="" />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <button className="alert alert-danger">{error}</button>}
    </div>
  );
};

export default Select;
