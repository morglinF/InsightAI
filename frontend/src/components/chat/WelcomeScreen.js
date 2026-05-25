import { motion } from "framer-motion";

const prompts = [
  "What patterns exist in this dataset?",
  "Summarize this dataset",
  "What anomalies can you detect?",
  "Which categories perform best?"
];

export default function WelcomeScreen({
  setInput,
  sendMessage
  })
  
  {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        flex
        flex-col
        items-center
        justify-center
        h-full
        text-center
        px-6
      "
    >

      <h1 className="text-6xl font-bold mb-4">
        Insight<span className="text-primary">AI</span>
      </h1>

  <p className="text-sm text-primary mt-3">
  Upload a CSV dataset to begin AI analysis.
</p>

      {/* PROMPTS */}
      <div className="grid grid-cols-2 gap-4 mt-10">

  {prompts.map((prompt) => (

    <button
      key={prompt}
      onClick={() => {
        setInput(prompt);

        setTimeout(() => {
          sendMessage(prompt);
        }, 100);
      }}
      className="
        bg-[#111827]
        hover:bg-[#1f2937]
        border border-white/10
        rounded-2xl
        p-5
        text-left
        transition
        text-white
      "
    >

      {prompt}

    </button>

  ))}

      </div>
    </motion.div>
  );
}