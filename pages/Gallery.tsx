import React from 'react';
import { motion } from 'framer-motion';

const images = [
  'https://picsum.photos/600/400?random=2',
  'https://picsum.photos/600/800?random=3',
  'https://picsum.photos/600/400?random=4',
  'https://picsum.photos/600/600?random=5',
  'https://picsum.photos/600/400?random=6',
  'https://picsum.photos/600/800?random=7',
];

const Gallery: React.FC = () => {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
          Campus Life
        </h1>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03, rotateZ: Math.random() > 0.5 ? 1 : -1 }}
              className="relative overflow-hidden rounded-2xl break-inside-avoid"
            >
              <img src={src} alt="Gallery item" className="w-full h-auto object-cover hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                 <p className="font-medium">Campus Moments</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;