//FIXME: How does one connect the images from the frontend to the backend?

import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../features/users/useUser";

export function User() {
  const { userId } = useParams();

  const { isLoading, user, error } = useUser(userId);
  const navigate = useNavigate();

  if (isLoading) return <div>Wait</div>;

  return (
    <>
      <div className="flex items-center justify-center">
        <div>
          <img
            src={`/public/users/${user.photo}`}
            alt={user.name}
            className="w-40"
          />
        </div>
        <div className="flex-col">
          <p>
            {user.name} - {user.username}
          </p>
          <p>Member since {user.createdAt}</p>
          <p>{user.description}</p>
        </div>
      </div>
      {user.posts?.length > 0 && (
        <ul>
          {user.posts.map((post) => (
            <li key={post._id}>
              <p
                onClick={() => navigate(`/post/${post._id}`)}
                className="font-bold text-yellow-900 hover:cursor-pointer"
              >
                {post.title}
              </p>
              <p>{post.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
