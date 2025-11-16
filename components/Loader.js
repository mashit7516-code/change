import React from 'react'
import { motion } from 'framer-motion'
function Loader() {

  return (
    <div className="fixed inset-0 flex items-center justify-center min-h-screen bg-[#008f00] z-50">
      {/* Logo */}
      <img src="/logo.png" alt="Logo" className="w-20 h-20 z-10" />

      {/* Rotating loader ring */}
      <motion.div
        className="absolute w-28 h-28 rounded-full border-4 border-t-white border-black "
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      />
    </div>

  )
}

export default Loader
