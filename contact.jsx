import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Send } from "lucide-react";

// --- TEMPORARILY COMMENTED OUT MISSING IMPORTS ---
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { toast } from "sonner";
// --- END COMMENTED IMPORTS ---

// Dummy functions for the temporarily removed components
const Button = ({ children, ...props }) => <button {...props}>{children}</button>;
const Input = (props) => <input {...props} className="border p-2 w-full" />;
const Textarea = (props) => <textarea {...props} className="border p-2 w-full" />;
const Label = ({ children, ...props }) => <label {...props}>{children}</label>;
const Select = ({ children, value, onValueChange, required }) => (
  <select value={value} onChange={e => onValueChange(e.target.value)} required={required} className="border p-2 w-full">
    {children}
  </select>
);
const SelectContent = ({ children }) => children;
const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;
const SelectTrigger = ({ children }) => children;
const SelectValue = ({ placeholder }) => <>{placeholder}</>;
// Dummy toast function to prevent crash
const toast = { success: (msg) => console.log('TOAST:', msg) };


export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Thank you! I'll get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      detail: "[Your City, State]",
    },
    {
      icon: Phone,
      title: "Phone",
      detail: "[Your Phone Number]",
      link: "tel:[YOUR_PHONE]",
    },
    {
      icon: Mail,
      title: "Email",
      detail: "[Your Email]",
      link: "mailto:[YOUR_EMAIL]",
    },
    {
      icon: Instagram,
      title: "Instagram",
      detail: "@[your_handle]",
      link: "https://instagram.com/[YOUR_INSTAGRAM]",
    },
  ];

  return (
    <div className="pt-24 pb-16 bg-white">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-6 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-wide">
            Let's Connect
          </h1>
          <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Ready to capture your story? Fill out the form below or reach out
            directly. I typically respond within 24 hours.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    // className="border-gray-300 focus:border-gray-900" // REMOVED CUSTOM CLASS
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    // className="border-gray-300 focus:border-gray-900" // REMOVED CUSTOM CLASS
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    // className="border-gray-300 focus:border-gray-900" // REMOVED CUSTOM CLASS
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service" className="text-gray-700">
                    Service Type *
                  </Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) =>
                      setFormData({ ...formData, service: value })
                    }
                    required
                  >
                    <SelectTrigger // REMOVED CUSTOM CLASS
                      // className="border-gray-300 focus:border-gray-900"
                      >
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding Photography</SelectItem>
                      <SelectItem value="portrait">Portrait Session</SelectItem>
                      <SelectItem value="event">Event Photography</SelectItem>
                      <SelectItem value="other">Other / Not Sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-gray-700">
                  Event Date (if applicable)
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  // className="border-gray-300 focus:border-gray-900" // REMOVED CUSTOM CLASS
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-700">
                  Tell Me About Your Vision *
                </Label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  // className="border-gray-300 focus:border-gray-900 min-h-[150px]" // REMOVED CUSTOM CLASS
                  placeholder="Share details about your event, location preferences, style inspiration, or any questions you have..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-gray-900 hover:bg-gray-800 rounded-full px-12 py-6 text-base tracking-wide"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2" size={18} />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-32 space-y-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-light mb-6 tracking-wide">
                  Get In Touch
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <item.icon className="text-white" size={20} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          {item.title}
                        </div>
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-900 hover:text-gray-600 transition-colors"
                          >
                            {item.detail}
                          </a>
                        ) : (
                          <div className="text-gray-900">{item.detail}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 p-8 rounded-lg text-white">
                <h3 className="text-xl font-light mb-4 tracking-wide">
                  Response Time
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  I typically respond to all inquiries within 24 hours. If you
                  haven't heard back, please check your spam folder or reach out
                  directly via phone.
                </p>
              </div>

              <div className="border border-gray-200 p-8 rounded-lg">
                <h3 className="text-xl font-light mb-4 tracking-wide">
                  Booking Notice
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  For weddings and large events, I recommend booking 6-12 months
                  in advance. Portrait sessions can typically be scheduled within
                  2-4 weeks.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}