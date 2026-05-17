import { motion } from "framer-motion";

const suggestions = [
  "Analyze revenue trends",
  "Find anomalies in this dataset",
  "Summarize customer behavior",
  "What patterns exist?",
];

export default function WelcomeScreen() {

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

      {/* SUGGESTIONS */}
      <div className="grid grid-cols-2 gap-4 max-w-3xl w-full">

        {suggestions.map((item, index) => (

          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="
              bg-surface/70
              backdrop-blur-xl
              border
              border-border
              rounded-2xl
              p-5
              cursor-pointer
              hover:border-primary
              transition-all
            "
          >
            <p className="text-sm">
              {item}
            </p>

          </motion.div>

        ))}

      </div>

    </motion.div>
  );
}