import type React from "react"
import { useState } from "react"
// import { useNavigate } from "react-router-dom" // We might not need navigation anymore
import { motion } from "framer-motion"
import { User, Mail, HelpCircle, MessageSquare, Send, CheckCircle } from "lucide-react" // Updated icons

// Define a type for the contact form data
interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

const ContactSupportPage = () => {
  // const navigate = useNavigate() // Keep if you want to navigate away after submission
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false) // State to show success message

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      email: "",
      subject: "",
      message: "",
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      valid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      // Basic email format check
      newErrors.email = "Email address is invalid"
      valid = false
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
      valid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
      valid = false
    } else if (formData.message.trim().length < 10) {
        newErrors.message = "Message should be at least 10 characters long"
        valid = false
    }


    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({ name: "", email: "", subject: "", message: "" }); // Clear previous errors
    setIsSubmitted(false); // Reset submission state

    if (validateForm()) {
      // --- Placeholder for actual submission logic ---
      // In a real app, you would send this data to your backend API:
      // fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData), ... })
      console.log("Form Data Submitted:", formData)
      // --- End Placeholder ---

      // Show success message and clear form
      setIsSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Optionally navigate away or just show the success message
      // navigate("/thank-you");
    }
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
          Contact Support
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-accent/90"
        >
          Have questions or need assistance? Fill out the form below.
        </motion.p>
      </div>

      {isSubmitted ? (
         <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="bg-green-900/30 backdrop-blur-md p-6 rounded-lg border border-green-500/50 shadow-lg text-center text-white"
        >
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-400" />
            <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
            <p className="text-green-200/90">Thank you for contacting us. We'll get back to you as soon as possible.</p>
            <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 btn btn-secondary text-sm"
            >
                Send Another Message
            </button>
        </motion.div>
      ) : (
        <motion.form
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md p-8 rounded-lg border border-white/20 shadow-xl shadow-purple-900/10"
          noValidate // Prevent browser default validation popups
        >
          {/* Name Field */}
          <div className="form-control mb-4">
            <label htmlFor="name" className="form-label flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-gold" />
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'border-red-500' : 'border-white/20'}`}
              placeholder="Enter your full name"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && <p id="name-error" className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="form-control mb-4">
            <label htmlFor="email" className="form-label flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4 text-gold" />
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'border-red-500' : 'border-white/20'}`}
              placeholder="Enter your email address"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <p id="email-error" className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Subject Field */}
          <div className="form-control mb-4">
            <label htmlFor="subject" className="form-label flex items-center gap-2 mb-1">
              <HelpCircle className="w-4 h-4 text-gold" />
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`form-input ${errors.subject ? 'border-red-500' : 'border-white/20'}`}
              placeholder="What is your message about?"
              aria-invalid={errors.subject ? "true" : "false"}
              aria-describedby={errors.subject ? "subject-error" : undefined}
            />
            {errors.subject && <p id="subject-error" className="text-red-400 text-sm mt-1">{errors.subject}</p>}
          </div>

          {/* Message Field */}
          <div className="form-control mb-6">
            <label htmlFor="message" className="form-label flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 text-gold" />
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`form-input h-32 resize-none ${errors.message ? 'border-red-500' : 'border-white/20'}`} // Added resize-none
              placeholder="Please describe your query in detail..."
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && <p id="message-error" className="text-red-400 text-sm mt-1">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="btn btn-primary w-full relative overflow-hidden group flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Send Message</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
          </div>
        </motion.form>
      )}


      {!isSubmitted && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.8 }}
             className="text-center mt-8 text-accent/70 text-sm"
           >
             <p>
                We typically respond within 24-48 hours.
                <br />
                Thank you for reaching out!
             </p>
           </motion.div>
        )}
    </motion.div>
  )
}

export default ContactSupportPage

// --- Add these styles to your global CSS or Tailwind config ---
/*
.form-control {
  // You likely already have styles for this
}

.form-label {
  // You likely already have styles for this
  display: block; // Ensure label is block for margin bottom
  // Add styles from original component like text color etc.
  color: #e2e8f0; // Example: text-slate-200
  font-size: 0.875rem; // text-sm
}

.form-input {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem; // Adjust as needed
  background-color: rgba(255, 255, 255, 0.05); // bg-white/5
  border: 1px solid rgba(255, 255, 255, 0.2); // border-white/20
  border-radius: 0.375rem; // rounded-md
  color: white;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.form-input:focus {
  outline: none;
  border-color: #a855f7; // Example: border-purple-500
  box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.3); // Example: ring-2 ring-purple-500/30
}

.form-input::placeholder {
    color: rgba(255, 255, 255, 0.4); // Example: placeholder-white/40
}

.border-red-500 {
    border-color: #ef4444;
}

.btn {
    // Base button styles
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;
}

.btn-primary {
    // Primary button styles from original component
    background: linear-gradient(to right, #7e22ce, #a855f7); // Example gradient
    color: white;
    border: none;
}
.btn-secondary {
    // Example secondary button style
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
}
.btn-secondary:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

// Ensure Tailwind classes for colors like text-gold, text-accent etc. are defined in tailwind.config.js
// Example:
// theme: {
//   extend: {
//     colors: {
//       gold: '#FFD700', // Or your specific gold color
//       accent: '#E0E0FF', // Or your specific accent color
//       // ... other colors
//     },
//     fontFamily: {
//        cinzel: ['Cinzel', 'serif'], // Ensure font is linked in your index.html or global css
//     }
//   }
// }

*/