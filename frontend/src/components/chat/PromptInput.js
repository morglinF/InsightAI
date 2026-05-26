import { SendHorizonal, Paperclip } from "lucide-react";

export default function PromptInput({
  input,
  setInput,
  sendMessage
}) {

  const handleSend = async () => {
    const question = input.trim();
    if (!question) return;
    setInput("");
    await sendMessage(question);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-6">

      <div
        className="
          bg-surface/80
          backdrop-blur-xl
          border
          border-border
          rounded-3xl
          p-4
          flex
          items-center
          gap-4
          shadow-2xl
        "
      >

        {/* ATTACHMENT */}
        <button
          className="
            p-3
            rounded-2xl
            hover:bg-slate-700
            transition-all
          "
        >
          <Paperclip size={20} />
        </button>

        {/* INPUT */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your dataset anything..."
          onKeyDown={handleKeyDown}
          rows={1}
          className="
            flex-1
            bg-transparent
            outline-none
            resize-none
            text-white
            placeholder:text-textSecondary
          "
        />

        {/* SEND */}
        <button
          onClick={handleSend}
          className="
            bg-primary
            hover:bg-purple-700
            transition-all
            rounded-2xl
            p-3
            shadow-glow
          "
        >
          <SendHorizonal size={20} />
        </button>

      </div>

    </div>
  );
}