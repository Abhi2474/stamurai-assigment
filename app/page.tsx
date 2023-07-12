import Home from "@/components/Home";
import ITask from "@/type";

const fetchTasks = async () => {
  const res = await fetch("http://localhost:3000/api");
  const data = await res.json();
  return data;
};

export default async function App() {
  const dataset:ITask[] = await fetchTasks();
  // console.log(dataset);

  return (
    <>
      <Home database={dataset}></Home>
    </>
  );
}
