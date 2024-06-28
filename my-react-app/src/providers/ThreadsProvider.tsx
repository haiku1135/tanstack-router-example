import { createContext, useState, useEffect } from 'react';


interface Thread {
  id: string; // または適切な型
  title: string;
}

interface ThreadsContextType {
  threads: Thread[];
  setThreads: React.Dispatch<React.SetStateAction<Thread[]>>;
}

// コンテキストの作成
export const ThreadsContext = createContext<ThreadsContextType>({
  threads: [],
  setThreads: () => {}
});

const BASE_URL = 'https://railway.bulletinboard.techtrain.dev';

// コンテキストプロバイダーの作成
export const ThreadsProvider = ({ children }: { children: React.ReactNode }) => {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/threads`)
      .then(response => response.json())
      .then(data => {
        setThreads(data);
      })
  }, []);

  return (
    <ThreadsContext.Provider value={{ threads, setThreads }}>
      {children}
    </ThreadsContext.Provider>
  );
};