import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/tasks.js";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    setTimeout(async () => {
      const resp = await getTasksRequest();
      console.log(resp);
      try {
        setTasks(resp.data);
      } catch (error) {
        console.error(error);
      }
    }, 2000);
  };

  const createTasks = async (tasks) => {
    const resp = await createTaskRequest(tasks);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 200) setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (note_id, task) => {
    try {
      await updateTaskRequest(note_id, task);
    } catch (error) {
      console.error(error);
    }
  };

  const getTask = async (note_id) => {
    const resp = await getTaskRequest(note_id);
    return resp.data;
  };

  return (
    <TaskContext.Provider
      value={{ tasks, createTasks, getTasks, getTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}
