'use client';

import { Briefcase, Users, ShieldCheck, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

export default function TechStats() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
      className=" rounded-3xl  border border-white/10 py-16 px-6 max-w-7xl mx-auto"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-200">Trusted by Innovators Worldwide</h2>
        <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
          Powering businesses with next-gen AI solutions and scalable cloud technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {/* Stat 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Briefcase className="mx-auto text-blue-600 w-12 h-12 mb-4" />
          <h3 className="text-5xl font-extrabold text-neutral-300">
            <CountUp end={5} duration={2} />+
          </h3>
          <p className="mt-4 text-gray-700">Years driving innovation</p>
        </motion.div>

        {/* Stat 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Users className="mx-auto text-blue-600 w-12 h-12 mb-4" />
          <h3 className="text-5xl font-extrabold text-neutral-300">
            <CountUp end={250} duration={3} separator="," />+
          </h3>
          <p className="mt-4 text-gray-700">Active users worldwide</p>
        </motion.div>

        {/* Stat 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <ShieldCheck className="mx-auto text-blue-600 w-12 h-12 mb-4" />
          <h3 className="text-5xl font-extrabold text-neutral-300">
            <CountUp end={99.9} duration={2} decimals={1} />%
          </h3>
          <p className="mt-4 text-gray-700">Uptime guarantee</p>
        </motion.div>

        {/* Stat 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <Globe className="mx-auto text-blue-600 w-12 h-12 mb-4" />
          <h3 className="text-5xl font-extrabold text-neutral-300">
            <CountUp end={14} duration={2} />+
          </h3>
          <p className="mt-4 text-gray-700">Enterprise clients</p>
        </motion.div>
      </div>
    </motion.section>
  );
}
