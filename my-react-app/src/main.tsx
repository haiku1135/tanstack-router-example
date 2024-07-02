import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Outlet,
  RouterProvider,
  Link,
  createRouter,
  createRoute,
  createRootRoute,
  createFileRoute
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import  App  from './App';
import NewThread from './NewThread';
import Thread from './Thread';
import { ThreadsProvider } from './providers/ThreadsProvider';
import { useParams } from 'react-router-dom';


const NotFoundComponent = () => <div>Page Not Found</div>;
const rootRoute = createRootRoute({
  component: () => (
    <>
      <header className="p-4 h-24 flex gap-2 bg-slate-400 justify-between items-center text-white">
        <Link to="/" className="[&.active]:font-bold text-6xl">
          掲示板
        </Link>{' '}
        <Link to="/threads/new" className="[&.active]:font-bold text-2xl">
          新規作成
        </Link>
      </header>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: NotFoundComponent,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <>
        <App />
      </>
    )
  },
})

const newThreadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/threads/new',
  component: function NewThreadComponent() {
    return (
      <NewThread />
    )
  },
})

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/threads/$threadId': any; // ここで any は適切なコンポーネントまたは型に置き換えてください
  }
}

const threadRoute = createFileRoute('/threads/$threadId')({
  loader: async ({ params }) => {
    // ここで params.threadId を使用してデータをロードする
    return { threadId: params.threadId };
  },
  component: function ThreadComponent() {
    return (
      <Thread  />
    )
  },
})


const routeTree = rootRoute.addChildren([indexRoute, newThreadRoute, threadRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThreadsProvider>
        <RouterProvider router={router} />
      </ThreadsProvider>
    </StrictMode>,
  )
}