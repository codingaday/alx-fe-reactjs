import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Contact Us</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        {["name", "email"].map((field, index) => (
          <input
            key={index}
            type={field === "email" ? "email" : "text"}
            name={field}
            placeholder={`Your ${
              field.charAt(0).toUpperCase() + field.slice(1)
            }`}
            value={formData[field]}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              margin: "10px 0",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
        ))}
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            margin: "10px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            height: "100px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "15px 30px",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
