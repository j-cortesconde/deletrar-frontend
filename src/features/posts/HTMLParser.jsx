import parse from "html-react-parser";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

function HTMLParser({ delta, title }) {
  const converter = new QuillDeltaToHtmlConverter(delta?.ops, {
    inlineStyles: true,
  });
  const html = converter.convert();

  return (
    <div className="border-t-2 border-stone-300 p-10">
      <p className="text-center text-6xl font-semibold">{title}</p>
      <div className="text-justify first-letter:text-6xl">{parse(html)}</div>
    </div>
  );
}

export default HTMLParser;
