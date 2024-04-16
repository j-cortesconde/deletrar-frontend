function Form({ children, type = "regular", ...attributes }) {
  const baseStyle = "overflow-hidden text-2xl";
  const styles = {
    regular:
      baseStyle +
      " rounded-2xl border-2 border-stone-100 bg-stone-50 px-16 py-10",
    modal: baseStyle + " w-[80rem]",
  };
  return (
    <form className={styles[type]} {...attributes}>
      {children}
    </form>
  );
}

export default Form;
