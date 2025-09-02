import { useState } from "react";

import { TaskInputProps } from "../../types";

import "./TaskInput.css";

const TaskInput = ({ onAdd }: TaskInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(inputValue);
    setInputValue("");
  }

  return (
    <form className="input-form-wrapper" onSubmit={handleSubmit}>
      <svg className="dropdown-arrow" width="61" height="61" viewBox="0 0 61 61">
        <path
          d="M16 27 L30.5 38 L47 27"
          stroke="#e6e6e6"
          strokeWidth="7"
          fill="none"
        />
      </svg>

      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        aria-label="New task" 
        className="add-task-field" 
        placeholder="What needs to be done?" 
      />
    </form>
  );
}

export default TaskInput;