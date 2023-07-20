import React, { useState } from "react";
import Select from "react-dropdown-select";

function Dropdown () {
  const difficulty = [
    { label: "Easy", value: "ES" },
    { label: "Medium", value: "MD" },
    { label: "Hard", value: "HD" },
  ];

  return (
    <div className="d-flex justify-content-centre mt-5">
      <div className="">
          <h4>Difficulty</h4>
      </div>

    </div>
  )

}

// const Dropdown = ({ Difficulty }) => {
//   const [selectedOption, setSelectedOption] = useState("");

//   const handleSelect = (option) => {
//     setSelectedOption(option.value);
//   };

//   return (
//     <div>
//       <select value={selectedOption} onChange={handleSelect}>
//         {Difficulty.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

export default Dropdown;