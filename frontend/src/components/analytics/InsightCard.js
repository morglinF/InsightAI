import { Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function InsightCard({ text }) {

  return (
    <div
      className="
        bg-gradient-to-br
        from-primary/20
        to-cyan-500/10
        border
        border-primary/30
        rounded-3xl
        p-6
      "
    >

      <div className="flex items-center gap-2 mb-4">

        <Sparkles className="text-primary" size={18} />

        <p className="font-semibold">
          AI Insight
        </p>

      </div>

     <ReactMarkdown>
          {text || "No insights generated yet."}
        </ReactMarkdown>

    </div>
  );
}