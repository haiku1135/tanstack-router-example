import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/threads/threadId')({
  component: Thread,
})

function Thread() {
  return (
    <div className="p-2">
      <h2 className='text-4xl'>スレッドを立てる</h2>
      <form>
        <input type="text" placeholder="スレッドタイトル" />
        <button type="submit">作成</button>
      </form>
    </div>
  )
}

export default Thread;
