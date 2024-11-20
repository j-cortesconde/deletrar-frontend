// FIXME: How does one connect the images from the frontend to the backend?
import { NavLink, Outlet } from "react-router-dom";

import { useIsOwnUser } from "../features/users/useIsOwnUser";
import UserInfo from "../features/users/UserInfo";

function UserLayout() {
  const { isOwnUser, username } = useIsOwnUser();

  const navLinkStyle =
    "text-3xl capitalize font-semibold p-4 pb-2 rounded-md hover:cursor-pointer hover:bg-slate-400 border-b-4 mx-auto";
  const inactiveStyle = navLinkStyle + " border-transparent";
  const activeStyle = navLinkStyle + " border-slate-500";

  return (
    <div className="mx-auto w-3/4">
      <UserInfo />

      <ul className="my-4 flex justify-center border-y-2 border-stone-300 pb-3 pt-2">
        <NavLink
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          to={`/user/${username}/posts`}
        >
          Publicaciones
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          to={`/user/${username}/collections`}
        >
          Colecciones
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          to={`/user/${username}/saved`}
        >
          Guardados
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          to={`/user/${username}/shared`}
        >
          Compartidos
        </NavLink>
        {isOwnUser && (
          <NavLink
            className={({ isActive }) =>
              isActive ? activeStyle : inactiveStyle
            }
            to={`/user/${username}/hidden`}
          >
            Inéditos
          </NavLink>
        )}
        <NavLink
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          to={`/user/${username}/subscribers`}
        >
          Suscriptores
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
          to={`/user/${username}/subscribed`}
        >
          Suscripto
        </NavLink>
      </ul>

      <Outlet />
    </div>
  );
}

export default UserLayout;
