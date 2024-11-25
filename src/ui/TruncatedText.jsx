import { useEffect, useRef, useState } from "react";

const TruncatedText = ({
  text,
  maxLines = 3 /*maxLines MSUT be a value between 1-10*/,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef(null);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  // TODO: Doesn't trigger when the window width is modified (and the maxHeight changes). Maybe it should some day
  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(textRef.current).lineHeight,
      );
      const maxHeight = lineHeight * maxLines;

      if (textRef.current.scrollHeight > maxHeight) {
        setIsOverflowing(true);
      } else {
        setIsOverflowing(false);
      }
    }
  }, [text, maxLines]);

  return (
    <div>
      <p
        ref={textRef}
        className={`flex-wrap overflow-hidden whitespace-pre-wrap break-words text-justify text-gray-800 ${isExpanded ? "" : `line-clamp-${maxLines}`}`}
      >
        {text}
      </p>
      {isOverflowing && (
        <button
          onClick={toggleExpanded}
          className="mt-2 text-blue-500 hover:underline"
        >
          {isExpanded ? "Ver menos" : "Ver más"}
        </button>
      )}
    </div>
  );
};

export default TruncatedText;
