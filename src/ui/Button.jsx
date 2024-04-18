function Button({
  children,
  size = "medium",
  variation = "primary",
  shape = "square",
  ...attributes
}) {
  const base = "border-none shadow-sm disabled:cursor-not-allowed";
  const sizes = {
    small: "px-3 py-2 text-center text-xl font-semibold uppercase",
    medium: "px-6 py-5 text-2xl font-medium",
    large: "px-10 py-5 text-3xl font-medium",
  };
  const variations = {
    primary: "text-indigo-50 bg-indigo-600 hover:bg-indigo-700",
    secondary:
      "border-stone-200 border-2 text-stone-600 bg-stone-50 hover:bg-stone-100",
    danger: "bg-red-700 text-red-100 hover:bg-red-800",
  };
  const shapes = {
    square: "rounded-md",
    round: "aspect-square rounded-full",
  };
  const style =
    base +
    " " +
    sizes[size] +
    " " +
    variations[variation] +
    " " +
    shapes[shape];

  return (
    <button {...attributes} className={style}>
      {children}
    </button>
  );
}

export default Button;
