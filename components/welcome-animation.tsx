"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export function WelcomeAnimation() {
  const [show, setShow] = useState(true)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const { locale } = useLanguage()

  // Hide animation after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Get window size only on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
  }, [])

  const welcomeText = {
    en: "Welcome to MyDiploma",
    ru: "Добро пожаловать в MyDiploma",
    uz: "MyDiploma saytiga xush kelibsiz",
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-teal-500"
        >
          {/* Main text */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <motion.h1
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-5xl md:text-7xl font-bold text-white mb-4"
            >
              {welcomeText[locale] || welcomeText.en}
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-1 w-64 mx-auto bg-white/50 rounded-full"
            />
          </motion.div>

          {/* Floating particles */}
          {windowSize.width > 0 &&
            [...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * windowSize.width,
                  y: Math.random() * windowSize.height,
                  scale: 0,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 2,
                  repeat: 1,
                }}
                className="absolute w-2 h-2 bg-white rounded-full"
              />
            ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
