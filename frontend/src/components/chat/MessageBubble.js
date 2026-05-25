import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MessageBubble({
  role,
  text,
  setInput,
  sendMessage
}) {

  const isAI = role === "ai";

  return (
    <div
      className={`
        mb-6 flex
        ${isAI ? "justify-start" : "justify-end"}
      `}
    >

      <div
        className={`
          max-w-3xl
          rounded-2xl
          px-5
          py-4
          whitespace-pre-wrap
          ${
            isAI
              ? "bg-[#111827] text-white"
              : "bg-blue-600 text-white"
          }
        `}
      >

        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
          >
            {text}
          </ReactMarkdown>
        </div>

      </div>

    </div>
  );
}