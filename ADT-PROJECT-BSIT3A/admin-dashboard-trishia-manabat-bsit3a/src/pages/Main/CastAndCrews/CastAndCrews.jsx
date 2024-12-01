import React, { useState } from "react";
import axios from "axios";

const CastAndCrews = () => {
  const [form, setForm] = useState({
    userId: "1",
    movieId: "38",
    name: "",
    url: "",
    characterName: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/movieproject-api/admin/casts",
        form,
        {
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidGVzdEBtYWlsLmNvbSIsImZpcnN0TmFtZSI6InN0cmluZyIsIm1pZGRsZU5hbWUiOiJzdHJpbmciLCJsYXN0TmFtZSI6InN0cmluZyIsImNvbnRhY3RObyI6InN0cmluZyIsInJvbGUiOiJ1c2VyIn0.D-Q2rYdQe9UWDu1HWAg_i1Hg48J-tyglpXZgiAQYTl0", // Add the Bearer Token here
          },
        }
      );
      setMessage(`Cast created: ${response.data.id}`);
    } catch (error) {
      setMessage("Failed to create cast.");
    }
  };

  return (
    <div>
      <h2>Create New Cast</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="characterName"
          value={form.characterName}
          onChange={handleChange}
          placeholder="Character Name"
        />
        <input
          type="text"
          name="url"
          value={form.url}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <button type="submit">Create Cast</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CastAndCrews;