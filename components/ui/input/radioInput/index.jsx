import React from "react";

const RadioInput = ({ value, name, text, onChange, checked }) => {
  return (
    <div className="bg-white py-2 px-5 h-[40px] flex items-center gap-3 rounded-md mx-3 text-black">
      <input 
        type="radio" 
        value={value} 
        name={name} 
        onChange={onChange} 
        checked={checked} 
      />
      <label htmlFor={name} className="text-black">
        {text}
      </label>
    </div>
  );
};

export default RadioInput;
