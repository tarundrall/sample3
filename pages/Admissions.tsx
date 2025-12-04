import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, CheckCircle, Download, Phone } from 'lucide-react';
import Button from '../components/ui/Button';

const Admissions: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#fbfbfd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            Admissions 2025-26
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto font-light"
          >
            We invite parents to be partners in our quest for excellence.
          </motion.p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Eligibility */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Eligibility</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                <span><span className="font-semibold text-gray-900">Nursery:</span> 3+ years as of 31st March.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                <span><span className="font-semibold text-gray-900">KG:</span> 4+ years as of 31st March.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                <span><span className="font-semibold text-gray-900">Class I:</span> 5+ years as of 31st March.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                <span><span className="font-semibold text-gray-900">Class XI:</span> Merit-based on Class X Board results & Aptitude Test score.</span>
              </li>
            </ul>
          </motion.div>

          {/* Documents */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <FileText size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Documents Required</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0"></span>
                <span>Birth Certificate (issued by Municipal Corporation).</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0"></span>
                <span>Proof of Residence (Aadhar Card / Passport / Utility Bill).</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0"></span>
                <span>Recent passport size photographs (Child, Mother & Father).</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0"></span>
                <span>Previous Class Report Card (for admission to Class II onwards).</span>
              </li>
            </ul>
          </motion.div>

          {/* Important Dates */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <Calendar size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Important Dates</h3>
            <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-orange-100">
                <p className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-1">Registration Opens</p>
                <p className="text-gray-900 font-semibold">1st February, 2025</p>
              </div>
              <div className="relative pl-6 border-l-2 border-orange-100">
                <p className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-1">Form Submission Deadline</p>
                <p className="text-gray-900 font-semibold">20th March, 2025</p>
              </div>
              <div className="relative pl-6 border-l-2 border-orange-100">
                <p className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-1">Entrance Test (VI-IX)</p>
                <p className="text-gray-900 font-semibold">25th March, 2025</p>
              </div>
              <div className="relative pl-6 border-l-2 border-orange-100">
                <p className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-1">New Session Begins</p>
                <p className="text-gray-900 font-semibold">1st April, 2025</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row justify-center items-center gap-6"
        >
          <Button 
            size="lg" 
            className="w-full md:w-auto flex items-center justify-center gap-3 bg-black text-white px-8 py-5 rounded-full text-sm md:text-base shadow-xl hover:bg-gray-800 transition-all hover:scale-105"
          >
            <Download size={20} />
            DOWNLOAD ADMISSION FORM
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-5 rounded-full text-sm md:text-base border-2 hover:bg-gray-50 transition-all hover:scale-105"
            onClick={() => window.location.href = 'tel:+911125221234'}
          >
            <Phone size={20} />
            CONTACT ADMISSION OFFICE
          </Button>
        </motion.div>

      </div>
    </div>
  );
};

export default Admissions;