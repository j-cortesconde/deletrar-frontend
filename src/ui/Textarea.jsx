function Textarea({ children, register = {}, attributes }) {
  // "w-28 rounded-full bg-white px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-stone-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
  // "flex rounded-sm border-2 border-stone-300 bg-stone-50 px-5 py-3 shadow-sm"
  return (
    <textarea
      {...register}
      {...attributes}
      className="flex rounded-sm border-2 border-stone-300 bg-stone-50 px-5 py-3 shadow-sm"
    >
      {children}
    </textarea>
  );
}

export default Textarea;
