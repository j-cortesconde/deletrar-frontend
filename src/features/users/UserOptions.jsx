import { useRef } from "react";
import ScrollableLi from "../../ui/ScrollableLi";
import { useLogout } from "../authentication/useLogout";
import { useScrollList } from "../../hooks/useScrollList";
import { useNavigate } from "react-router-dom";

function UserOptions({ user, onCloseDisplayOptions }) {
  const optionsRef = useRef(null);
  const selectedIndex = useScrollList(optionsRef, onCloseDisplayOptions);
  const navigate = useNavigate();
  const { logout } = useLogout();

  return (
    <ul
      ref={optionsRef}
      className="absolute top-[110%] z-50 flex w-full flex-col gap-1 rounded-xl  bg-slate-200 text-right "
    >
      <ScrollableLi
        onClick={() => navigate(`/user/${user._id}`)}
        selected={selectedIndex === 0}
      >
        Profile
      </ScrollableLi>
      <ScrollableLi
        onClick={() => navigate(`/settings`)}
        selected={selectedIndex === 1}
      >
        Settings
      </ScrollableLi>
      <ScrollableLi
        onClick={() => navigate(`/invite`)}
        selected={selectedIndex === 2}
      >
        Invite
      </ScrollableLi>
      <ScrollableLi
        onClick={() => navigate(`/help`)}
        selected={selectedIndex === 3}
      >
        Help
      </ScrollableLi>
      <ScrollableLi onClick={logout} selected={selectedIndex === 4}>
        Log out
      </ScrollableLi>
    </ul>
  );
}

export default UserOptions;
