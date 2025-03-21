"use client"

import { useState } from "react"
import "../styles/Chats.css"

const Chats = () => {
  const [conversations] = useState([
    {
      id: "1",
      doctor: {
        id: "1",
        name: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        image: "/placeholder.svg?height=50&width=50",
      },
      lastMessage: {
        text: "Your test results look good. Keep taking your medication as prescribed.",
        time: "10:30 AM",
        isRead: true,
        sender: "doctor",
      },
      unreadCount: 0,
    },
    {
      id: "2",
      doctor: {
        id: "2",
        name: "Dr. Michael Chen",
        specialty: "Dermatologist",
        image: "/placeholder.svg?height=50&width=50",
      },
      lastMessage: {
        text: "Do you have any questions about the treatment plan?",
        time: "Yesterday",
        isRead: false,
        sender: "doctor",
      },
      unreadCount: 2,
    },
    {
      id: "3",
      doctor: {
        id: "3",
        name: "Dr. Emily Rodriguez",
        specialty: "Pediatrician",
        image: "/placeholder.svg?height=50&width=50",
      },
      lastMessage: {
        text: "I'll check with the lab and get back to you about those results.",
        time: "Mar 15",
        isRead: true,
        sender: "doctor",
      },
      unreadCount: 0,
    },
  ])

  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState({
    1: [
      {
        id: "1-1",
        text: "Hello Dr. Johnson, I've been experiencing some chest pain lately.",
        time: "10:15 AM",
        sender: "user",
      },
      {
        id: "1-2",
        text: "I'm sorry to hear that. Can you describe the pain? Is it sharp or dull?",
        time: "10:20 AM",
        sender: "doctor",
      },
      {
        id: "1-3",
        text: "It's more of a dull ache, especially after physical activity.",
        time: "10:25 AM",
        sender: "user",
      },
      {
        id: "1-4",
        text: "Your test results look good. Keep taking your medication as prescribed.",
        time: "10:30 AM",
        sender: "doctor",
      },
    ],
    2: [
      {
        id: "2-1",
        text: "Dr. Chen, the rash seems to be spreading despite using the cream.",
        time: "Yesterday",
        sender: "user",
      },
      {
        id: "2-2",
        text: "Let me see. Can you send a photo of the affected area?",
        time: "Yesterday",
        sender: "doctor",
      },
      {
        id: "2-3",
        text: "I've prescribed a stronger medication. Please pick it up from the pharmacy.",
        time: "Yesterday",
        sender: "doctor",
      },
      {
        id: "2-4",
        text: "Do you have any questions about the treatment plan?",
        time: "Yesterday",
        sender: "doctor",
      },
    ],
    3: [
      {
        id: "3-1",
        text: "Dr. Rodriguez, when will my son's lab results be ready?",
        time: "Mar 15",
        sender: "user",
      },
      {
        id: "3-2",
        text: "I'll check with the lab and get back to you about those results.",
        time: "Mar 15",
        sender: "doctor",
      },
    ],
  })

  const [newMessage, setNewMessage] = useState("")

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!newMessage.trim() || !selectedChat) return

    const newMsg = {
      id: `${selectedChat}-${messages[selectedChat].length + 1}`,
      text: newMessage,
      time: "Just now",
      sender: "user",
    }

    setMessages((prev) => ({
      ...prev,
      [selectedChat]: [...prev[selectedChat], newMsg],
    }))

    setNewMessage("")
  }

  return (
    <div className="chats-page">
      <h1>Messages</h1>

      <div className="chat-container">
        <div className="conversations-list">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`conversation-card ${selectedChat === conversation.id ? "selected" : ""}`}
              onClick={() => handleChatSelect(conversation.id)}
            >
              <div className="conversation-avatar">
                <img src={conversation.doctor.image || "/placeholder.svg"} alt={conversation.doctor.name} />
                {conversation.unreadCount > 0 && <span className="unread-badge">{conversation.unreadCount}</span>}
              </div>

              <div className="conversation-info">
                <div className="conversation-header">
                  <h3>{conversation.doctor.name}</h3>
                  <span className="message-time">{conversation.lastMessage.time}</span>
                </div>
                <p className="doctor-specialty">{conversation.doctor.specialty}</p>
                <p className={`last-message ${!conversation.lastMessage.isRead ? "unread" : ""}`}>
                  {conversation.lastMessage.sender === "doctor" ? "" : "You: "}
                  {conversation.lastMessage.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-messages">
          {selectedChat ? (
            <>
              <div className="chat-header">
                {conversations.find((c) => c.id === selectedChat)?.doctor && (
                  <>
                    <img
                      src={conversations.find((c) => c.id === selectedChat).doctor.image || "/placeholder.svg"}
                      alt={conversations.find((c) => c.id === selectedChat).doctor.name}
                    />
                    <div>
                      <h2>{conversations.find((c) => c.id === selectedChat).doctor.name}</h2>
                      <p>{conversations.find((c) => c.id === selectedChat).doctor.specialty}</p>
                    </div>
                  </>
                )}
              </div>

              <div className="messages-container">
                {messages[selectedChat]?.map((message) => (
                  <div
                    key={message.id}
                    className={`message ${message.sender === "user" ? "user-message" : "doctor-message"}`}
                  >
                    <div className="message-content">
                      <p>{message.text}</p>
                      <span className="message-time">{message.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <form className="message-form" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            </>
          ) : (
            <div className="select-chat-prompt">
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Chats

