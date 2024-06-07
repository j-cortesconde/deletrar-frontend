//FIXME: How does one connect the images from the frontend to the backend?
// TODO: Should redirect to an error page that recieves as a prop an error message
// TODO: Should do this not only here. Also in other "if (error)" and many navigates that redirect home or elsewhere

import { longDate } from "../utils/dateFormat";
import { useNavigate, useParams } from "react-router-dom";

import { usePost } from "../features/posts/usePost";
import { useIsntOwnPost } from "../features/posts/useIsntOwnPost";
import { useQueryClient } from "@tanstack/react-query";

import HTMLParser from "../features/posts/HTMLParser";
import PostOwnerOptions from "../features/posts/PostOwnerOptions";
import Loader from "../ui/Loader";
import CollectionNavigate from "../features/collections/CollectionNavigate";
import PostComments from "../features/comments/PostComments";
import LikeCommentShare from "../ui/LikeCommentShare";

function PostDetail() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { postId } = useParams();
  const ownUser = queryClient.getQueryData(["user"]);
  const isLoggedIn = !!ownUser;

  const { isLoading, post, error } = usePost(postId);

  const isntOwnPost = useIsntOwnPost(post);

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto w-3/4">
      <div className="flex items-center justify-center gap-10 pb-4">
        <img
          src={`/posts/${post?.coverImage}`}
          alt="Post Cover"
          className="w-40"
        />

        <div className="max-w-[60%] flex-col text-left">
          {post?.status === "posted" && (
            <div>
              <span>Publicado por </span>
              <span
                onClick={() => navigate(`/user/${post?.author.username}`)}
                className="font-bold text-stone-900 hover:cursor-pointer"
              >
                {post?.author.name}
              </span>
              <span> el {longDate(post?.postedAt)}</span>
            </div>
          )}

          <p className="flex-wrap whitespace-pre-wrap">{post?.summary}</p>
        </div>

        {!isntOwnPost && <PostOwnerOptions post={post} />}
      </div>
      <HTMLParser delta={post?.content} title={post?.title} />

      <CollectionNavigate />

      {isLoggedIn && <LikeCommentShare docId={postId} docType="post" />}
      <PostComments postId={postId} />
    </div>
  );
}

export default PostDetail;
