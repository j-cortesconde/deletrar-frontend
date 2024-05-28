function Slider({ toggleState, onToggle, optionTrue, optionFalse }) {
  return (
    <div className={`h-16 w-96`}>
      <div
        onClick={onToggle}
        className={`relative h-full w-full rounded-full bg-gray-400 hover:cursor-pointer hover:shadow-lg`}
      >
        <div
          className={`absolute top-0 z-50 flex h-16 w-1/2 transform items-center justify-center rounded-full bg-indigo-600 text-indigo-50 transition-all duration-300 ${
            toggleState ? "left-0" : "left-1/2"
          }`}
        >
          {toggleState ? optionTrue : optionFalse}
        </div>

        <div
          className={`absolute left-0 top-0 flex h-16 w-1/2 items-center justify-center rounded-full text-indigo-50 transition-all duration-300`}
        >
          {optionTrue}
        </div>

        <div
          className={`absolute left-1/2 top-0 flex h-16 w-1/2 items-center justify-center rounded-full text-indigo-50 transition-all duration-300`}
        >
          {optionFalse}
        </div>
      </div>
    </div>
  );
}

export default Slider;
