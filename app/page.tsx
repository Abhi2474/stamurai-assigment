import Home from "@/components/Home";
import ITask from "@/type";

import tasks from '@/public/tasks.json'

export default async function App() {

  return (
    <>
      <Home database={tasks}></Home>
    </>
  );
}
