import { longDate } from "../utils/dateFormat";
import { useNavigate, useParams } from "react-router-dom";

import { usePost } from "../features/posts/usePost";
import { useIsntOwnPost } from "../features/posts/useIsntOwnPost";
import { useQueryClient } from "@tanstack/react-query";
import { useErrorHandler } from "../hooks/useErrorHandler";

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
  useErrorHandler(error);

  const isntOwnPost = useIsntOwnPost(post);

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto w-3/4">
      <img
        src={post?.coverImage}
        alt="Post Cover"
        className="object mx-auto my-3 h-96 min-w-[100%] max-w-full rounded-lg object-cover"
      />

      <div className="grid grid-cols-5 gap-4 pb-4">
        <div className="col-span-3 col-start-2 flex justify-center">
          <div className="flex-col text-center">
            {post?.status === "posted" && (
              <div>
                <span>Publicado por </span>
                <span
                  onClick={() => navigate(`/user/${post?.author.username}`)}
                  className="font-bold text-stone-900 hover:cursor-pointer"
                >
                  {post?.author.name}
                </span>
                <p> el {longDate(post?.postedAt)}</p>
              </div>
            )}

            <p className="flex-wrap whitespace-pre-wrap">{post?.summary}</p>
          </div>
        </div>
        <div className="flex items-end justify-center">
          {!isntOwnPost && <PostOwnerOptions post={post} />}
        </div>
      </div>
      <HTMLParser delta={post?.content} title={post?.title} />

      <CollectionNavigate />

      {/* {isLoggedIn && <LikeCommentShare docId={postId} docType="post" />} */}
      <LikeCommentShare docId={postId} docType="post" isLoggedIn={isLoggedIn} />

      <PostComments postId={postId} />
    </div>
  );
}

export default PostDetail;
