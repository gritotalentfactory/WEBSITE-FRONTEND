import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

const CountrySelector = () => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };

  return (
    <Select
      options={options}
      value={value}
      onChange={changeHandler}
      className="border-gray-300 border-4 text-black p-2"
    />
  );
};

export default CountrySelector;
