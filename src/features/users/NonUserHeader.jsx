import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

function NonUserHeader() {
  const navigate = useNavigate();
  return (
    <div className="col-span-1 flex items-center justify-end gap-10">
      <Link to="/account/request" className="text-center text-2xl">
        Request account
      </Link>
      <Button size="medium" onClick={() => navigate("/account/login")}>
        Login
      </Button>
    </div>
  );
}

export default NonUserHeader;
