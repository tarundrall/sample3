import React from 'react';
import Button from '../components/ui/Button';
import { MapPin, ExternalLink } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <div>
          <h1 className="text-5xl font-bold mb-6">Get in Touch.</h1>
          <p className="text-xl text-gray-500 mb-10">
            We'd love to hear from you. Visit us in Punjabi Bagh or send us a message.
          </p>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:border-gray-300 focus:bg-white focus:ring-0 transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:border-gray-300 focus:bg-white focus:ring-0 transition-colors" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-gray-50 border-transparent focus:border-gray-300 focus:bg-white focus:ring-0 transition-colors" placeholder="How can we help?"></textarea>
            </div>
            <Button className="w-full">Send Message</Button>
          </form>
        </div>

        <a 
          href="https://www.google.com/maps/search/?api=1&query=Punjabi+Bagh,+New+Delhi" 
          target="_blank" 
          rel="noopener noreferrer"
          className="h-full min-h-[400px] bg-gray-100 rounded-3xl overflow-hidden relative shadow-inner group cursor-pointer block"
        >
           {/* Map Embed - Pointer events none allows click to pass through to anchor */}
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.276435941913!2d77.1293!3d28.6675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0397d5555555%3A0x0!2sPunjabi%20Bagh!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
             width="100%" 
             height="100%" 
             className="absolute inset-0 w-full h-full transition-all duration-500 opacity-60 grayscale invert group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0 pointer-events-none"
             allowFullScreen 
             loading="lazy"
           ></iframe>

           {/* Overlay Card */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4 transform transition-all duration-300 group-hover:scale-105 border border-white/50">
               <div className="bg-red-500 text-white p-3 rounded-full shadow-lg">
                 <MapPin size={24} />
               </div>
               <div>
                 <p className="font-bold text-gray-900 text-sm">CM SHRI SCHOOL</p>
                 <p className="text-xs text-gray-500 mb-1">Punjabi Bagh, New Delhi</p>
                 <div className="flex items-center text-blue-600 text-xs font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                   Open in Maps <ExternalLink size={10} className="ml-1" />
                 </div>
               </div>
             </div>
           </div>
           
           {/* Hover Hint Overlay */}
           <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-300 pointer-events-none"></div>
        </a>

      </div>
    </div>
  );
};

export default Contact;