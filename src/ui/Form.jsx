function Form({ children, type = "regular", ...attributes }) {
  const baseStyle = "overflow-hidden text-2xl rounded-2xl border-2 px-16 py-10";
  const styles = {
    regular: baseStyle + " border-stone-100 bg-stone-50",
    inAppLayoutInt: baseStyle + " border-slate-300 bg-slate-200",
  };
  return (
    <form className={styles[type]} {...attributes}>
      {children}
    </form>
  );
}

export default Form;
