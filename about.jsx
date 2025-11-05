import React from "react";
import { motion } from "framer-motion";
import { Camera, Heart, Award, Users } from "lucide-react";

export default function About() {
  const stats = [
    { icon: Camera, value: "500+", label: "Sessions Completed" },
    { icon: Heart, value: "100+", label: "Happy Couples" },
    { icon: Award, value: "5+", label: "Years Experience" },
    { icon: Users, value: "1000+", label: "Satisfied Clients" },
  ];

  return (
    <div className="pt-24 pb-16 bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden mb-24">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=2000&h=1200&fit=crop"
          alt="Braden Blackburn"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl md:text-7xl font-light text-white tracking-wide"
          >
            About Me
          </motion.h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6 text-gray-700 leading-relaxed text-lg"
        >
          <p className="text-2xl font-light text-gray-900 mb-8">
            Hi, I'm Braden Blackburn – a photographer passionate about capturing
            the beauty in everyday moments.
          </p>
          
          <p>
            Photography has always been more than just a profession for me; it's a
            way to freeze time and preserve the emotions, connections, and stories
            that make life meaningful. From intimate portraits to grand
            celebrations, I believe every moment deserves to be remembered.
          </p>

          <p>
            My journey into photography began [ADD YOUR STORY HERE - e.g., "when
            I picked up my first camera at age 15" or "after attending a friend's
            wedding"]. Since then, I've had the privilege of working with amazing
            clients across [YOUR LOCATION/REGIONS], capturing everything from
            weddings and engagements to family portraits and special events.
          </p>

          <p>
            What sets my work apart is my commitment to authenticity. I don't
            believe in overly posed or artificial shots. Instead, I focus on
            creating a comfortable environment where genuine emotions and
            connections can shine through. The result? Images that feel timeless,
            natural, and uniquely yours.
          </p>

          <p>
            When I'm not behind the camera, you can find me [ADD PERSONAL DETAILS
            - e.g., "exploring new hiking trails," "spending time with my family,"
            "trying out new coffee shops"]. These experiences fuel my creativity
            and help me bring fresh perspectives to every shoot.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20 mb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-900 rounded-full flex items-center justify-center">
                  <stat.icon className="text-white" size={28} />
                </div>
                <div className="text-4xl font-light mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4 tracking-wide">
            My Philosophy
          </h2>
          <p className="text-gray-600 text-lg font-light">
            What guides my approach to photography
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Authenticity",
              desc: "I capture real emotions and genuine moments, not forced poses. Your photos should reflect who you truly are.",
            },
            {
              title: "Connection",
              desc: "Building trust with my clients is essential. When you're comfortable, the best moments naturally unfold.",
            },
            {
              title: "Timelessness",
              desc: "Trends come and go, but great photography endures. I focus on creating images you'll cherish forever.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-8"
            >
              <h3 className="text-2xl font-light mb-4 tracking-wide">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Equipment Section (Optional) */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Camera className="w-16 h-16 mx-auto mb-6 text-gray-400" />
            <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wide">
              Professional Equipment
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
              I use professional-grade camera equipment and editing software to
              ensure every image meets the highest standards of quality. From
              shooting to post-production, your photos receive meticulous
              attention to detail.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
