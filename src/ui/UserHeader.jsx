function UserHeader({ user }) {
  console.log(user);
  return <div className="">{user?.name}</div>;
}

export default UserHeader;
