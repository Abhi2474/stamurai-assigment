"use client";

import Form from "@/components/Form";
import { MyContext } from "@/context/MyContext";
import React, { useEffect, useState } from "react";
import TaskDisplay from "@/components/TaskDisplay";
import ITask from "@/type";

export default function Home({ database }: { database: ITask[] }) {
  const [task, setTask] = useState(database);

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
      <MyContext.Provider value={{ task, setTask }}>
        <header>
          <h1 className="lg:text-4xl sm:text-2xl text-center my-4 font-bold text-cyan-700">
            Assignment STAMURAI 📃
          </h1>
        </header>
        <Form />
        <TaskDisplay />
      </MyContext.Provider>
    </>
  );
}
