import { useState,useContext } from "react";
import { ThreadsContext } from "./providers/ThreadsProvider";
import "./index.css";

function NewThread() {
  const [newThread, setNewThread] = useState<string>('');

  const { threads, setThreads } = useContext(ThreadsContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewThread(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setThreads([...threads, { id: Date.now().toString(), title: newThread }]);
  }


  return(
    <div className="p-2">
      <h2 className='text-4xl text-center mx-auto mt-4'>スレッドを立てる</h2>
      <div className='mt-4'>
        <form className='flex justify-center items-center gap-x-4' onSubmit={handleSubmit}>
          <input className='border-2 border-gray-300 rounded-md p-2' type="text" placeholder="スレッドタイトル" onChange={handleChange} required maxLength={10} />
          <button className='bg-blue-500 text-white p-2 rounded-md border border-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500' type="submit">作成</button>
        </form>
      </div>
    </div>
  )
}

export default NewThread;