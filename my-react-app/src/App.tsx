import { useContext } from "react";
import "./index.css";
import { ThreadsContext } from "./providers/ThreadsProvider";


function App() {
  const { threads } = useContext(ThreadsContext);

  return (
    <>
      <h2 className="text-center text-3xl">新着スレッド</h2>
      <ul className="text-center flex flex-col gap-4 mb-10">
        {threads?.map(thread => {
          return (
            <li key={thread.id} className="text-2xl border max-w-[500px] mx-auto w-full p-4">{thread.title}</li>
          )
        })}
      </ul>
    </>
  )
}

export default App
