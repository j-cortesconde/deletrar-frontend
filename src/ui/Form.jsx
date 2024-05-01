function Form({ children, appLayout = "external", ...attributes }) {
  const baseStyle = "overflow-hidden text-2xl rounded-2xl border-2 px-16 py-10";
  const styles = {
    external: baseStyle + " border-stone-100 bg-stone-50",
    internal: baseStyle + " border-slate-300 bg-slate-200 text-left",
  };
  return (
    <form className={styles[appLayout]} {...attributes}>
      {children}
    </form>
  );
}

export default Form;
