import { useNavigate } from "react-router-dom";
import Feed from "../features/feed/Feed";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/post/write/673fae512f55e37fbc4cda62");
        }}
      >
        Botoneá
      </button>
      <Feed />
    </div>
  );
}

export default Home;
