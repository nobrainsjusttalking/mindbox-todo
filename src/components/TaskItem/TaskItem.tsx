import { Task } from "../../types";
import "./TaskItem.css";

const TaskItem = ({ task, onToggle }: { task: Task, onToggle: () => void }) => {
  return (
    <li className="task-item">
      <svg className="task-item-marker" width="61" height="61" viewBox="0 0 61 61" onClick={onToggle}>
        <circle
          cx="30.5"
          cy="30.5"
          r="29"
          stroke={task.isCompleted ? "#c3d9d5" : "#ededed"}
          strokeWidth="2"
          fill="none"
        />

        {task.isCompleted && (
          <path
            d="M16 34 L26 44 L44 17"
            stroke="#77c0af"
            strokeWidth="3"
            fill="none"
          />
        )}

      </svg>
      
      <span className={task.isCompleted ? "completed-task" : "active-task"}>
        {task.text}
      </span>
    </li>
  )
};

export default TaskItem;