import React from "react";
//import { Link } from "react-router-dom";
import Link from 'next/link';
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Check, Heart, Camera, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Services() {
  const services = [
    {
      icon: Heart,
      title: "Wedding Photography",
      description:
        "Comprehensive coverage of your special day from preparation to reception",
      features: [
        "Full day coverage (8-12 hours)",
        "Second photographer included",
        "Engagement session",
        "High-resolution edited images",
        "Online gallery for sharing",
        "Print rights included",
      ],
      price: "Starting at $[YOUR_PRICE]",
      image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop",
    },
    {
      icon: Camera,
      title: "Portrait Sessions",
      description:
        "Individual, couple, family, and senior portraits in studio or on location",
      features: [
        "1-2 hour session",
        "Multiple outfit changes",
        "Location of your choice",
        "25+ edited high-resolution images",
        "Online gallery",
        "Print rights included",
      ],
      price: "Starting at $[YOUR_PRICE]",
      image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&h=600&fit=crop",
    },
    {
      icon: Users,
      title: "Event Photography",
      description:
        "Corporate events, parties, and special celebrations captured professionally",
      features: [
        "Flexible hourly packages",
        "Candid and formal shots",
        "Fast turnaround time",
        "High-resolution edited images",
        "Online gallery for attendees",
        "Commercial usage rights available",
      ],
      price: "Starting at $[YOUR_PRICE]",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
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
            Services & Investment
          </h1>
          <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Quality photography is an investment in memories that last a lifetime.
            I offer flexible packages to suit your needs and budget.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className={index % 2 === 1 ? "md:order-2" : "md:order-1"}>
                <div className="relative overflow-hidden group aspect-[4/3]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              <div className={index % 2 === 1 ? "md:order-1" : "md:order-2"}>
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                  <service.icon className="text-white" size={28} />
                </div>
                <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wide">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="mb-6">
                  <h3 className="text-sm font-medium tracking-wider text-gray-900 mb-4">
                    WHAT'S INCLUDED:
                  </h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check
                          className="text-gray-900 flex-shrink-0 mt-0.5"
                          size={18}
                        />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <div className="text-2xl font-light text-gray-900">
                    {service.price}
                  </div>
                </div>

                <Link to="/contact">
                  <Button className="bg-gray-900 hover:bg-gray-800 rounded-full px-8">
                    Book This Service
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-wide">
              Custom Packages Available
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
              Every event is unique, and so are your photography needs. I'm happy
              to create a custom package tailored to your specific requirements.
              Additional services include engagement sessions, photo albums,
              canvas prints, and more.
            </p>
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 border-gray-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300"
              >
                Discuss Your Needs
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}