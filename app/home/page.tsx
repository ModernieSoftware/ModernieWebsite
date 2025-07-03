'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { NavbarDemo } from '@/components/navbar/Navbar';
import gsap from 'gsap';
import HeroAnimatedLetter from '@/components/home/HeroAnimatedLetter';
import AboutSection from '@/components/home/about';
import OurServices from '@/components/home/ourservices';
import TechStats from '@/components/home/techstat';
import { InfiniteMovingImages } from '@/components/acernityui/nfiniteMovingImages';
import Footer from '@/components/footer/Footer';
import GlitterCard from '@/components/card/GlitterCard';
import { AppleCardsCarouselDemo } from '@/components/home/product';
import emailjs from '@emailjs/browser';
import { useRouter } from 'next/navigation';

export default function HomePageContent() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.hover-glow');
      cards.forEach(card => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

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
      router.push("/");
    } catch (error: any) {
      console.error("❌ EmailJS error:", error);
      alert(`❌ Failed to send message: ${error?.text || error?.message || JSON.stringify(error)}`);
    }

    form.current.reset();
  };

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } });
    tl.fromTo(headingRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0 })
      .fromTo(paragraphRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, '-=0.6')
      .fromTo(buttonRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, '-=0.6');
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <NavbarDemo />

      <div className="relative min-h-screen bg-black text-white px-4 sm:px-8 md:px-12">
        <div className="absolute z-30 w-[600px] h-[600px] bg-blue-700 blur-[160px] opacity-40 rounded-full -top-20 -right-40 "></div>
        <div className="absolute z-30 w-[500px] h-[500px] bg-purple-700 blur-[140px] opacity-30 rounded-full -bottom-32 -left-40"></div>
        <HeroAnimatedLetter />
      </div>

      <GlitterCard />

      <div className="relative min-h-screen bg-black text-white px-4 sm:px-8 md:px-12">
        <div className="absolute z-30 w-[200px] h-[200px] bg-blue-700 blur-[120px] opacity-40 rounded-full top-40 right-36 "></div>
        <AboutSection />
      </div>

      <div id="services" className="py-16">
        <OurServices />
      </div>

      <div className="relative min-h-screen bg-black text-white px-4 sm:px-8 md:px-12">
        <div className="absolute z-10 w-[500px] h-[200px] bg-blue-700 blur-[120px] opacity-40 rounded-full top-32 right-4 "></div>
        <div className="absolute z-30 w-[500px] h-[500px] bg-purple-700 blur-[140px] opacity-30 rounded-full -bottom-32 -left-40"></div>
        <TechStats />
        <InfiniteMovingImages
          images={[
            './img/companylogo/crevaty_logo-1.png',
            './img/companylogo/logo (3).png',
            './img/companylogo/logo (5).png',
            './img/companylogo/mlh_logo.png',
            './img/companylogo/logo (4).png'
          ]}
          direction="left"
          speed="normal"
          pauseOnHover={true}
        />
      </div>

      <div id="product" className="py-16">
        <h1 className="text-5xl md:text-7xl font-passion font-bold text-center">Our Products</h1>
        <p className="text-gray-600 text-center mt-5 text-lg mx-5">
          Together, let's build a smarter future powered by intelligent systems and creative technology.
        </p>
        <AppleCardsCarouselDemo />
      </div>

      <section className="from-gray-800 to-black py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-7xl font-passion text-center font-bold mb-6">Let's Build the Future Together</h2>
          <p className="text-gray-600 text-center mt-5 text-lg mx-5 mb-5">Contact us for a personalized walkthrough</p>
          <Card className="p-8 rounded-lg border border-white/10 bg-black/50 backdrop-blur-lg z-10">
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <input type="hidden" name="to_email" value="info@modernie.lk" />
              <Input 
                name="from_name" 
                placeholder="Your Name" 
                className="bg-white/5 border-white/10 text-white" 
                required 
              />
              <Input 
                name="reply_to" 
                type="email"
                placeholder="Your Email" 
                className="bg-white/5 border-white/10 text-white" 
                required 
              />
              <Input 
                name="company" 
                placeholder="Company" 
                className="bg-white/5 border-white/10 text-white" 
              />
              <textarea
                name="message"
                className="w-full h-32 bg-white/5 border border-white/10 rounded-md p-3 text-white placeholder-gray-400"
                placeholder="Your Message"
                required
              ></textarea>
              <Button 
                type="submit" 
                className="w-full bg-white text-black hover:bg-gray-200 transition-colors duration-300"
              >
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
