import { useEffect } from "react";
import { useTasks } from "../Context/TaskContext.jsx";
import {TaskCard} from "../Components/TaskCard";


export const TaksPage = () => {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  console.log(tasks)
  if (tasks.length === 0) {
    return (
      <div>
        <h1>No tasks</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 w-11/12 m-auto py-10">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};
