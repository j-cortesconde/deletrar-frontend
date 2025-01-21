import { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { Link } from "react-router-dom";
import UserHeaderOptions from "./UserHeaderOptions";
import { useClickOutside } from "../../hooks/useClickOutside";

function UserHeader({ user }) {
  const [displayOptions, setDisplayOptions] = useState(false);

  function handleCloseDisplayOptions() {
    setDisplayOptions(false);
  }

  const { elementRef } = useClickOutside(handleCloseDisplayOptions, false);

  useEffect(() => {
    function toggleDisplayOptions(e) {
      if (elementRef?.current?.contains(e.target)) {
        setDisplayOptions((previous) => !previous);
      }
    }

    document.addEventListener("click", toggleDisplayOptions);

    return () => {
      document.removeEventListener("click", toggleDisplayOptions);
    };
  }, [elementRef]);

  return (
    <div className="col-span-1 flex items-center justify-end gap-5">
      <Link to={`/user/${user.username}`}>
        <img
          src={user.photo}
          alt={user.name}
          className="aspect-square w-24 overflow-hidden rounded-full object-cover"
        />
      </Link>

      <div className="relative">
        <div
          ref={elementRef}
          className="flex w-60 select-none items-start gap-3 hover:cursor-pointer"
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
