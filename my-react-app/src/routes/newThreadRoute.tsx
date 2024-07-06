import { createFileRoute } from '@tanstack/react-router'
import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../main'
import NewThread from '../NewThread'


export const newThreadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/threads/new',
  component: function NewThreadComponent() {
    return (
      <>
        <NewThread />
      </>
    )
  },
})
