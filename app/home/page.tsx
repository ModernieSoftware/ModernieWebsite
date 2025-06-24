'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ParticleBackground from '@/components/particle-background';
import { motion } from 'framer-motion';
import { NavbarDemo } from '@/components/navbar/Navbar';
import gsap from 'gsap';
import HeroGSAPStyle from '@/components/home/herosection';
import AboutSection from '@/components/home/about';
import OurServices from '@/components/home/ourservices';
import JoinCommunity from '@/components/home/socialmedia';

import TechStats from '@/components/home/techstat';

import { InfiniteMovingCardsDemo } from '@/components/home/comment';

import { InfiniteMovingImages } from '@/components/acernityui/nfiniteMovingImages';
import Footer from '@/components/footer/Footer';
import { Industry } from '@/components/home/industry';
import HeroAnimatedLetter from '@/components/home/HeroAnimatedLetter';
import GlitterCard from '@/components/card/GlitterCard';

import { CarouselDemo } from '@/components/home/carosal';
import { AppleCardsCarouselDemo } from '@/components/home/product';
import ComingSoonOverlay from '@/components/comingsoon/ComingSoonOverlay';
import router, { useRouter } from 'next/router';
import emailjs from '@emailjs/browser';
const features = [
  { title: 'AI-Driven Analytics', description: 'Harness the power of artificial intelligence for deep insights' },
  { title: 'Real-Time Data Processing', description: 'Process and analyze data as it happens' },
  { title: 'Cloud Integration', description: 'Seamlessly connect with your existing cloud infrastructure' },
  { title: 'Military-Grade Security', description: 'Enterprise-level security for your sensitive data' },
  { title: 'Scalable Architecture', description: 'Grow without limits, scale on demand' }
];

const industries = [
  { name: 'FinTech', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800' },
  { name: 'HealthTech', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800' },
  { name: 'EdTech', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800' },
  { name: 'E-commerce', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800' },
  { name: 'Logistics', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800' }
];

export default function HomePageContent() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate environment variables
    if (
      !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    ) {
      alert("Email service is currently unavailable. Please contact us directly.");
      return;
    }

    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      e.currentTarget,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLI_KEY
    ).then(
      () => {
        alert('Message sent successfully!');
        router.push('/thank-you');  // Redirect to thank you page
      },
      (error) => {
        alert(`Failed to send message: ${error.text}`);
      }
    );

    e.currentTarget.reset();
  };
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } });
    tl.fromTo(headingRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0 })
      .fromTo(paragraphRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, '-=0.6')
      .fromTo(buttonRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, '-=0.6');
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* <ComingSoonOverlay/> */}
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

      {/* <div className="relative min-h-screen bg-black text-white px-4 sm:px-8 md:px-12">
        <div className="absolute z-10 w-[500px] h-[200px] bg-blue-700 blur-[120px] opacity-40 rounded-full -bottom-32 -left-40 "></div>
        <div className="absolute z-30 w-[500px] h-[500px] bg-purple-700 blur-[140px] opacity-30 rounded-full top-32 right-4 "></div>
        <InfiniteMovingCardsDemo />
      </div> */}

      <section className="from-gray-800 to-black py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-7xl font-passion text-center font-bold mb-6">Let's Build the Future Together</h2>
          <p className="text-gray-600 text-center mt-5 text-lg mx-5 mb-5">Contact us for a personalized walkthrough</p>
          <Card className="p-8 rounded-lg border border-white/10 bg-black/50 backdrop-blur-lg z-10">
                   
                    <form onSubmit={sendEmail} className="space-y-6">
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
