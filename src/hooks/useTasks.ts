import { useState } from "react";

import { Task } from "../types";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [nextTaskId, setNextTaskId] = useState(0);

  const addTask = (text: string) => {
    const value = text.trim()
    if (!value) return;
    setTasks(tasks => [...tasks, { id: nextTaskId, text: value, isCompleted: false }]);
    setNextTaskId(id => id + 1)
  };

  const toggleTask = (id: number) => {
    setTasks(tasks =>
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks(tasks => tasks.filter(task => !task.isCompleted));
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
  });

  const itemsLeft = tasks.filter(task => !task.isCompleted).length;
  
  return { filteredTasks, itemsLeft, filter, setFilter, addTask, toggleTask, clearCompleted }
}