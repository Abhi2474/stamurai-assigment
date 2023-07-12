"use client";

import { MyContext } from "@/context/MyContext";
import ITask from "@/type";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { RxCross1 } from "react-icons/rx";

const TaskUpdate = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { task, setTask, isEdit, setIsEdit, editData } = useContext(MyContext);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
  });

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setFormData(editData);
  }, [editData]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref?.current?.contains(e.target as Node)) {
        setIsEdit(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.description || !formData.status || !formData.title) {
      setErrMsg("* All Fields are mandatory");
    } else {
      setErrMsg("");
      setIsEdit(false);
      let findUserIndex = task.findIndex(
        (item: ITask) => item.id === editData.id
      );
      let newTask = [...task];
      newTask.splice(findUserIndex, 1, formData);
      setTask(newTask);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setErrMsg("");

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <div
        ref={ref}
        className={`p-0 w-full h-screen pt-24 top-0 bg-black/20 ${
          isEdit ? "" : "hidden"
        } absolute z-40`}
      >
        <form onSubmit={handleSubmit} className="w-2/5 mx-auto shadow-xl ">
          <fieldset className="flex flex-col gap-5 items-center bg-slate-200 rounded-md py-10 relative">
            <RxCross1
              onClick={() => setIsEdit(false)}
              className="text-red-800 absolute top-3 right-3 cursor-pointer text-xl hover:text-2xl"
            />
            <h1 className="text-teal-600 font-bold mt-0 text-4xl pb-4 text-center">
              Task Form
            </h1>

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="focus:outline-none p-3 bg-slate-800 text-slate-50 rounded-sm"
              minLength={3}
            />
            <select
              name="status"
              id=""
              onChange={handleChange}
              value={formData.status}
              className="focus:outline-none w-[47%] py-3  bg-slate-800 text-slate-50 rounded-sm"
            >
              <option value="">--Select--</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="To Do">To Do</option>
            </select>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="focus:outline-none p-3 bg-slate-800 text-slate-50 rounded-sm"
              cols={23}
              rows={3}
            ></textarea>
            <div className="flex justify-evenly w-1/2 px-3">
              <button
                className="py-2 px-4 font-bold text-sm bg-teal-800 text-white rounded-sm  my-2 hover:bg-teal-900"
                type="submit"
              >
                Update
              </button>
              <button
                className="py-2 px-4 font-bold text-sm bg-teal-800 text-white rounded-sm  my-2 hover:bg-teal-900"
                type="reset"
                onClick={() =>
                  setFormData({
                    id: "",
                    title: "",
                    description: "",
                    status: "",
                  })
                }
              >
                Reset
              </button>
            </div>
            {errMsg ? (
              <div className="text-red-900 font-bold">{errMsg}</div>
            ) : (
              ""
            )}
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default TaskUpdate;
