import React, { useState } from "react";
import Select from "react-dropdown-select";

function Dropdown () {
  const [value, setValue] = useState("");

  const options = [
    { label: "Easy", value: 1},
    { label: "Medium", value: 2 },
    { label: "Hard", value: 3},
  ];

  return (
    <div className="d-flex justify-content-centre mt-5">
      <div className="w-50 p-3 border rounded">
          <h4>Difficulty</h4>
          <Select
            name="select"
            options={options}
            labelField="label"
            valueField="value"
            onChange={value=> setValue(value)}
          >

            </Select>
            
            <p>{value}</p>
      </div>
    </div>
  )
}

export default Dropdown;