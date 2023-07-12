"use client";

import  ITask  from "@/type";
import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";

const TaskCard = ({ item }: { item: ITask }) => {
  const [isHover, setIsHover] = useState(false);

  let textColorClass;

  if (item.status === "Completed") {
    textColorClass = "bg-green-600";
  } else if (item.status === "To Do") {
    textColorClass = "bg-red-600";
  } else if (item.status === "In Progress") {
    textColorClass = "bg-blue-600";
  } else {
    textColorClass = "bg-gray-600";
  }

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
          } flex flex-col justify-center`}
        >
          <AiFillEdit
            title="Edit"
            className="cursor-pointer hover:scale-150 hover:text-green-700 my-3 duration-300 ease-in-out"
          />
          <RiDeleteBin5Line
            title="Delete"
            className="cursor-pointer hover:scale-150 hover:text-red-700 my-3 duration-300 ease-in-out"
          />
        </div>
      </div>
    </>
  );
};

export default TaskCard;
