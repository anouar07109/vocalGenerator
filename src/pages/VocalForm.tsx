import React, { useState } from "react";
import axios from "axios";
import "./formulaire.css";

const VocalForm = () => {
  const [form, setForm] = useState({
    name: "",
    language: "",
    text: "",
    vocal_source: "",
  });
  const [vocalSource, setVocalSource] = useState("upload");
  const [vocalFile, setVocalFile] = useState(null);

  const submitForm = () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("language", form.language);
    formData.append("text", form.text);
    formData.append("vocal_source", form.vocal_source);
    formData.append("file", vocalFile);
    axios
      .post("http://localhost:3001/vocals", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="form-container">
      <h2>Formulaire</h2>

      <form>
        <div className="input-group">
          <div className="text-input-container">
            <label htmlFor="textInput">TEXTE :</label>
            <textarea
              id="textInput"
              placeholder="Entrez du texte ici"
              className="large-text-input"
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
            />
          </div>
          <div className="language-select">
            <label htmlFor="languageSelect">Langue :</label>
            <select
              id="languageSelect"
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
            >
              <option value="english">English</option>
              <option value="francais">Français</option>
              <option value="arabe">العربية</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="nameInput">Name :</label>
          <input
            type="text"
            id="nameInput"
            placeholder="Entrez votre nom"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="radio-group">
          <label>Option :</label>
          <div>
            <label>
              <input
                type="radio"
                name="option"
                value="generated"
                onChange={() => setVocalSource("generated")}
                checked={vocalSource === "generated"}
              />
              Generated
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="option"
                value="upload"
                onChange={() => setVocalSource("upload")}
                checked={vocalSource === "upload"}
              />
              Upload
            </label>
          </div>
        </div>

        {vocalSource === "upload" && (
          <div className="conditional-fields">
            <label htmlFor="fileUpload">Téléchargez un fichier :</label>
            <input
              type="file"
              id="fileUpload"
              onChange={(e) => setVocalFile(e.target.files[0])}
            />
          </div>
        )}

        <button type="button" onClick={submitForm} className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default VocalForm;
