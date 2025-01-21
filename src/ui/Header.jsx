import Logo from "./Logo";
import SearchBar from "../features/search/header/SearchBar";
import UserHeader from "../features/users/UserHeader";
import NonUserHeader from "../features/users/NonUserHeader";

function Header({ user }) {
  return (
    <header className="grid grid-cols-4 items-center bg-slate-200 px-10 py-4">
      <Logo />
      <SearchBar />
      {user ? <UserHeader user={user} /> : <NonUserHeader />}
    </header>
  );
}

export default Header;
