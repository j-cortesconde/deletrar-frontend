import { useNavigate } from "react-router-dom";

function Logo({ size = "medium" }) {
  const navigate = useNavigate();

  const src = "/logo-light.jpg";
  const base = "inline-block w-auto rounded-full";
  const sizes = {
    medium: "h-24",
    large: "h-44",
  };
  const style = base + " " + sizes[size];

  return (
    <div
      className="col-span-1 flex justify-start text-center hover:cursor-pointer"
      onClick={() => navigate("/")}
    >
      <img src={src} alt="Logo" className={style} />
      {/* <p className="text-4xl font-bold">DELETRAR</p> */}
    </div>
  );
}

export default Logo;
