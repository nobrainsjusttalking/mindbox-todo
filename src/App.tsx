import { useState } from "react";

import TaskList from './components/TaskList/TaskList';

import { Task } from "./types/index"

import './App.css';



function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const [inputValue, setInputValue] = useState("");

  const [nextTaskId, setNextTaskId] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = inputValue.trim()
    if (value) {
      setTasks(tasks => [...tasks, { id: nextTaskId, text: value, isCompleted: false }]);
      setNextTaskId(nextTaskId + 1)
      setInputValue("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks =>
      tasks.map((task, i) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case "all":
        return true;
      case "active":
        return !task.isCompleted;
      case "completed":
        return task.isCompleted
    }
  })

  return (
    <div className='app-container'>
      <div className="app">
        <h1 className="app-title">todos</h1>

        <div className="app-main">
          <form className="input-form-wrapper" onSubmit={handleSubmit}>
            <svg className="dropdown-arrow" width="61" height="61" viewBox="0 0 61 61">
              <path
                d="M16 27 L30.5 38 L47 27"
                stroke="#e6e6e6"
                strokeWidth="7"
                fill="none"
              />
            </svg>
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} aria-label="New task" className="add-task-field" placeholder="What needs to be done?" />
          </form>

          <TaskList tasks={filteredTasks} toggleTask={toggleTask} />

          <div className="footer">
            <span className="items-left-text">{filteredTasks.filter(task => !task.isCompleted).length} items left</span>

            <div className="footer-buttons">
              <button className={`button ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
              <button className={`button ${filter === "active" ? "active" : ""}`} onClick={() => setFilter("active")}>Active</button>
              <button className={`button ${filter === "completed" ? "active" : ""}`} onClick={() => setFilter("completed")}>Completed</button>
            </div>

            <button className="button" onClick={() => setTasks(tasks.filter(task => !(task.isCompleted)))}>Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;