import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Notes = ({ setShowNotes }) => {
  const [notes, setNotes] = useState();

  useEffect(() => {
    if (window.localStorage.notes) {
      setNotes(window.localStorage.notes);
    }
  }, []);

  return (
    <div className="notes-container">
      <h4>Notes</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (notes === "") {
            localStorage.removeItem("notes");
          }
          setShowNotes(false);
        }}
      >
        <textarea
          placeholder="Notes"
          onInput={(e) => {
            setNotes(e.target.value);
            window.localStorage.notes = notes;
          }}
          defaultValue={notes?.length > 1 ? notes : null}
        />
        <input type="submit" value="Confirm" />
      </form>
    </div>
  );
};

export default Notes;
