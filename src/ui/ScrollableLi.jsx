function ScrollableLi({ selected, children, ...attributes }) {
  const baseStyle =
    "border-stone-300 w-full my-1 hover:bg-slate-300 hover:cursor-pointer truncate px-2 py-1";
  const selectedStyle = " bg-slate-400 font-semibold";
  const style = selected ? baseStyle + selectedStyle : baseStyle;
  return (
    <li className={style} {...attributes}>
      {children}
    </li>
  );
}

export default ScrollableLi;
