import React from "react";
import Selected from "@/interfaces/Selected";

interface ChildComponentProps {
  label: string;
  value: Selected[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<ChildComponentProps> = ({ label, value, onChange }) => {
  return (
    <label>
      {label}:
      <select onChange={onChange} defaultValue="">
        <option disabled value="">
            Pick Mode
        </option>
        {value.map((mode) => (
          <option key={mode.id} value={mode.id}>
            {mode.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
