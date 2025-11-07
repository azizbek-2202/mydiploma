"use client"

import { motion } from "framer-motion"

export function AdminLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-blue-600 to-purple-600 flex flex-col items-center justify-center z-50"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 shadow-2xl"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
          <span className="text-white text-3xl font-bold">M</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-white text-center"
      >
        <h2 className="text-3xl font-bold mb-2">MyDiploma Admin</h2>
        <p className="text-lg opacity-90">Loading your dashboard...</p>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-0 left-0 h-1 bg-white"
        style={{ originX: 0, width: "100%" }}
      />
    </motion.div>
  )
}
