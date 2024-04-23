import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { Link } from "react-router-dom";
import UserOptions from "./UserOptions";

function UserHeader({ user }) {
  const [displayOptions, setDisplayOptions] = useState(false);

  function handleCloseDisplayOptions() {
    setDisplayOptions(false);
  }

  const userNameRef = useRef();

  useEffect(() => {
    function toggleDisplayOptions(e) {
      if (userNameRef?.current.contains(e.target)) {
        setDisplayOptions((previous) => !previous);
      }
    }
    function handleClickOutside(e) {
      if (userNameRef.current && !userNameRef.current.contains(e.target)) {
        setDisplayOptions(false);
      }
    }

    document.addEventListener("click", toggleDisplayOptions);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", toggleDisplayOptions);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between gap-5">
      <Link to={`/user/${user._id}`}>
        <img
          src={`/users/${user.photo}`}
          alt={user.name}
          className="w-24 rounded-full"
        />
      </Link>

      <div className="relative">
        <div
          ref={userNameRef}
          className="flex w-60 items-start gap-3 hover:cursor-pointer"
        >
          <p className="flex text-right">{user.name}</p>
          <HiChevronDown className="my-1" />
        </div>

        {displayOptions && (
          <UserOptions
            user={user}
            onCloseDisplayOptions={handleCloseDisplayOptions}
          />
        )}
      </div>
    </div>
  );
}

export default UserHeader;
