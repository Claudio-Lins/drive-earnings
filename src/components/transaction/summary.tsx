"use client"

import { motion } from "framer-motion"

export function Summary() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 3.5 }}
      className="flex items-center justify-evenly"
    >
      <div className="">day</div>
      <div className="">Week</div>
      <div className="">Month</div>
    </motion.div>
  )
}
