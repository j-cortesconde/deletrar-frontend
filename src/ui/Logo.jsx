function Logo({ size = "medium" }) {
  const src = "/logo-light.jpg";
  const base = "inline-block w-auto rounded-full";
  const sizes = {
    medium: "h-24",
    large: "h-44",
  };
  const style = base + " " + sizes[size];

  return (
    <div className="text-center">
      <img src={src} alt="Logo" className={style} />
      {/* <p className="text-4xl font-bold">DELETRAR</p> */}
    </div>
  );
}

export default Logo;
