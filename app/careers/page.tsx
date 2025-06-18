"use client"

import { motion } from 'framer-motion';
import { NavbarDemo } from '@/components/navbar/Navbar';
import { Linkedin, Facebook, Twitter } from "lucide-react";
import Footer from '@/components/footer/Footer';
import { BackgroundBeams } from '@/components/acernityui/background-beams';

export default function Careers() {
  return (
    <>
    <div className="min-h-screen bg-black text-white">
      <NavbarDemo />
   
        <div className="absolute  z-10 w-[500px] h-[200px] bg-blue-700 blur-[120px] opacity-40 rounded-full -bottom-32 -left-40 "></div>
      <div className="absolute  z-30 w-[500px] h-[500px] bg-purple-700 blur-[140px] opacity-30 rounded-full top-32 right-4 "></div>

  
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto relative py-12 mt-20  rounded-3xl overflow-hidden shadow-lg">
  

  {/* Content Container */}
  <div className="relative z-10 container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-3xl mx-auto"
    >
      <h2 className="text-7xl text-white font-bold">Careers</h2>
      <p className="text-lg text-natural-300 mt-4">
        Be a part of our growing community and shape the future with us.
      </p>
    </motion.div>
  </div>
</div>


 {/* Current Status Section */}
 <section className="py-8">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 rounded-3xl shadow-xl text-center border border-gray-700"
          >
            <h2 className="text-4xl font-bold mb-6">Currently No Open Positions</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              We appreciate your interest. Currently, there are no open roles. However, we’re always excited to connect with talented individuals for future opportunities.
            </p>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
              Stay connected for upcoming opportunities. Follow us on our <span className="font-semibold text-white">Website</span>, 
              <span className="font-semibold text-white"> Facebook</span>, and <span className="font-semibold text-white"> LinkedIn</span>.
            </p>

            {/* CTA Button */}
            <div className="inline-block px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-lg shadow-md hover:scale-105 transition duration-300 cursor-pointer">
              Get In Touch
            </div>

            {/* Social Media Section */}
            <div className="mt-12 flex items-center justify-center gap-8 text-lg">
              <span className="text-gray-500">Follow us:</span>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition duration-300">
                <Facebook size={30} />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-300">
                <Linkedin size={30} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition duration-300">
                <Twitter size={30} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    <Footer/>
   </>
  )
}
