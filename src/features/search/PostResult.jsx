import { Link, useNavigate } from "react-router-dom";

function PostResult({ selected = false, to, result }) {
  const navigate = useNavigate();

  const baseLi =
    "border-stone-300 w-full my-1 hover:bg-slate-300 hover:cursor-pointer truncate px-2 py-1";
  const selectedLi = " bg-slate-400 font-semibold";
  const liStyle = selected ? baseLi + selectedLi : baseLi;

  const baseP = "truncate text-lg mx-2";
  const selectedP = " whitespace-normal break-normal p-1";
  const pStyle = selected ? baseP + selectedP : baseP;

  return (
    <li className={liStyle} onClick={() => navigate(to)}>
      <Link to={to} className="mx-2 align-middle">
        <span>{result.title}</span>
        <span className="text-lg"> - {result.author.name}</span>
      </Link>
      <p className={pStyle}>{result.summary}</p>
    </li>
  );
}

export default PostResult;
