"use client";
import React from "react";

const RadioInput = ({ value, name, text, onChange, onBlur, checked }) => {
  return (
    <div className="bg-white py-2 px-5 h-[40px] flex items-center gap-3 rounded-md mx-3 text-black max-sm:mb-3">
      <input
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={value} className="text-black">
        {text}
      </label>
    </div>
  );
};

export default RadioInput;
