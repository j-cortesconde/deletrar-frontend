import { Link, useNavigate } from "react-router-dom";
import SearchLi from "../../ui/SearchLi";

function PostResult({ selected = false, to, result }) {
  const navigate = useNavigate();

  const baseP = "truncate text-lg mx-2";
  const selectedP = " whitespace-normal break-normal p-1";
  const pStyle = selected ? baseP + selectedP : baseP;

  return (
    <SearchLi selected={selected} onClick={() => navigate(to)}>
      <Link to={to} className="mx-2 align-middle">
        <span>{result.title}</span>
        <span className="text-lg"> - {result.author.name}</span>
      </Link>
      <p className={pStyle}>{result.summary}</p>
    </SearchLi>
  );
}

export default PostResult;
