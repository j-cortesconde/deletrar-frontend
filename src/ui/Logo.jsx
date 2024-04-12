function Logo() {
  const src = "/logo-light.jpg";

  return (
    <div className="flex items-center">
      <img src={src} alt="Logo" className="h-12 w-12" />
      <p>Deletrar</p>
    </div>
  );
}

export default Logo;
