"use client";

import WeatherApp from "../../components/WeatherApp";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Chatbot from "../../components/Chatbot";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <Chatbot />
      <WeatherApp />
      <Footer />
    </div>
  );
}
