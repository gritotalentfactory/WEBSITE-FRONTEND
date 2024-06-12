import React from "react";

const RadioInput = ({ value, name, text, onChange, checked }) => {
  return (
    <div className="flex items-center gap-3 mx-3 my-2">
      <input 
        type="radio" 
        value={value} 
        name={name} 
        onChange={onChange} 
        checked={checked} 
        id={`${name}-${value}`} // Add an id to associate with the label
        className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" // Tailwind classes for styling
      />
      <label htmlFor={`${name}-${value}`} className="text-black">
        {text}
      </label>
    </div>
  );
};

export default RadioInput;
