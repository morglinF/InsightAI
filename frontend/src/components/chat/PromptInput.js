import { SendHorizonal, Paperclip } from "lucide-react";

export default function PromptInput({
  input,
  setInput,
  sendMessage,
  isSendDisabled = false,
}) {

  const handleSend = async () => {
    if (isSendDisabled) return;
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
          type="button"
          onClick={handleSend}
          disabled={isSendDisabled}
          title={isSendDisabled ? "Upload dataset first" : "Send message"}
          className={
            `
            rounded-2xl
            p-3
            transition-all
            ${isSendDisabled ? "bg-slate-700 cursor-not-allowed opacity-50" : "bg-primary hover:bg-purple-700 shadow-glow"}
          `
          }
        >
          <SendHorizonal size={20} />
        </button>

      </div>

    </div>
  );
}