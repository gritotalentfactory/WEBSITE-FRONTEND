import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "none", // Remove the border
    width: "370px",
    height: "40px",
    borderRadius: "12px",
    boxShadow: state.isFocused ? "0 0 0 0.1rem rgba(0, 123, 255, 0.25)" : null, // Add focus style

    "@media (max-width:500px)": {
      width: "230px", // Adjust width for smaller screens
    },
  }),
};

const CountrySelector = ({
  onBlur,
  onClick,
  type,
  onChange,
  placeholder,
  value,
  ...props
}) => {
  const options = useMemo(() => countryList().getData(), []);
  const [selectedValue, setSelectedValue] = useState(value);

  const changeHandler = (selectedOption) => {
    setSelectedValue(selectedOption);
    if (onChange) {
      onChange(selectedOption);
    }
  };

  return (
    <div>
      <Select
        type={type}
        onBlur={onBlur}
        styles={customStyles}
        value={selectedValue}
        placeholder={placeholder}
        {...props}
        options={options}
        onChange={changeHandler}
      />
    </div>
  );
};

export default CountrySelector;
