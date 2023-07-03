import React, { useState } from "react";

function UserForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, language, code);
    setName("");
    setLanguage("");
    setCode("");
  };

  return (
    <form className="myForm" onSubmit={handleOnSubmit}>
      <input
        className="myInput"
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="myInput"
        type="text"
        placeholder="language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      />
      <textarea
        className="myInput codeInput"
        placeholder="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>

      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
