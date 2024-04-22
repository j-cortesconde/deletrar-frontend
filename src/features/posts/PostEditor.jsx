import ReactQuill from "react-quill";

function PostEditor({ value, quillRef, handleChange, className }) {
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown

      ["bold", "italic", "underline", "strike"], // toggled buttons
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],

      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    ],
  };

  const formats = [
    "header",
    "background",
    "color",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "size",
    "blockquote",
    "list",
    "bullet",
    "align",
    "indent",
    "link",
    "script",
  ];

  return (
    <ReactQuill
      ref={quillRef}
      style={{ flex: "1 1 0%" }}
      theme="snow"
      value={value}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      className={className}
    />
  );
}

export default PostEditor;
