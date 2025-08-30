import TaskItem from "../TaskItem/TaskItem";

import { Task } from "../../types/index"

import "./TaskList.css";

const TaskList = ({ tasks, toggleTask }: { tasks: Task[], toggleTask: (index: number) => void }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => {
        return (
          <TaskItem key={`${task.text}-${task.id}`} task={task} onToggle={() => toggleTask(task.id)}></TaskItem>
        );
      })}
    </ul>
  );
};

export default TaskList;