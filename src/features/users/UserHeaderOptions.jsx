import ScrollableLi from "../../ui/ScrollableLi";
import { useLogout } from "../authentication/useLogout";
import { useScrollList } from "../../hooks/useScrollList";
import { useNavigate } from "react-router-dom";

function UserHeaderOptions({ user, onCloseDisplayOptions }) {
  const { listRef, selectedIndex } = useScrollList(onCloseDisplayOptions);
  const navigate = useNavigate();
  const { logout } = useLogout();

  return (
    <ul
      ref={listRef}
      className="absolute top-[110%] z-50 flex w-full flex-col gap-1 rounded-xl  bg-slate-200 text-right "
    >
      <ScrollableLi
        onClick={() => navigate(`/user/${user.username}`)}
        selected={selectedIndex === 0}
      >
        Profile
      </ScrollableLi>
      <ScrollableLi
        onClick={() => navigate(`/conversations/all`)}
        selected={selectedIndex === 1}
      >
        Conversaciones
      </ScrollableLi>
      <ScrollableLi
        onClick={() => navigate(`/user/settings`)}
        selected={selectedIndex === 1}
      >
        Settings
      </ScrollableLi>
      <ScrollableLi
        onClick={() => navigate(`/users/invite`)}
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

export default UserHeaderOptions;
