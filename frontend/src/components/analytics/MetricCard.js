import { motion } from "framer-motion";

export default function MetricCard({
  title,
  value,
  subtitle,
}) {

  return (

    <motion.div
      whileHover={{ y: -3 }}
      className="
        bg-surface/80
        backdrop-blur-xl
        border
        border-border
        rounded-3xl
        p-5
      "
    >

      <p className="text-textSecondary text-sm mb-2">
        {title}
      </p>

      <h2 className="text-3xl font-bold mb-1">
        {value}
      </h2>

      <p className="text-xs text-textSecondary">
        {subtitle}
      </p>

    </motion.div>
  );
}