import parse from "html-react-parser";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

function HTMLParser({ delta }) {
  const converter = new QuillDeltaToHtmlConverter(delta.ops, {
    inlineStyles: true,
  });
  const html = converter.convert();

  return (
    <div className="m-10 border-t-2 border-stone-300 p-10 text-left first-letter:text-6xl">
      {parse(html)}
    </div>
  );
}

export default HTMLParser;
