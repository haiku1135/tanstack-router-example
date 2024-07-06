import { useContext, useState, useEffect } from "react";
import { ThreadsContext } from "./providers/ThreadsProvider";
import { useParams } from "react-router-dom";
import "./index.css";

function Thread() {
  const { threads, setThreads } = useContext(ThreadsContext);
  // URLのパスの中で動的に変化する部分の値を取得
  const { threadId } = useParams();
  // スレッドのIDが一致するスレッドを取得
  const thread = threads.find(thread => thread.id === threadId);
  const BASE_URL = 'https://railway.bulletinboard.techtrain.dev';
  const [posts, setPosts] = useState();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${BASE_URL}/threads/${threadId}/posts`);
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, [])

  return(
    <div className="p-2">
      <h2 className='text-4xl text-center mx-auto mt-4'>{thread?.title}</h2>
      <div className='mt-4'>
        <ul>
          {posts?.map((post: { postId: string; description: string; }) => (
            <li key={post.postId} className="text-2xl border max-w-[500px] mx-auto w-full p-4">{post.description}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Thread;