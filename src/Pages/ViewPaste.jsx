import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams(); // URL se id nikalna
  const allPastes = useSelector((state) => state.paste.Paste);

  const [title, settitle] = useState("");
  const [value, setvalue] = useState("");
  const [copied, setCopied] = useState(false); // Copy state

  useEffect(() => {
    const selected = allPastes.find((item) => item._id === id);
    if (selected) {
      settitle(selected.title);
      setvalue(selected.content);
    }
  }, [id, allPastes]);

  // Copy functionality
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="view-paste-container">
  <button onClick={handleCopy} className="copy-button">
    {copied ? "Copied!" : "Copy"}
  </button>

  <input
    type="text"
    value={title}
    disabled
    placeholder="Enter title here"
    className="view-title-input"
  />

  <div className="textarea-wrapper">
    <textarea
      value={value}
      disabled
      rows={14}
      placeholder="Enter content here"
      className="view-textarea"
    />
  </div>
</div>

  );
};

export default ViewPaste;
