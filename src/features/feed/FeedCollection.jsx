// Base Component sourced and extracted from https://www.creative-tim.com/twcomponents/component/social-media-layout

import { Link } from "react-router-dom";
import { dateDistance } from "../../utils/dateFormat";
import { useEffect, useState } from "react";
import TruncatedText from "../../ui/TruncatedText";

function FeedCollection({ collection }) {
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [shownPosts, setShownPosts] = useState(collection?.posts?.slice(0, 3));

  const postedPosts = collection?.posts?.reduce((count, post) => {
    return post.status === "posted" ? count + 1 : count;
  }, 0);

  const handleShowAll = () => {
    setShowAllPosts((prev) => !prev);
  };

  useEffect(() => {
    if (showAllPosts) {
      setShownPosts(collection?.posts);
    } else {
      setShownPosts(collection?.posts?.slice(0, 3));
    }
  }, [showAllPosts, collection?.posts]);

  if (collection?.status !== "posted") {
    return (
      <div className="w-full rounded-lg border-2 border-neutral-400 bg-white px-8 py-4 text-start shadow-xl">
        <p className="italic ">Esta colección ya no está disponible</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg border-2 border-neutral-400 bg-white px-8 pb-4 pt-8 text-start shadow-xl">
      {/* <!-- User Info with Three-Dot Menu --> */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-full w-full items-start gap-2 truncate">
          <Link
            to={`/user/${collection?.collector.username}`}
            className="h-20 w-20 flex-shrink-0"
          >
            <img
              src={collection?.collector.photo}
              alt="User Avatar"
              className="h-20 w-20 rounded-full object-cover"
            />
          </Link>
          <div className="flex w-full flex-col justify-between gap-1 truncate">
            <div className="truncate">
              <Link
                to={`/user/${collection?.collector.username}`}
                className="truncate"
              >
                <p className=" inline truncate font-semibold text-gray-800">
                  {collection?.collector.name}
                </p>
              </Link>
            </div>
            <p className="text-xl text-gray-500">
              Publicado {dateDistance(collection?.postedAt)}
            </p>
          </div>
        </div>
        <div className="cursor-pointer text-gray-500">
          {/* <!-- Three-dot menu icon --> */}
          <button className="rounded-full hover:bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="7" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="17" r="1" />
            </svg>
          </button>
        </div>
      </div>
      {/* <!-- Title --> */}
      <div className="mb-4">
        <Link to={`/collection/${collection?._id}`}>
          <p className="inline break-words font-medium text-gray-800 underline underline-offset-2">
            {collection?.title}
          </p>
        </Link>
        {/* <!-- Subtitle --> */}
        {collection?.subtitle && (
          <p className="break-words text-gray-800">{collection?.subtitle}</p>
        )}
      </div>
      {/* <!-- Image --> */}
      {collection?.coverImage && (
        <div className="mb-4">
          <Link
            to={`/collection/${collection?._id}`}
            className="flex justify-center"
          >
            <img
              src={collection?.coverImage}
              alt="Collection Cover"
              className="h-48 w-full rounded-md object-cover"
            />
          </Link>
        </div>
      )}
      {/* <!-- Summary --> */}
      {collection?.summary && (
        <TruncatedText text={collection?.summary} maxLines={4} />
      )}
      {/* <!-- Posts --> */}
      <div className="mt-4 text-gray-800">
        <p>Textos de esta colección:</p>
        <ul className="indent-4">
          {shownPosts?.map(
            (post) =>
              post?.status === "posted" && (
                <li key={post?._id} className="mb-1">
                  <div className="line-clamp-2">
                    <Link to={`/post/${post?._id}`} className=" font-semibold">
                      - {post?.title}
                    </Link>
                    <span> de </span>
                    <Link
                      to={`/user/${post?.author.username}`}
                      className="italic"
                    >
                      {post?.author.name}
                    </Link>
                  </div>
                </li>
              ),
          )}
        </ul>
        {postedPosts > 3 && (
          <p
            onClick={handleShowAll}
            className="ml-10 inline underline hover:cursor-pointer"
          >
            Ver {showAllPosts ? "menos" : "todos"}
          </p>
        )}
      </div>

      {/* <!-- Like and Comment Section --> */}
      {/* <div className="flex items-center justify-between text-gray-500">
        <div className="flex items-center space-x-2">
          <button className="flex items-center justify-center gap-2 rounded-full p-1 px-2 hover:bg-gray-50">
            <svg
              className="h-5 w-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>42 Likes</span>
          </button>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-full p-1 px-2 hover:bg-gray-50">
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"
              ></path>
            </g>
          </svg>
          <span>3 Comment</span>
        </button>
      </div> */}
    </div>
  );
}

export default FeedCollection;
