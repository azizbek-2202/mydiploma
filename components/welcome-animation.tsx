"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export function WelcomeAnimation() {
  const [show, setShow] = useState(true)
  const { locale } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 1000)

    return () => clearTimeout(timer)
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-lg"
            >
              {welcomeText[locale]}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="h-1.5 w-72 mx-auto bg-white/70 rounded-full shadow-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
