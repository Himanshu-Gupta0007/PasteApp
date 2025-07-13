import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTopaste, updatedTopaste } from "../redux/Pasteslice";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [title, settitle] = useState("");
  const [value, setvalue] = useState("");
  const [searchParams] = useSearchParams();
  const pasteID = searchParams.get("id");

  const dispatch = useDispatch();

  const createpaste = () => {
    if (!title.trim() && !value.trim()) {
      toast.error("Kuch line to likh bhai, phir paste banega!");
      return;
    }

    if (pasteID) {
      dispatch(updatedTopaste({ _id: pasteID, title, content: value }));
      toast.success("Paste updated!");
    } else {
      const newPaste = {
        _id: Date.now().toString(),
        title,
        content: value,
        createdAt: new Date().toLocaleString(),
      };
      dispatch(addTopaste(newPaste));
    }

    // Reset fields
    settitle("");
    setvalue("");
  };

  return (
    <div className="paste-container">
  <input
    type="text"
    placeholder=" Title "
    value={title}
    onChange={(e) => settitle(e.target.value)}
    className="input-field"
  />

  <textarea
    value={value}
     placeholder="Enter content here"
    onChange={(e) => setvalue(e.target.value)}
    rows={10}
    className="textarea-field"
  />

  <button
    onClick={createpaste}
    disabled={!title.trim() && !value.trim()}
    className="submit-btn"
  >
    {pasteID ? "Update My Paste" : "Create My Paste"}
  </button>
</div>

  );
};

export default Home;
