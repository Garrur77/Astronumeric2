
import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Calendar, Sparkles } from "lucide-react"
import type { UserData } from "../types"

const PredictPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<UserData>({
    name: "",
    day: 1,
    month: 1,
    year: 2000,
  })
  const [errors, setErrors] = useState({
    name: "",
    day: "",
    month: "",
    year: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "name" ? value : Number.parseInt(value),
    }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = (): boolean => {
    let valid = true
    const newErrors = {
      name: "",
      day: "",
      month: "",
      year: "",
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      valid = false
    }

    if (formData.day < 1 || formData.day > 31) {
      newErrors.day = "Day must be between 1 and 31"
      valid = false
    }

    if (formData.month < 1 || formData.month > 12) {
      newErrors.month = "Month must be between 1 and 12"
      valid = false
    }

    if (formData.year < 1900 || formData.year > new Date().getFullYear()) {
      newErrors.year = `Year must be between 1900 and ${new Date().getFullYear()}`
      valid = false
    }

    // Check for valid date (e.g., no February 30)
    const testDate = new Date(formData.year, formData.month - 1, formData.day)
    if (
      testDate.getDate() !== formData.day ||
      testDate.getMonth() !== formData.month - 1 ||
      testDate.getFullYear() !== formData.year
    ) {
      newErrors.day = "Invalid date combination"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Store form data in sessionStorage
      sessionStorage.setItem("userData", JSON.stringify(formData))
      navigate("/result")
    }
  }

  const generateDayOptions = () => {
    const options = []
    for (let i = 1; i <= 31; i++) {
      options.push(
        <option key={i} value={i} className="bg-[#141e30] text-white">
          {i}
        </option>,
      )
    }
    return options
  }

  const generateMonthOptions = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    return months.map((month, index) => (
      <option key={month} value={index + 1} className="bg-[#141e30] text-white">
        {month}
      </option>
    ))
  }

  const generateYearOptions = () => {
    const options = []
    const currentYear = new Date().getFullYear()
    for (let i = currentYear; i >= 1900; i--) {
      options.push(
        <option key={i} value={i} className="bg-[#141e30] text-white">
          {i}
        </option>,
      )
    }
    return options
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto"
    >
      <div className="text-center mb-12">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-cinzel mb-4 text-gold"
        >
          Enter Your Details
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-accent/90"
        >
          Your birth date holds the cosmic key to your career destiny
        </motion.p>
      </div>

      <motion.form
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 rounded-lg border border-white/20 shadow-xl shadow-purple-900/10"
      >
        <div className="form-control">
          <label htmlFor="name" className="form-label flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold" />
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-8">
          <p className="form-label mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gold" />
            Your Date of Birth
          </p>

          {/* Enhanced date picker UI */}
          <div className="grid grid-cols-3 gap-4">
            <div className="relative">
              <label htmlFor="day" className="text-sm text-accent/70 block mb-1">
                Day
              </label>
              <div className="relative">
                <select
                  id="day"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  className="form-input form-select w-full appearance-none bg-white/5 border border-white/20 text-white"
                  style={{ colorScheme: "dark" }}
                >
                  {generateDayOptions()}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {errors.day && <p className="text-red-400 text-sm mt-1">{errors.day}</p>}
            </div>

            <div className="relative">
              <label htmlFor="month" className="text-sm text-accent/70 block mb-1">
                Month
              </label>
              <div className="relative">
                <select
                  id="month"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  className="form-input form-select w-full appearance-none bg-white/5 border border-white/20 text-white"
                  style={{ colorScheme: "dark" }}
                >
                  {generateMonthOptions()}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {errors.month && <p className="text-red-400 text-sm mt-1">{errors.month}</p>}
            </div>

            <div className="relative">
              <label htmlFor="year" className="text-sm text-accent/70 block mb-1">
                Year
              </label>
              <div className="relative">
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="form-input form-select w-full appearance-none bg-white/5 border border-white/20 text-white"
                  style={{ colorScheme: "dark" }}
                >
                  {generateYearOptions()}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {errors.year && <p className="text-red-400 text-sm mt-1">{errors.year}</p>}
            </div>
          </div>
        </div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="btn btn-primary w-full relative overflow-hidden group"
          >
            <span className="relative z-10">Reveal My Destiny</span>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
        </div>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="text-center mt-8 text-accent/70 text-sm"
      >
        <p>
          🕉️ Jai Shri Ganeshaya Namaha 🙏
          <br />
          Your cosmic career path awaits
        </p>
      </motion.div>
    </motion.div>
  )
}

export default PredictPage
