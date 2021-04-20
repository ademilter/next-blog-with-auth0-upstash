import { DateTime } from 'luxon'

export default function Comments({ comments }) {
  return (
    <div className="mt-10 space-y-4">
      {comments.map(({ id, createdAt, text, user }) => {
        return (
          <div key={id} className="flex items-center space-x-2">
            <img
              src={user.picture}
              alt={user.name}
              width={40}
              className="rounded-full"
            />
            <div>
              <div className="space-x-2">
                <b>{user.name}</b>
                <time className="text-gray-400">
                  {DateTime.fromMillis(createdAt).toRelative()}
                </time>
              </div>
              <p>{text}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
