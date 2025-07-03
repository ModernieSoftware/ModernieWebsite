"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { NavbarDemo } from "@/components/navbar/Navbar";
import emailjs from "emailjs-com";
import { useRouter } from "next/navigation";

const contactInfo = [
  { icon: <Mail className="h-6 w-6" />, title: "Email", value: "info@modernie.lk" },
  { icon: <MapPin className="h-6 w-6" />, title: "Office", value: "545 Sri Sangaraja Mawatha, Colombo 01000" },
];

const faqs = [
  { question: "How soon can I expect a reply?", answer: "We typically respond within 24 hours." },
  { question: "Do you offer project consultations?", answer: "Yes, reach out to schedule a free consultation." },
  { question: "Can we collaborate remotely?", answer: "Absolutely, we work with clients worldwide." },
];

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    if (!form.current) return alert("Form not found");

    try {
      const result = await emailjs.sendForm(serviceID, templateID, form.current, publicKey);
      console.log("✅ Email sent:", result);
      alert("✅ Message sent successfully!");
      router.push("/thank-you");
    } catch (error: any) {
      console.error("❌ EmailJS error:", error);
      alert(`❌ Failed to send message: ${error?.text || error?.message || JSON.stringify(error)}`);
    }

    form.current.reset();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavbarDemo />

      <div className="max-w-7xl mx-auto relative py-12 mt-20 rounded-3xl overflow-hidden shadow-lg">
        <div className="text-center container mx-auto px-6">
          <h2 className="text-7xl font-bold">Contact Us</h2>
          <p className="text-lg text-neutral-300 mt-4">
            Be a part of our growing community and shape the future with us.
          </p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-16 relative">
        <div className="absolute w-[500px] h-[200px] bg-blue-700 blur-[120px] opacity-40 rounded-full -bottom-32 -left-40" />
        <div className="absolute w-[500px] h-[500px] bg-purple-700 blur-[140px] opacity-30 rounded-full top-32 right-4" />

        {/* Left: Map + Info */}
        <div className="space-y-6 z-10">
          <iframe
            className="w-full h-80 rounded-lg border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.5933412409245!2d79.86600829999999!3d6.939107700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25902f0b5ee55%3A0x4b86983a966182db!2s545%20Sri%20Sangaraja%20Mawatha%2C%20Colombo%2001000!5e0!3m2!1sen!2slk!4v1749099163638!5m2!1sen!2slk"
            loading="lazy"
            allowFullScreen
          ></iframe>

          <div className="grid gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start space-x-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-yellow-400 mt-1">{info.icon}</div>
                <div>
                  <h4 className="font-semibold">{info.title}</h4>
                  <p className="text-gray-400">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Contact Form */}
        <Card className="p-8 rounded-lg border border-white/10 bg-black/50 backdrop-blur-lg z-10">
          <h1 className="text-4xl font-bold mb-6">Send Us a Message</h1>
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <Input name="from_name" placeholder="Your Name" required className="bg-white/5 border-white/10 text-white" />
            <Input name="reply_to" type="email" placeholder="Your Email" required className="bg-white/5 border-white/10 text-white" />
            <Input name="company" placeholder="Company (Optional)" className="bg-white/5 border-white/10 text-white" />
        <Input name="to_email" type="hidden" value="info@modernie.lk" />
  <textarea
              name="message"
              placeholder="Your Message"
              required
              className="w-full h-32 bg-white/5 border border-white/10 rounded-md p-3 text-white placeholder-gray-400"
            ></textarea>
            <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200 transition-colors">
              Send Message
            </Button>
          </form>
        </Card>
      </section>

      {/* Social Icons */}
      <section className="text-center border-t border-white/10 py-10 z-10">
        <h3 className="text-2xl font-semibold mb-4">Connect with Us</h3>
        <div className="flex justify-center gap-8">
          <a href="#" className="text-gray-400 hover:text-blue-500"><Facebook size={30} /></a>
          <a href="#" className="text-gray-400 hover:text-blue-400"><Linkedin size={30} /></a>
          <a href="#" className="text-gray-400 hover:text-sky-400"><Twitter size={30} /></a>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <h3 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/10"
            >
              <h4 className="text-xl font-semibold mb-4">{faq.question}</h4>
              <p className="text-gray-400">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
