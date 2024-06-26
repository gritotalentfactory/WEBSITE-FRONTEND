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
      className=" text-black p-2 h-[40px] w-full my-7"
    />
  );
};

export default CountrySelector;
