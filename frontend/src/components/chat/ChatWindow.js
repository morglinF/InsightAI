import MessageBubble from "./MessageBubble";
import WelcomeScreen from "./WelcomeScreen";
import AnalyticsPanel from "../analytics/AnalyticsPanel";
import TypingIndicator from "./TypingIndicator";


export default function ChatWindow({
  messages,
  loading,
  setInput,
  sendMessage,
  aiInsight,
  analyticsData,
  insightCardData
}) {

  if (messages.length === 0) {
    return <WelcomeScreen 
      setInput={setInput}   
      sendMessage={sendMessage}/>;
  }

  return (
    <div
      className="
        flex-1
        overflow-y-auto
        px-10
        py-8
      "
    >

      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          role={msg.role}
          text={msg.text}
          setInput={setInput}
          sendMessage={sendMessage}
        />
))} 
{loading && <TypingIndicator />}

   <div className="mt-10">
 <AnalyticsPanel
    aiInsight={aiInsight}
    analyticsData={analyticsData}
/>
</div>

    </div>
  );
}