'use client';

import { FaDiscord, FaFacebook, FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

export default function JoinCommunity() {
  return (
    <section className="bg-gray-100 py-16 px-6 rounded-3xl shadow-lg">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Join Us?</h2>
      <p className="text-lg text-gray-600 mb-10">
        Discover a space where innovation meets opportunity. Here’s what you’ll gain by joining our community:
      </p>
  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">🤝 Networking</h3>
          <p className="text-gray-600">Connect with like-minded professionals, industry experts, and creators.</p>
        </div>
  
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">🚀 Career Growth</h3>
          <p className="text-gray-600">Access exclusive job opportunities, workshops, and skill-building sessions.</p>
        </div>
  
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">💡 Innovation Hub</h3>
          <p className="text-gray-600">Stay updated with the latest trends, ideas, and tech breakthroughs.</p>
        </div>
      </div>
    </div>
  </section>
  
  );
}
