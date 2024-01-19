import React from "react";

const RadioInput = ({ value, name, text }) => {
  return (
    <div className="bg-gray-300 py-2 px-5 flex gap-3">
      <input type="radio" value={value} name={name} />
      <label htmlFor="">{text}</label>
    </div>
  );
};

export default RadioInput;
