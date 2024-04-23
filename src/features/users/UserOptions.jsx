import { useEffect, useRef } from "react";
import OptionsLink from "../../ui/OptionsLink";
import { useLogout } from "../authentication/useLogout";
import { useScrollList } from "../../hooks/useScrollList";

function UserOptions({ user, onCloseDisplayOptions }) {
  const optionsRef = useRef(null);
  const selectedIndex = useScrollList(optionsRef, onCloseDisplayOptions);
  const { logout } = useLogout();

  return (
    <div
      ref={optionsRef}
      className="absolute top-[110%] z-50 flex w-full flex-col gap-1 rounded-xl  bg-slate-200 text-right "
    >
      <OptionsLink to={`/user/${user._id}`} selected={selectedIndex === 0}>
        Profile
      </OptionsLink>
      <OptionsLink to={`/settings`} selected={selectedIndex === 1}>
        Settings
      </OptionsLink>
      <OptionsLink to={`/invite`} selected={selectedIndex === 2}>
        Invite
      </OptionsLink>
      <OptionsLink to={`/help`} selected={selectedIndex === 3}>
        Help
      </OptionsLink>
      <OptionsLink onClick={logout} selected={selectedIndex === 4}>
        Log out
      </OptionsLink>
    </div>
  );
}

export default UserOptions;
