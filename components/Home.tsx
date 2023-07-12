"use client";
// "use client" declaration is used to use the react hooks because it is the part of "client side rendering" in next js without use this declaration it would be considered as "server side rendering" and then we can't use the react hooks and other frontend features on it.

import Form from "@/components/Form";
import { MyContext } from "@/context/MyContext";
import React, { useEffect, useState } from "react";
import TaskDisplay from "@/components/TaskDisplay";
import TaskUpdate from "./TaskUpdate";
import tasks from '@/public/tasks.json'
import { GoGoal } from 'react-icons/go'


export default function Home() {
  const [task, setTask] = useState(tasks);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});

  // Use the local storage to save the updated data permanantly
  useEffect(() => {
    const taskLocalStorage = localStorage.getItem("tasksLists");
    if (taskLocalStorage !== null) setTask(JSON.parse(taskLocalStorage));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("tasksLists", JSON.stringify(task));
    }, 0);
  }, [task]);

  return (
    <>
      <MyContext.Provider
        value={{ task, setTask, editData, setEditData, isEdit, setIsEdit }}
      >
        <header>
          <h1 className="lg:text-4xl sm:text-2xl text-center my-4 font-bold text-cyan-700 flex justify-center gap-4">
            Task Mangament System <GoGoal className="text-red-500"/>
          </h1>
        </header>
        <Form />
        <TaskDisplay />
        <TaskUpdate />
      </MyContext.Provider>
    </>
  );
}
