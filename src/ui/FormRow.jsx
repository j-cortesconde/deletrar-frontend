function FormRow({ label, orientation = "vertical", error, children }) {
  const styles = {
    vertical: "flex flex-col gap-3 py-5",
    horizontal:
      "grid grid-cols-[16rem,1.2fr,0.8fr] items-center gap-10 py-5 text-right first:pt-0 last:pb-0 has-[button]:flex has-[button]:justify-center has-[button]:gap-5",
  };

  return (
    <div className={styles[orientation]}>
      {label && (
        <label htmlFor={children.props.id} className="font-medium">
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-2xl text-red-700">{error}</span>}
    </div>
  );
}

export default FormRow;
