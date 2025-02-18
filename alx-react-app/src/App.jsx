import React from "react";
import UserProfile from "./components/UserProfile";
import WelcomeMessage from "./components/WelcomeMessage";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
      <WelcomeMessage />
      <Header />
      <MainContent />
      <Footer />
    </>
  );
}

export default App;
