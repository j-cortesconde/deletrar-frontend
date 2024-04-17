import { HiChevronDown } from "react-icons/hi";

function UserOptions({ user }) {
  return (
    <div className="flex items-center justify-between gap-5">
      <img
        src={`/users/${user.photo}`}
        alt={user.name}
        className="w-24 rounded-full"
      />
      <div className="flex w-60 items-start gap-3 hover:cursor-pointer">
        <p className="flex text-right">{user.name}</p>
        <HiChevronDown className="my-1" />
      </div>
    </div>
  );
}

export default UserOptions;
