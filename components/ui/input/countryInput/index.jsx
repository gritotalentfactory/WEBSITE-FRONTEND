import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

const CountrySelector = ({ value, onChange }) => {
  const options = useMemo(() => countryList().getData(), []);

  const handleChange = (selectedOption) => {
    onChange(selectedOption);
  };

  return (
    <Select
      options={options}
      value={value}
      onChange={handleChange}
      className="text-black p-2 h-[40px] w-full my-7"
    />
  );
};

export default CountrySelector;
