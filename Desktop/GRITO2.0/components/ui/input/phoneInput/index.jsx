import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";

export function SelectPhone() {
  const [value, setValue] = useState();
  return (
    <PhoneInput
      placeholder="Enter phone number"
      value={value}
      onChange={() => {
        setValue;
      }}
      className="border-gray-300 border-4 text-black p-2"
    />
  );
}
