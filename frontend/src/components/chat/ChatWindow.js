import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import WelcomeScreen from "./WelcomeScreen";
import AnalyticsPanel from "../analytics/AnalyticsPanel";

export default function ChatWindow({
  messages,
  loading,
  aiInsight,
  insightCardData
}) {

  if (messages.length === 0) {
    return <WelcomeScreen />;
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
        />

      ))} 

   <div className="mt-10">
  <AnalyticsPanel aiInsight={aiInsight}
    insightCardData={insightCardData}
  />
</div>

    </div>
  );
}