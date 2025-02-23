function Footer() {
  return (
    <footer
      style={{
        padding: "20px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        textAlign: "center",
        marginTop: "40px",
        boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p>&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
