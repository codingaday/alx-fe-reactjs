function Footer() {
  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        fontSize: "1.5rem",
        textAlign: "center",
      }}
    >
      <p
        style={{
          padding: "15px 25px",
        }}
      >
        © 2023 City Lovers
      </p>
    </footer>
  );
}

export default Footer;
