export default interface ITask {
	id: string
	title: string
	description: string
	status: "Completed" | "In Progress" | "To Do"
}