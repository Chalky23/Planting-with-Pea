"use client";

import { useChat } from "ai/react";
import Image from "next/image";
import "./Chatbot.css";

interface Message {
  id: string;
  role: string;
  content: string;
}

export default function Chatbot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="chatbot">
      <h1>
        <b>
          Hi, I&apos;m Pea!
          <br />
          Ask me anything about gardening.
        </b>
      </h1>
      {messages.map((m: Message) => (
        <div key={m.id} className="chatHistory">
          {m.role === "user" ? "You: " : "Pea: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="inputField"
          value={input}
          placeholder="Plant your question here"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
