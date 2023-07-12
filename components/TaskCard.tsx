"use client";

import ITask from "@/type";
import React, { useContext, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { MyContext } from "@/context/MyContext";

const TaskCard = ({ item }: { item: ITask }) => {
  const [isHover, setIsHover] = useState(false);
  const { task, setTask, setIsEdit, setEditData } = useContext(MyContext);

  let textColorClass;
  
  // These logic is for the different color for the different task status
  if (item.status === "Completed") {
    textColorClass = "bg-green-600";
  } else if (item.status === "To Do") {
    textColorClass = "bg-red-600";
  } else if (item.status === "In Progress") {
    textColorClass = "bg-blue-600";
  } else {
    textColorClass = "bg-gray-600";
  }

  const handleEditTask = (dt: ITask) => {
    setIsEdit(true);
    setEditData(dt);
    // console.log(dt);
  };

  const handleDelete = (id: string) => {
    const filteredData = task.filter((item: ITask) => {
      return item.id !== id;
    });
    setTask(filteredData);
  };

  return (
    <>
      <div
        className="w-3/4 mx-auto bg-black/90 shadow p-4 flex justify-between my-6 hover:scale-105 transition-all duration-500 ease-in-out rounded "
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <ul className="flex flex-col gap-3 px-2 pr-10 ">
          <li className="text-xl text-gray-300">
            <p>
              <b>{item.title}</b>
            </p>
            <p
              className={`text-xs w-fit rounded-sm px-1 text-white ${textColorClass}`}
            >
              {item.status}
            </p>
          </li>
          <li className="text-cyan-500">
            <b>{item.description}</b>
          </li>
        </ul>
        <div
          className={`${
            isHover ? "" : "opacity-0"
          } text-slate-200 flex flex-col justify-center`}
        >
          <AiFillEdit
            title="Edit"
            className="cursor-pointer hover:scale-150 hover:text-green-500 my-3 duration-300 ease-in-out"
            onClick={() => handleEditTask(item)}
          />
          <RiDeleteBin5Line
            title="Delete"
            className="cursor-pointer hover:scale-150 hover:text-red-500 my-3 duration-300 ease-in-out"
            onClick={() => handleDelete(item.id)}
          />
        </div>
      </div>
    </>
  );
};

export default TaskCard;
