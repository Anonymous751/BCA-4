// src/sharedComponents/Loader.component.jsx
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100/50 z-50">
      {/* Loader container with animation */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Animated dots */}
        <div className="flex space-x-2 mb-4">
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              className="w-4 h-4 bg-blue-500 rounded-full"
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        {/* Loading text */}
        <motion.p
          className="text-gray-700 text-lg font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}
