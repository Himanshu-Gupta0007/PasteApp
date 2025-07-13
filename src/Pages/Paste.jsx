// src/Pages/Paste.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RemoveFrompaste, updatedTopaste } from "../redux/Pasteslice"; // updatedTopaste add kiya
import toast from "react-hot-toast";

const Paste = () => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const allPastes = useSelector((state) => state.paste.Paste);
  const dispatch = useDispatch();
  const [searchterm, setsearchtrem] = useState("");

  const filterdata = allPastes?.filter((paste) =>
    paste.title.toLowerCase().includes(searchterm.toLowerCase())
  );

  const handleDelete = (id) => {
    dispatch(RemoveFrompaste(id));
  };

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy!");
      });
  };

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setEditTitle(item.title);
    setEditContent(item.content);
  };

  const handleUpdate = () => {
    if (editTitle.trim() === "" || editContent.trim() === "") {
      toast.error("Title or content cannot be empty");
      return;
    }
    dispatch(
      updatedTopaste({ _id: editingId, title: editTitle, content: editContent })
    );
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
   // toast.success("Paste updated successfully");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const handleShare = (item) => {
    if (navigator.share) {
      navigator
        .share({
          title: item.title,
          text: item.content,
          url: `${window.location.origin}/paste?id=${item._id}`,
        })
        
    } else {
      const shareText = `${item.title}\n${item.content}\nLink: ${window.location.origin}/paste?id=${item._id}`;
      navigator.clipboard
        .writeText(shareText)
        .then(() => {
          toast.success("Copied to clipboard (share not supported)!");
        })
        .catch(() => {
          toast.error("Copy failed.");
        });
    }
  };

  return (
    <div className="paste-container">
      
      <div className="input-container" >
  {/* Search Icon */}
  <svg
    className="search-icon"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
    />
  </svg>

  {/* Input Field */}
  <input
    type="text"
    className="search-input"
    placeholder="Search Paste"
    value={searchterm}
    onChange={(e) => setsearchtrem(e.target.value)}
    
  />
</div>

      <h1 >All paste</h1>

      {filterdata?.map((item, index) => (
        <div className="paste-card" key={index}>
          {editingId === item._id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Edit Title"
                className="edit-input"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Edit Content"
                className="edit-textarea"
              />
              <div className="button-group">
                <button onClick={handleUpdate}  >Update      </button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h3>{item.title}</h3>
              <p>{item.content}</p>
             <p>
  {new Date(item.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })}
</p>



              <div className="button-group">
                <button onClick={() => handleEditClick(item)}>Edit</button>
                <button>
                  <a
                    href={`/paste/${item._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
                <button
                  onClick={() => handleCopy(`${item.title}\n${item.content}`)}
                >
                  Copy
                </button>
                <button onClick={() => handleShare(item)}>Share</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Paste;
