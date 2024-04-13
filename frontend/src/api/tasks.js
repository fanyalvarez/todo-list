import axios from "axios";

const API_URL = "http://localhost:8000";

export const getTasksRequest = async () =>
  axios.get(`${API_URL}/read/note`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getTaskRequest = async (note_id) =>
  axios.get(`${API_URL}/note/${note_id}`);
export const updateTaskRequest = async (note_id, task) =>
  axios.put(`${API_URL}/note/update/${note_id}`, task);
export const deleteTaskRequest = async (id) =>
  axios.delete(`${API_URL}/delete/note/${id}`);
export const createTaskRequest = async (task) =>
  axios.post(`${API_URL}/users/notes/`, task, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
