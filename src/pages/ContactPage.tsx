import type React from "react"
import { useState, useEffect } from "react" // Import useEffect
import { motion, AnimatePresence } from "framer-motion" // Import AnimatePresence for tab transitions
import {
  User,
  Mail,
  HelpCircle,
  MessageSquare,
  Send,
  CheckCircle,
  Phone, // Add Phone icon
  Clock, // Add Clock icon for the delay message
} from "lucide-react"

// Define a type for the contact form data
interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// Define types for tabs and submission status
type ActiveTab = "email" | "phone"
type SubmissionStatus = "idle" | "submitting" | "success"
interface SuccessInfo {
  type: ActiveTab | null
  message: string
}

const CONTACT_PHONE_NUMBER = "+1-555-123-4567" // Example phone number
const SUBMISSION_DELAY_MS = 5000 // 5 seconds

const ContactSupportPage = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("email")
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
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("idle")
  const [successInfo, setSuccessInfo] = useState<SuccessInfo>({ type: null, message: "" })

  // Effect to handle the delayed action after success
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null

    if (submissionStatus === "success" && successInfo.type) {
      timerId = setTimeout(() => {
        if (successInfo.type === "email") {
          // Construct mailto link
          const subject = encodeURIComponent(formData.subject || "Support Request")
          const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
          )
          const mailtoLink = `mailto:support@example.com?subject=${subject}&body=${body}` // Replace with your actual support email
          console.log("Opening mailto:", mailtoLink)
          window.location.href = mailtoLink
          // Reset form and state *after* attempting to open mail client
          setFormData({ name: "", email: "", subject: "", message: "" })

        } else if (successInfo.type === "phone") {
          // Construct tel link
          const telLink = `tel:${CONTACT_PHONE_NUMBER}`
          console.log("Opening tel:", telLink)
          window.location.href = telLink
        }

        // Reset submission state after action
        setSubmissionStatus("idle")
        setSuccessInfo({ type: null, message: "" })

      }, SUBMISSION_DELAY_MS)
    }

    // Cleanup function to clear the timeout if the component unmounts
    // or if the status changes before the timeout completes
    return () => {
      if (timerId) {
        clearTimeout(timerId)
      }
    }
    // Depend on submissionStatus and successInfo.type
  }, [submissionStatus, successInfo.type, formData]) // Add formData to dependencies as it's used in mailto

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
    const newErrors = { name: "", email: "", subject: "", message: "" }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      valid = false
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      valid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
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

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({ name: "", email: "", subject: "", message: "" })
    setSubmissionStatus("submitting") // Indicate submission process
    setSuccessInfo({ type: null, message: "" }) // Reset previous success

    if (validateForm()) {
      console.log("Form Data Validated:", formData)
      // --- Placeholder for actual backend submission (optional) ---
      // You might still want to log this server-side even if opening mailto
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData), ... })
      // --- End Placeholder ---

      // Show success message and set type for delayed action
      setSubmissionStatus("success")
      setSuccessInfo({ type: "email", message: `Thank you, ${formData.name}! Preparing your email...` })
      // Don't clear formData here, needed for mailto link
    } else {
        setSubmissionStatus("idle"); // Validation failed, go back to idle
    }
  }

  const handlePhoneSubmit = () => {
    setSubmissionStatus("submitting") // Indicate submission process
    setSuccessInfo({ type: null, message: "" }) // Reset previous success

    console.log("Phone Call Initiated via UI")
     // Show success message and set type for delayed action
    setSubmissionStatus("success")
    setSuccessInfo({ type: "phone", message: "Thank you! Preparing to open your phone app..." })
  }

  const resetFormAndState = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({ name: "", email: "", subject: "", message: "" });
    setSubmissionStatus("idle");
    setSuccessInfo({ type: null, message: "" });
    // Optionally switch back to email tab or stay on current
    // setActiveTab("email");
  }

  const renderContent = () => {
    if (submissionStatus === "success") {
      return (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }} // Added exit animation
          transition={{ duration: 0.5 }}
          className="bg-green-900/30 backdrop-blur-md p-6 rounded-lg border border-green-500/50 shadow-lg text-center text-white"
        >
          <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-400" />
          <h3 className="text-xl font-semibold mb-2">Action Queued!</h3>
          <p className="text-green-200/90 mb-3">{successInfo.message}</p>
          <div className="flex items-center justify-center gap-2 text-sm text-green-300/80">
             <Clock className="w-4 h-4" />
             <span>Please wait {SUBMISSION_DELAY_MS / 1000} seconds...</span>
          </div>

          {/* Allow cancelling the redirect */}
          <button
                onClick={resetFormAndState}
                className="mt-6 btn btn-secondary text-sm"
            >
                Cancel / Start Over
            </button>
        </motion.div>
      )
    }

    // --- Email Tab Content ---
    if (activeTab === "email") {
      return (
        <motion.form
          key="email-form"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }} // Added exit animation
          transition={{ duration: 0.4 }}
          onSubmit={handleEmailSubmit}
          className="bg-white/10 backdrop-blur-md p-8 rounded-lg border border-white/20 shadow-xl shadow-purple-900/10"
          noValidate
        >
          {/* Name Field */}
          <div className="form-control mb-4">
            <label htmlFor="name" className="form-label flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-gold" /> Your Name
            </label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`form-input ${errors.name ? 'border-red-500' : 'border-white/20'}`} placeholder="Enter your full name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
            {errors.name && <p id="name-error" className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="form-control mb-4">
             <label htmlFor="email" className="form-label flex items-center gap-2 mb-1">
               <Mail className="w-4 h-4 text-gold" /> Your Email
             </label>
             <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`form-input ${errors.email ? 'border-red-500' : 'border-white/20'}`} placeholder="Enter your email address" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
             {errors.email && <p id="email-error" className="text-red-400 text-sm mt-1">{errors.email}</p>}
           </div>

          {/* Subject Field */}
          <div className="form-control mb-4">
            <label htmlFor="subject" className="form-label flex items-center gap-2 mb-1">
              <HelpCircle className="w-4 h-4 text-gold" /> Subject
            </label>
            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className={`form-input ${errors.subject ? 'border-red-500' : 'border-white/20'}`} placeholder="What is your message about?" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined} />
            {errors.subject && <p id="subject-error" className="text-red-400 text-sm mt-1">{errors.subject}</p>}
          </div>

          {/* Message Field */}
          <div className="form-control mb-6">
            <label htmlFor="message" className="form-label flex items-center gap-2 mb-1">
              <MessageSquare className="w-4 h-4 text-gold" /> Your Message
            </label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} className={`form-input h-32 resize-none ${errors.message ? 'border-red-500' : 'border-white/20'}`} placeholder="Please describe your query in detail..." aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
            {errors.message && <p id="message-error" className="text-red-400 text-sm mt-1">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="submit" className="btn btn-primary w-full relative overflow-hidden group flex items-center justify-center gap-2" disabled={submissionStatus === 'submitting'}>
              {submissionStatus === 'submitting' ? (
                 <span className="loader"></span> // Add a simple CSS loader if you like
              ) : (
                 <>
                   <Send className="w-4 h-4 relative z-10" />
                   <span className="relative z-10">Send & Open Email</span>
                   <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                 </>
               )}
            </motion.button>
          </div>
        </motion.form>
      )
    }

    // --- Phone Tab Content ---
    if (activeTab === "phone") {
      return (
        <motion.div
          key="phone-tab"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }} // Added exit animation
          transition={{ duration: 0.4 }}
          className="bg-white/10 backdrop-blur-md p-8 rounded-lg border border-white/20 shadow-xl shadow-purple-900/10 text-center"
        >
           <Phone className="w-10 h-10 mx-auto mb-4 text-gold" />
           <h3 className="text-xl font-semibold mb-2 text-white">Call Us Directly</h3>
           <p className="text-accent/90 mb-6">
             Need immediate assistance? Click below to initiate a call.
           </p>
           <p className="text-2xl font-bold text-gold mb-8 tracking-wider">
             {CONTACT_PHONE_NUMBER}
           </p>
           <motion.button
             whileHover={{ scale: 1.03 }}
             whileTap={{ scale: 0.97 }}
             onClick={handlePhoneSubmit}
             className="btn btn-primary w-full max-w-xs mx-auto relative overflow-hidden group flex items-center justify-center gap-2"
             disabled={submissionStatus === 'submitting'}
           >
              {submissionStatus === 'submitting' ? (
                 <span className="loader"></span> // Add a simple CSS loader if you like
               ) : (
                 <>
                  <Phone className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Initiate Call</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </>
               )}

           </motion.button>
           <p className="text-accent/70 text-sm mt-6">
                Standard call rates may apply. <br/> Check with your provider.
            </p>
        </motion.div>
      )
    }

    return null; // Should not happen
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
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
          Choose your preferred method to get in touch.
        </motion.p>
      </div>

      {/* Tabs - Only show if not in success state */}
      {submissionStatus !== "success" && (
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.4 }}
           className="flex justify-center gap-4 mb-8"
         >
             <button
               onClick={() => setActiveTab("email")}
               className={`tab-button ${activeTab === "email" ? "active" : ""}`}
             >
               <Mail className="w-4 h-4 mr-2" /> Email Us
             </button>
             <button
               onClick={() => setActiveTab("phone")}
               className={`tab-button ${activeTab === "phone" ? "active" : ""}`}
             >
               <Phone className="w-4 h-4 mr-2" /> Call Us
             </button>
         </motion.div>
      )}


      {/* Tab Content Area */}
      <div className="relative"> {/* Container for AnimatePresence */}
          <AnimatePresence mode="wait"> {/* Use mode="wait" for smoother transitions */}
             {renderContent()}
          </AnimatePresence>
      </div>


      {/* Footer Text - Only show if not in success state */}
      {submissionStatus !== "success" && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.8 }}
             className="text-center mt-8 text-accent/70 text-sm"
           >
             {activeTab === 'email' && <p>We typically respond to emails within 24-48 hours.</p>}
             {activeTab === 'phone' && <p>Our phone lines are open during business hours (9 AM - 5 PM YourTimezone).</p>}
             <p className="mt-1">Thank you for reaching out!</p>
           </motion.div>
        )}
    </motion.div>
  )
}

export default ContactSupportPage

// --- Add/Update these styles to your global CSS or Tailwind config ---
/*
// ... (Keep existing form-control, form-label, form-input styles) ...

// Styles for Tabs
.tab-button {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 9999px; // pill shape
    color: rgba(255, 255, 255, 0.7);
    background-color: rgba(255, 255, 255, 0.05);
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    font-size: 0.875rem;
    font-weight: 500;
}

.tab-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
}

.tab-button.active {
    background: linear-gradient(to right, #7e22ce, #a855f7); // Use primary gradient
    color: white;
    border-color: transparent;
    font-weight: 600;
}

// Add a simple loader (optional)
.loader {
  width: 16px;
  height: 16px;
  border: 2px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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