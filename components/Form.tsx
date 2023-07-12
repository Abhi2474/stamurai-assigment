"use client"

import React, { ChangeEvent, FormEvent, useContext, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MyContext } from "../context/MyContext";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineUserAdd } from "react-icons/ai";

const Form = () => {
	const ref = useRef<HTMLDialogElement | null>(null);
	const { task, setTask } = useContext(MyContext);

	const [formData, setFormData] = useState({
		id: uuidv4(),
		title: "",
		description: "",
		status: "",
	});

	const [errMsg, setErrMsg] = useState("");

	const handleSubmit = (e:FormEvent) => {
		e.preventDefault();
		if (!formData.description || !formData.title || !formData.status) {
			setErrMsg("* All Fields are mandatory");
		} else {
			// console.log(formData);
			setErrMsg("");
			setFormData({
				id: "",
				title: "",
				description: "",
				status: "",
			});
			setTask([...task, formData]);
		}
	};

	const handleDialogBox = () => {
		ref?.current?.showModal();
	};

	const dialogClose = () => {
		ref?.current?.close();
	};

	const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		setErrMsg("");
		setFormData({ ...formData, id: uuidv4(), [e.target.name]: e.target.value });
	};

	return (
		<>
			<button
				onClick={handleDialogBox}
				className=" py-2 flex gap-4 items-center w-1/4 mx-auto justify-center mt-10 font-bold text-xl hover:text-gray-800 hover:scale-105 transition-all duration-300 ease-in-out shadow-md"
			>
				<AiOutlineUserAdd /> Create New Task
			</button>
			<dialog ref={ref} id="modal" className="p-0 w-full bg-transparent ">
				<form onSubmit={handleSubmit} className="w-2/5 mx-auto shadow-xl ">
					<fieldset className="flex flex-col gap-5 items-center bg-slate-200 rounded-md py-10 relative">
						<RxCross1
							onClick={dialogClose}
							className="absolute top-3 right-3 cursor-pointer text-xl hover:text-2xl"
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
						<select name="status" id="" 
							onChange={handleChange}
							value={formData.status}
							className="focus:outline-none w-[47%] py-3  bg-slate-800 text-slate-50 rounded-sm"
							>
							<option value="">--Select--</option>
							<option value="In Progress">In Progress</option>
							<option value="Completed">Completed</option>
							<option value="To Do">To Do</option>
						</select>
						<textarea name="description" placeholder="Description"
							value={formData.description}
							onChange={handleChange}
							className="focus:outline-none p-3 bg-slate-800 text-slate-50 rounded-sm"
							cols={23} rows={5}></textarea>
						<div className="flex justify-evenly w-1/2 px-3">
						<button
							className="py-2 px-4 font-bold text-sm bg-teal-800 text-white rounded-sm  my-2 hover:bg-teal-900"
							type="submit"
						>
							Submit
						</button>
						<button
							className="py-2 px-4 font-bold text-sm bg-teal-800 text-white rounded-sm  my-2 hover:bg-teal-900"
							type="reset"
							onClick={()=>setFormData({
								id: "",
								title: "",
								description: "",
								status: "",
							})}
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
			</dialog>
		</>
	);
};

export default Form;
