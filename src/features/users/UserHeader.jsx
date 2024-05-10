import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { Link } from "react-router-dom";
import UserHeaderOptions from "./UserHeaderOptions";
import { useClickOutsideDropdown } from "../../hooks/useClickOutsideDropdown";

function UserHeader({ user }) {
  const [displayOptions, setDisplayOptions] = useState(false);
  const userNameRef = useRef();

  function handleCloseDisplayOptions() {
    setDisplayOptions(false);
  }

  useClickOutsideDropdown(userNameRef, handleCloseDisplayOptions);

  useEffect(() => {
    function toggleDisplayOptions(e) {
      if (userNameRef?.current.contains(e.target)) {
        setDisplayOptions((previous) => !previous);
      }
    }

    document.addEventListener("click", toggleDisplayOptions);

    return () => {
      document.removeEventListener("click", toggleDisplayOptions);
    };
  }, []);

  return (
    <div className="flex items-center justify-between gap-5">
      <Link to={`/user/${user.username}`}>
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
          <UserHeaderOptions
            user={user}
            onCloseDisplayOptions={handleCloseDisplayOptions}
          />
        )}
      </div>
    </div>
  );
}

export default UserHeader;
