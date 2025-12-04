import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1d1d1f] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">CM SHRI SCHOOL PUNJABI BAGH</h3>
            <p className="text-sm text-gray-400">
              Empowering minds, enriching souls. A premier educational institution in the heart of Punjabi Bagh.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#/academics" className="hover:text-white transition-colors">Academics</a></li>
              <li><a href="#/admissions" className="hover:text-white transition-colors">Admissions</a></li>
              <li><a href="#/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                <span>123 Enclave, Punjabi Bagh,<br />New Delhi, Delhi 110026</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 flex-shrink-0" />
                <span>+91 11 2522 1234</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 flex-shrink-0" />
                <span>admissions@cmshrischool.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="https://www.instagram.com/cmshri1515010?igsh=N3Foa3d4cnBza2V5" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
            <div className="mt-6">
              <p className="text-xs text-gray-500">© {new Date().getFullYear()} CM SHRI SCHOOL PUNJABI BAGH. All rights reserved.</p>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;