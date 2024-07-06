import { useContext } from "react";
import "./index.css";
import { ThreadsContext } from "./providers/ThreadsProvider";
import {
  Link,
} from '@tanstack/react-router'


function App() {
  const { threads } = useContext(ThreadsContext);

  return (
    <>
      <h2 className="text-center text-3xl mt-4 mb-4">新着スレッド</h2>
      <ul className="text-center flex flex-col gap-4 mb-10">
        {threads?.map(thread => {
          return (
            <li key={thread.id} className="text-2xl border max-w-[500px] mx-auto w-full p-4">
              <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default App
