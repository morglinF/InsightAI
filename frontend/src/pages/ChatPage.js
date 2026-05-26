import { useState } from "react";

import AppShell from "../components/layout/AppShell";

import ChatWindow from "../components/chat/ChatWindow";
import PromptInput from "../components/chat/PromptInput";
import { useDatasets } from "../context/DatasetContext";
import { toast } from 'react-hot-toast';

export default function ChatPage() {

  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");
  const [insightCardData, setInsightCardData] = useState("");

  const [loading, setLoading] = useState(false);
  
  const { activeDataset } = useDatasets();

  const [aiInsight, setAiInsight] = useState("");
 
  const [analyticsData, setAnalyticsData] = useState(null);




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
      `${process.env.REACT_APP_API_URL}/chat-stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file_id: activeDataset?.file_id,
          question: input,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Chat stream request failed: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let done = false;

    while (!done) {
      try {
        const insightRes = await fetch(
          `${process.env.REACT_APP_API_URL}/latest-insight/${activeDataset.file_id}`
        );

        if (insightRes.ok) {
          const insightData = await insightRes.json();
          setAiInsight(insightData?.ai_insight);
          setAnalyticsData(insightData?.analytics);
        }
      } catch (err) {
        console.log(err);
      }

      try {
        const insightRes = await fetch(
          `${process.env.REACT_APP_API_URL}/insights`
        );

        if (insightRes.ok) {
          const insightCardDataResponse = await insightRes.json();
          setInsightCardData(insightCardDataResponse[0]?.insight?.numeric_summary?.money?.mean);
        }
      } catch (err) {
        console.log(err);
      }

      const { value, done: doneReading } = await reader.read();
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
          setInput={setInput}
          sendMessage={sendMessage}
          aiInsight={aiInsight}
          analyticsData={analyticsData}
          insightCardData={insightCardData}
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