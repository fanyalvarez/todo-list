import axios from "axios";

export const getTasksRequest = async () => axios.get("https://todonotes.onrender.com/read/note", {
    headers: {
        "authorization":`Bearer ${localStorage.getItem("token")}`
    }
});

export const getTaskRequest = async (note_id) => axios.get(`https://todonotes.onrender.com/note/${note_id}`);
export const updateTaskRequest = async (note_id, task) => axios.put(`https://todonotes.onrender.com/note/update/${note_id}`, task);
export const deleteTaskRequest = async (id) => axios.delete(`https://todonotes.onrender.com/delete/note/${id}`);
export const createTaskRequest = async (task, user_id) => axios.post(`https://todonotes.onrender.com/users/${user_id}/notes/`, task);
