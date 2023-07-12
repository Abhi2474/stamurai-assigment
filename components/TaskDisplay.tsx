import React, { useContext } from "react";
import ITask from "@/type";
import TaskCard from "./TaskCard";
import { MyContext } from "@/context/MyContext";

const TaskDisplay = () => {
  const { task } = useContext(MyContext);

  return (
    <div className="my-10 pb-10">
      <h1 className="w-3/4 mx-auto text-3xl p-2 font-bold ">Task Lists</h1>
      {task?.map((item: ITask) => {
        return <TaskCard key={item.id} item={item}></TaskCard>;
      })}
    </div>
  );
};

export default TaskDisplay;
