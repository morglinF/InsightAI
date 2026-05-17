import { motion } from "framer-motion";

export default function MessageBubble({ role, text }) {

  const isUser = role === "user";

  return (

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        flex
        mb-6
        ${isUser ? "justify-end" : "justify-start"}
      `}
    >

      <div
        className={`
          max-w-3xl
          px-5
          py-4
          rounded-3xl
          shadow-lg
          whitespace-pre-wrap
          leading-7

          ${
            isUser
              ? "bg-primary text-white"
              : "bg-surface border border-border"
          }
        `}
      >

        {text}

      </div>

    </motion.div>
  );
}