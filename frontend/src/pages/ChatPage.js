import { useState } from "react";

import AppShell from "../components/layout/AppShell";

import ChatWindow from "../components/chat/ChatWindow";
import PromptInput from "../components/chat/PromptInput";
import { useDatasets } from "../context/DatasetContext";
import { toast } from 'react-hot-toast';

export default function ChatPage() {

  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
  
  const { activeDataset } = useDatasets();

 const sendMessage = async () => {

  if (!input || !activeDataset) return;

  const userMessage = {
    role: "user",
    text: input,
  };

  setMessages((prev) => [...prev, userMessage]);

  setLoading(true);

  let aiMessage = {
    role: "ai",
    text: "",
  };

  setMessages((prev) => [...prev, aiMessage]);

  try {

    const response = await fetch(
      "http://localhost:8000/chat-stream",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file_id: activeDataset.file_id,
          question: input,
        }),
      }
    );

    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    let done = false;

    while (!done) {

      const { value, done: doneReading } =
        await reader.read();

      done = doneReading;

      const chunk = decoder.decode(value);

      aiMessage.text += chunk;

      setMessages((prev) => {

        const updated = [...prev];

        updated[updated.length - 1] = {
          ...aiMessage,
        };

        return updated;
      });
    }

  } catch (err) {

    console.log(err);

    toast.error("AI request failed");

  }

  setInput("");

  setLoading(false);
};

  return (

    <AppShell>

      <div className="flex flex-col h-full">

        {/* CHAT AREA */}
        <ChatWindow
          messages={messages}
          loading={loading}
        />

        {/* INPUT */}
        <PromptInput
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />

      </div>

    </AppShell>

  );
}