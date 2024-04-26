//TODO: Maybe make this list include different lists inside it instead of this top level mess of ps, Links and lis. So you get something like:
/*  <ul>
      <li>
        <h2>Header for First Section</h2>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </li>
      <li>
        <h2>Header for Second Section</h2>
        <ul>
          <li>Item 3</li>
          <li>Item 4</li>
        </ul>
      </li>
    </ul> */
// TODO: Must format the Link and create it's page

import { useRef } from "react";
import PostResult from "./PostResult";
import UserResult from "./UserResult";
import { useScrollList } from "../../hooks/useScrollList";
import { BiLoaderAlt } from "react-icons/bi";
import { SEARCH_RESULTS } from "../../utils/constants";
import { Link } from "react-router-dom";

function SearchResultList({
  results,
  postsAmount = 0,
  usersAmount = 0,
  onCloseResults,
  isFetching,
  query,
}) {
  const listRef = useRef(null);
  const selectedIndex = useScrollList(listRef, onCloseResults);

  const trimmedPostsAmount =
    postsAmount > SEARCH_RESULTS ? SEARCH_RESULTS : postsAmount;
  const trimmedUsersAmount =
    usersAmount > SEARCH_RESULTS ? SEARCH_RESULTS : usersAmount;

  if (isFetching)
    return (
      <div className="absolute top-[110%] z-50 flex  w-[100%] items-center justify-center rounded-xl bg-slate-200">
        <p className="p-4 text-center text-3xl">Estamos buscando</p>
        <BiLoaderAlt className="animate-spin" />
      </div>
    );

  if (results.length === 0)
    return (
      <div className="absolute top-[110%] z-50 w-[100%]  rounded-xl bg-slate-200">
        <p className="p-4 text-center text-3xl">
          Tu búsqueda no devolvió resultados.
        </p>
        <p className="p-4 text-center text-3xl">
          Recordá que podés buscar textos por título o resumen y autores por
          descripción, nombre o nombre de usuario
        </p>
      </div>
    );

  return (
    <ul
      ref={listRef}
      className="absolute top-[110%] z-50 w-[100%] gap-1 rounded-xl bg-slate-200"
    >
      {results?.map((result, index) => {
        switch (true) {
          // Case when result is first Post
          case index === 0 && trimmedPostsAmount > 0:
            console.log("Case 1");
            return (
              <>
                <p
                  key={`posts-title-${index}`}
                  className="rounded-t-xl border-b-2 border-slate-300 bg-slate-300 px-2 py-2 font-semibold"
                >
                  Posts
                </p>
                <PostResult
                  key={result._id}
                  selected={index === selectedIndex}
                  to={`/post/${result._id}`}
                  result={result}
                />
              </>
            );
          // Case when result is last post & there are more in query
          case index === trimmedPostsAmount - 1 &&
            postsAmount > trimmedPostsAmount:
            console.log("Case 2");
            return (
              <>
                <PostResult
                  key={result._id}
                  selected={index === selectedIndex}
                  to={`/post/${result._id}`}
                  result={result}
                />
                <Link key={`posts-link-${index}`} to={`/posts/${query}`}>
                  See more
                </Link>
              </>
            );
          // Case when result is any other post
          case index < trimmedPostsAmount:
            console.log("Case 3");
            return (
              <PostResult
                key={result._id}
                selected={index === selectedIndex}
                to={`/post/${result._id}`}
                result={result}
              />
            );
          // Case when result is first user
          case index === trimmedPostsAmount:
            console.log("Case 4");
            return (
              <>
                <p
                  key={`users-title-${index}`}
                  className="rounded-t-xl border-b-2 border-slate-300 bg-slate-300 px-2 py-2 font-semibold"
                >
                  Users
                </p>
                <UserResult
                  key={result._id}
                  selected={index === selectedIndex}
                  to={`/user/${result._id}`}
                  result={result}
                />
              </>
            );
          // Case when result is last user & there are more in query
          case index === results.length - 1 && usersAmount > trimmedUsersAmount:
            console.log("Case 5");
            return (
              <>
                <UserResult
                  key={result._id}
                  selected={index === selectedIndex}
                  to={`/post/${result._id}`}
                  result={result}
                />
                <Link key={`users-link-${index}`} to={`/users/${query}`}>
                  See more
                </Link>
              </>
            );
          // Case when result is any other user
          case index > trimmedPostsAmount:
            console.log("Case 6");
            return (
              <UserResult
                key={result._id}
                selected={index === selectedIndex}
                to={`/user/${result._id}`}
                result={result}
              />
            );
          default:
            return <></>;
        }
      })}
    </ul>
  );
}

export default SearchResultList;
