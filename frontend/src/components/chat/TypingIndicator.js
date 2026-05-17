export default function TypingIndicator() {

  return (
    <div
      className="
        bg-surface
        border
        border-border
        rounded-3xl
        px-5
        py-4
        inline-flex
        items-center
        gap-2
      "
    >

      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />

      <span className="text-sm text-textSecondary ml-2">
        AI is analyzing your dataset...
      </span>

    </div>
  );
}