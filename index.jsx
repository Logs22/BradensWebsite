import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import Link from 'next/link';
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { ArrowRight, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Placeholder images - user will replace these
  const featuredImages = [
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&h=1600&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1200&h=1600&fit=crop",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&h=800&fit=crop",
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=2000&h=1200&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </motion.div>

        <div className="relative h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-wide">
              Capturing
              <br />
              <span className="font-normal italic">Moments</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 font-light tracking-wide">
              Through the lens of Braden Blackburn
            </p>
            <Link href="/portfolio">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8 py-6 text-base tracking-wide group"
              >
                View Portfolio
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Work Grid */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">
              Featured Work
            </h2>
            <p className="text-gray-600 text-lg font-light">
              A glimpse into recent sessions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden aspect-[4/5] md:aspect-[3/4] cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Featured ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 border-gray-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
              >
                Explore Full Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&h=1000&fit=crop"
                  alt="Braden Blackburn"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gray-900 flex items-center justify-center">
                  <Camera className="text-white w-16 h-16" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
                Meet Braden
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  With a passion for storytelling through imagery, I specialize
                  in capturing authentic moments that you'll treasure forever.
                </p>
                <p>
                  Whether it's a wedding, portrait session, or special event, my
                  goal is to create timeless photographs that reflect your unique
                  story.
                </p>
              </div>
              <Link href="/about">
                <Button
                  variant="link"
                  className="mt-6 px-0 text-gray-900 group"
                >
                  Learn More About Me
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">
              Services
            </h2>
            <p className="text-gray-400 text-lg font-light">
              Tailored photography experiences for every occasion
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Weddings", desc: "Complete coverage of your special day" },
              { title: "Portraits", desc: "Individual, couple, and family sessions" },
              { title: "Events", desc: "Corporate and private event photography" },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-gray-800 p-8 hover:border-gray-600 transition-colors duration-300"
              >
                <h3 className="text-2xl font-light mb-3 tracking-wide">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6">{service.desc}</p>
                <Link href="/services">
                  <Button
                    variant="link"
                    className="px-0 text-white group"
                  >
                    View Details
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
            Let's Create Something Beautiful
          </h2>
          <p className="text-gray-600 text-lg mb-8 font-light">
            Ready to capture your story? Get in touch to discuss your photography
            needs.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 rounded-full px-12 py-6 text-base tracking-wide"
            >
              Get In Touch
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}