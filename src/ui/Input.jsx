function Input({ children, ...attributes }) {
  return (
    <input
      {...attributes}
      className="flex rounded-sm border-2 border-stone-300 bg-stone-50 px-5 py-3 shadow-sm"
    >
      {children}
    </input>
  );
}

export default Input;
