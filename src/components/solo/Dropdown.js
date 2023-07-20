import React, { useState } from "react";
import "./Dropdown.css";

function Dropdown() {
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { label: "Easy", value: "option1" },
    { label: "Medium", value: "option2" },
    { label: "Hard", value: "option3" },
  ];

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="container">
      <div className="select-wrapper">
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="">-- Difficulty --</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {selectedOption && (
        <p className="selected-option">Selected Option: {selectedOption}</p>
      )}
    </div>
  );
}

export default Dropdown;
