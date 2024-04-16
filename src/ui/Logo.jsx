function Logo() {
  const src = "/logo-light.jpg";

  return (
    <div className="text-center">
      <img
        src={src}
        alt="Logo"
        className="inline-block h-44 w-auto rounded-full"
      />
      {/* <p className="text-4xl font-bold">DELETRAR</p> */}
    </div>
  );
}

export default Logo;
