function Services() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>Our Services</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {[
          "Technology Consulting",
          "Market Analysis",
          "Product Development",
        ].map((service, index) => (
          <li
            key={index}
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Services;
