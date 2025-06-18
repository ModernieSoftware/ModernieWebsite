'use client';

import { motion } from "framer-motion";
import { Code, Cloud, Shield, Activity, Cpu, BarChart } from "lucide-react";

const services = [
   {
    icon: <Activity size={50} />,
    title: "AI & Machine Learning",
    description: "Integrate AI and ML solutions for predictive analytics, intelligent automation, and personalized customer experiences."
  },{
    icon: <Code size={50} />,
    title: "Web Development",
    description: "We build responsive, fast, and scalable web applications tailored to your business needs, using the latest technologies."
  },
  {
    icon: <Cloud size={50} />,
    title: "Cloud Integration",
    description: "Seamlessly integrate your systems with AWS, Azure, and GCP to enhance scalability, security, and flexibility."
  },
  {
    icon: <Shield size={50} />,
    title: "Consultation services",
    description: "Navigate the rapidly evolving Fintech sector with confidence. Our IT consultation services are designed to help Fintech businesses leverage the latest technologies"
  },
 
  {
    icon: <Cpu size={50} />,
    title: "Custom Software",
    description: "Develop robust software applications designed for your unique business challenges, ensuring long-term scalability."
  },
  {
    icon: <BarChart size={50} />,
    title: "Data Analytics",
    description: "Transform raw data into actionable insights with powerful visualization tools and advanced analytics platforms."
  },
];

export default function OurServices() {
  return (
    <section className="py-20 bg-gradient-to-b  text-white">
      <div className="max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-7xl font-passion font-bold mb-6">Our Services</h1>
        <p className="text-gray-400 text-lg mb-12 max-w-3xl mx-auto">
          Together, lets build a smarter future powered by intelligent systems, cloud innovation, and creative technology.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="hover-glow p-8 rounded-lg border border-white/10 bg-black/50 backdrop-blur-lg shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center items-center mb-6 text-blue-700">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed text-justify">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
