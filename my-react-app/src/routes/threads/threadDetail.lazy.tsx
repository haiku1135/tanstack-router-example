import {
  createRoute,
  useParams
} from '@tanstack/react-router'
import { rootRoute } from '../../main'
import { useEffect, useState } from 'react';

type Post = {
  id: string;
  post: string;
};

type Content = {
  posts: Post[];
};

const BASE_URL = 'https://railway.bulletinboard.techtrain.dev';

const fetchPosts = async ({ params }: { params: Record<string, string> }) => {
  const res = await fetch(`${BASE_URL}/threads/${params.threadId}/posts`);
  const posts: Post[] = await res.json();
  return posts;
};

const PostsComponent = () => {
  // State管理
  const [comment, setComment] = useState('');
  const [content, setContent] = useState<Content>({ posts: [] });

  // threadIdの取得
  const {threadId}  = useParams({ from: '/threads/$threadId' });


  // inputの値をStateに保存 
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // 投稿ボタンを押したときの処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}/threads/${threadId}/posts`, {
      method: 'POST',
      body: JSON.stringify({
        post: comment
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const postData = await res.json(); // JSONデータを解析
    setContent({...content, posts: [...content.posts, {id: postData.id, post: comment}]});
    setComment('');
  };
  
  useEffect(() => {
    fetch(`${BASE_URL}/threads/${threadId}/posts`)
      .then(res => res.json())
      .then(data => setContent(data))
      .catch(error => console.error('error', error));
  }, []);


  // 投稿の取得
  return (
    <>
      <div className='flex flex-row justify-between max-w-[1000px] mx-auto'>
        <div className='mt-8'>
          <h2 className='text-2xl font-bold mb-4'>最新の投稿</h2>
          <ul>
            {
              content.posts?.map((post: Post) => (
                <li key={post.id}>
                  {post.post}
                </li>
              ))
            }
          </ul>
        </div>
        <div className='mt-8'>
          <form className='flex flex-row gap-4' onSubmit={handleSubmit}>
            <textarea className='border rounded-sm' value={comment} onChange={(e) => handleChange(e)} required maxLength={100} />
            <button className='bg-blue-500 text-white px-2 py-1 rounded-sm' type="submit" >投稿</button>
          </form>
        </div>
      </div>
    </>
  );
};


export const threadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/threads/$threadId',
  loader: fetchPosts,
  component: PostsComponent,
});