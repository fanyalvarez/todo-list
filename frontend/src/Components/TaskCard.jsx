import { useTasks } from "../Context/TaskContext.jsx";
import { Link } from "react-router-dom";

export const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks();

  const onDelete = async (id) => {
    const accept = window.confirm("Estas seguro de eliminar?");
    if (accept) {
      await deleteTask(id);
    }
  };

  return (
    <div className="bg-sky-950 max-w-md p-6 rounded-md grid grid-col-1">
      <h3 className="text-2xl font-bold mb-2">{task.title}</h3>

      <p className="text-stale-300 text-xl">{task.description}</p>

      <div className=" flex justify-between items-center mt-3">
        <div className="my-4 flex gap-x-4 justify-end ">
          <button
            onClick={() => onDelete(task.id)}
            className="bg-rose-900 px-4 py-2 rounded  hover:bg-rose-700 hover:text-rose-100">
            Delete
          </button>
          <Link
            to={`/tasks/${task.id}`}
            className="bg-indigo-400 text-indigo-950 px-4 py-2 rounded  hover:bg-indigo-700 hover:text-indigo-300">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};
