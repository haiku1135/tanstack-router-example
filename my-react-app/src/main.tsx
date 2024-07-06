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
import { BrowserRouter, useParams } from 'react-router-dom';
import { newThreadRoute } from './routes/newThreadRoute'
import { threadRoute } from './routes/threads/threadDetail.lazy'
import {
  postsRoute,
  postsIndexRoute,
  postRoute
} from './routes/posts/postsIndexRoute'


const NotFoundComponent = () => <div>Page Not Found</div>;

export const rootRoute = createRootRoute({
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

export const indexRoute = createRoute({
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


const routeTree = rootRoute.addChildren([
  indexRoute,
  threadRoute,
  newThreadRoute, 
]);

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
      {/* グローバルでスレッドを管理するためのProviderを設定 */}
      <ThreadsProvider>
        <RouterProvider router={router} />
      </ThreadsProvider>
    </StrictMode>,
  )
}