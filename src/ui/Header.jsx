import Logo from "./Logo";
import SearchBar from "../features/search/SearchBar";
import UserHeader from "./UserHeader";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../features/users/useCurrentUser";

function Header() {
  const { user } = useCurrentUser();
  console.log(user);

  return (
    <header className="flex items-center justify-between bg-slate-200 px-10 py-4">
      <Logo />
      <SearchBar />
      {user ? <UserHeader user={user} /> : <Link to="/login">Login</Link>}
    </header>
  );
}

export default Header;
