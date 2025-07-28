"use client";
import React, { useState, useRef, useEffect } from "react";

type User = { id: string; name: string; avatar: string; online?: boolean };
type Message = { id: number; user: User; text: string; time: string };

interface MessagesByChannel {
  [key: string]: Message[];
}

const mockChannels: { id: string; name: string }[] = [
  { id: "general", name: "# General" },
  { id: "events", name: "# Events" },
  { id: "support", name: "# Support" },
];
const mockUser: User = { id: "you", name: "You", avatar: "Y" };
const mockUsers: User[] = [
  { id: "alex", name: "Alex", avatar: "A", online: true },
  { id: "jordan", name: "Jordan", avatar: "J", online: false },
  mockUser,
];
const mockMessages: MessagesByChannel = {
  general: [
    { id: 1, user: mockUsers[0], text: "Hi team, let's sync at 2pm!", time: "2:00pm" },
    { id: 2, user: mockUser, text: "Sounds good!", time: "2:01pm" },
    { id: 3, user: mockUsers[1], text: "I'll join from the office.", time: "2:02pm" },
  ],
  events: [
    { id: 1, user: mockUsers[0], text: "Event planning call at 4pm.", time: "10:00am" },
    { id: 2, user: mockUser, text: "I'll prepare the agenda.", time: "10:01am" },
  ],
  support: [
    { id: 1, user: mockUsers[1], text: "Any updates on the ticket?", time: "9:00am" },
    { id: 2, user: mockUser, text: "Resolved, please check.", time: "9:05am" },
  ],
};

export default function TeamChatPage() {
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [selectedChannel]);

  const messages = mockMessages[selectedChannel];

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f3f4f6" }}>
      {/* Sidebar */}
      <aside style={{
        width: 250,
        background: "linear-gradient(135deg, #6a82fb 0%, #fc5c7d 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        boxShadow: "2px 0 12px #6a82fb11",
      }}>
        <div style={{ fontWeight: 700, fontSize: 22, letterSpacing: 1, padding: "32px 0 24px 32px" }}>
          AV+V Team
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, opacity: 0.7, margin: "0 0 8px 32px" }}>Channels</div>
          {mockChannels.map((ch: { id: string; name: string }) => (
            <button
              key={ch.id}
              onClick={() => setSelectedChannel(ch.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: selectedChannel === ch.id ? "#fff" : "none",
                color: selectedChannel === ch.id ? "#6a82fb" : "#fff",
                fontWeight: selectedChannel === ch.id ? 700 : 500,
                border: "none",
                borderRadius: 8,
                padding: "10px 28px 10px 32px",
                margin: "0 0 4px 0",
                fontSize: 16,
                cursor: "pointer",
                transition: "background 0.18s, color 0.18s",
                boxShadow: selectedChannel === ch.id ? "0 2px 8px #fc5c7d22" : "none",
              }}
            >
              {ch.name}
            </button>
          ))}
        </div>
        {/* User profile */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "18px 0 18px 32px",
          borderTop: "1px solid #ffffff33",
          background: "rgba(255,255,255,0.06)",
        }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "#fff",
            color: "#6a82fb",
            fontWeight: 700,
            fontSize: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>{mockUser.avatar}</div>
          <div>
            <div style={{ fontWeight: 600 }}>{mockUser.name}</div>
            <div style={{ fontSize: 12, color: "#e0e7ff" }}>Online</div>
          </div>
        </div>
      </aside>
      {/* Main Chat Area */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", background: "#f9fafb" }}>
        {/* Header */}
        <div style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #e5e7eb",
          background: "#fff",
          padding: "0 32px",
          boxShadow: "0 2px 8px #fc5c7d11",
        }}>
          <div style={{ fontWeight: 700, fontSize: 20, color: "#6a82fb" }}>
            {mockChannels.find((c) => c.id === selectedChannel)?.name}
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {mockUsers.map((u: User) => (
              <div key={u.id} title={u.name} style={{ position: "relative" }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: u.id === mockUser.id ? "#fff" : "#e0e7ff",
                  color: u.id === mockUser.id ? "#6a82fb" : "#6366f1",
                  fontWeight: 700,
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: (typeof u.online === 'boolean' && u.online) ? "2px solid #10b981" : "2px solid #e5e7eb",
                }}>{u.avatar}</div>
                {(typeof u.online === 'boolean' && u.online) && <span style={{ position: "absolute", bottom: 2, right: 2, width: 8, height: 8, background: "#10b981", borderRadius: "50%", border: "2px solid #fff" }} />}
              </div>
            ))}
          </div>
        </div>
        {/* Chat History */}
        <div ref={chatRef} style={{
          flex: 1,
          overflowY: "auto",
          padding: "32px 0 0 0",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}>
          {messages.map((msg: Message, i: number) => {
            const isYou = msg.user.id === mockUser.id;
            return (
              <div key={msg.id} style={{
                display: "flex",
                flexDirection: isYou ? "row-reverse" : "row",
                alignItems: "flex-end",
                gap: 12,
                padding: "0 32px",
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: isYou ? "#fff" : "#e0e7ff",
                  color: isYou ? "#6a82fb" : "#6366f1",
                  fontWeight: 700,
                  fontSize: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: isYou ? "2px solid #6a82fb" : "2px solid #e0e7ff",
                }}>{msg.user.avatar}</div>
                <div style={{ maxWidth: "60%" }}>
                  <div style={{
                    background: isYou ? "#fbcfe8" : "#e0e7ff",
                    color: isYou ? "#be185d" : "#3730a3",
                    borderRadius: isYou ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    padding: "12px 18px",
                    fontWeight: 500,
                    fontSize: 16,
                    boxShadow: isYou ? "0 1px 4px #fc5c7d11" : "0 1px 4px #6a82fb11",
                    textAlign: isYou ? "right" : "left",
                  }}>
                    <span style={{ fontWeight: 700 }}>{isYou ? "You" : msg.user.name}</span>: {msg.text}
                  </div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 2, textAlign: isYou ? "right" : "left" }}>{msg.time}</div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Input Bar */}
        <form style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 10,
          borderTop: "1px solid #e5e7eb",
          background: "#fff",
          padding: "18px 32px 18px 32px",
        }} onSubmit={e => { e.preventDefault(); }}>
          <textarea
            placeholder="Type a message to your team..."
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: "12px 14px",
              border: "1px solid #d1d5db",
              borderRadius: 8,
              fontSize: 16,
              resize: "none",
              minHeight: 38,
              maxHeight: 90,
              background: "#f9fafb",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 28px",
              border: "none",
              borderRadius: 8,
              background: input.trim() ? "#667eea" : "#e5e7eb",
              color: input.trim() ? "#fff" : "#aaa",
              fontSize: 16,
              fontWeight: 600,
              cursor: input.trim() ? "pointer" : "not-allowed",
              boxShadow: input.trim() ? "0 1px 4px #667eea22" : "none",
              transition: "background 0.18s, color 0.18s",
            }}
            disabled={!input.trim()}
          >Send</button>
        </form>
      </main>
    </div>
  );
} 