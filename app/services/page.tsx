"use client"

import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { NavbarDemo } from '@/components/navbar/Navbar';
import { Code, Cloud, Shield, Activity, Cpu, BarChart } from "lucide-react";
import Footer from '@/components/footer/Footer';
import { BackgroundBeams } from '@/components/acernityui/background-beams';


const services = [
  {
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
    description: "Navigate the rapidly evolving Fintech sector with confidence. Our IT consultation services are designed to help Fintech businesses leverage the latest technologies – from AI and blockchain to cloud infrastructure and data analytics."
  },
  {
    icon: <Activity size={50} />,
    title: "AI & Machine Learning",
    description: "Integrate AI and ML solutions for predictive analytics, intelligent automation, and personalized customer experiences."
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

export default function Services() {
  return (
    <>
    <div className="min-h-screen bg-background bg-black ">
      <NavbarDemo/>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto relative py-12 mt-20  rounded-3xl overflow-hidden shadow-lg">
  {/* Background Image */}
  <div className="">
  <BackgroundBeams/>
  </div>

  {/* Content Container */}
  <div className="relative z-10 container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-3xl mx-auto"
    >
      <h2 className="text-7xl text-black font-bold">Services</h2>
      <p className="text-lg text-gray-700 mt-4">
        Be a part of our growing community and shape the future with us.
      </p>
    </motion.div>
  </div>
</div>

  

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="p-8 rounded-lg border border-white/10 bg-black/50 backdrop-blur-lg shadow-xl hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center items-center mb-6 text-yellow-400">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold text-center mb-4">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed  text-justify">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
      {/* CTA Section */}
      <section className="py-20">
        <div className="container text-black mx-auto px-4">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Lets discuss how our services can help you achieve your business goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg">Schedule a Consultation</Button>
              <Button size="lg" variant="outline">View Case Studies</Button>
            </div>
          </motion.div>
        </div>
      </section>
    
    </div>
      <Footer/>
      </>
  )
}