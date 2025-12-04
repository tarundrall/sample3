import React, { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Trophy, Calendar, Bell, X, Upload, Image as ImageIcon, CheckCircle, Lock, Edit, Save, Trash2, Plus } from 'lucide-react';
import HeroScene from '../components/3d/HeroScene';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const heroImages = [
  "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576267423048-15c0040fec78?q=80&w=2070&auto=format&fit=crop"
];

interface Notice {
  id: number;
  title: string;
  date: { day: string; month: string };
  category: string;
  excerpt: string;
  details: string;
  color: string;
}

const initialNotices: Notice[] = [
  {
    id: 1,
    title: "Winter Vacation Schedule",
    date: { day: "25", month: "DEC" },
    category: "Holiday",
    excerpt: "School will remain closed for winter break from Dec 25th to Jan 10th. Online assignments will be available on the portal.",
    details: "The school will remain closed for Winter Vacation starting from December 25th, 2024 to January 10th, 2025. The school office will remain operational from 9:00 AM to 1:00 PM on working days. Students are advised to complete their holiday homework, which has been uploaded to the student portal. Online doubt-clearing sessions will be scheduled from January 5th. School will reopen for regular classes on January 11th, 2025.",
    color: "bg-blue-100 text-blue-700"
  },
  {
    id: 2,
    title: "Annual Function 'Spectra'",
    date: { day: "15", month: "FEB" },
    category: "Event",
    excerpt: "Join us for a mesmerizing evening of music, dance, and drama at the Main Auditorium. Gates open at 5 PM.",
    details: "We are delighted to invite you to our Annual Function, 'Spectra 2025', a celebration of art, culture, and talent. The event will feature performances by students from all grades, including a grand musical drama, fusion dance, and the school orchestra. \n\nVenue: School Main Auditorium\nTime: 5:30 PM - 8:30 PM\nDress Code: Formal\n\nEntry passes have been sent to parents via email. Please carry a digital or print copy for entry.",
    color: "bg-purple-100 text-purple-700"
  },
  {
    id: 3,
    title: "Annual Sports Meet",
    date: { day: "20", month: "JAN" },
    category: "Sports",
    excerpt: "Track and field events for Senior School. Selection trials begin on Jan 10th. Register with your house captain.",
    details: "The Annual Sports Meet 2025 is scheduled for January 20th at the School Sports Complex. Events include 100m, 400m, Relay, Long Jump, Shot Put, and Inter-House Football finals. \n\nStudents interested in participating must register with their respective House Captains by January 10th. Selection trials will be held from Jan 10th to Jan 12th during school hours. Parents are welcome to witness the events and cheer for the students.",
    color: "bg-green-100 text-green-700"
  },
  {
    id: 4,
    title: "Parent Teacher Meeting",
    date: { day: "30", month: "JAN" },
    category: "Academic",
    excerpt: "Mandatory PTM for Grades VI to XII to discuss Term-1 performance. Timings: 9:00 AM to 12:30 PM.",
    details: "A mandatory Parent-Teacher Meeting (PTM) will be held on January 30th, 2025, to discuss the academic performance of students for Term-1. \n\nSchedule:\nRoll No 1-15: 9:00 AM - 10:00 AM\nRoll No 16-30: 10:00 AM - 11:00 AM\nRoll No 31+: 11:00 AM - 12:30 PM\n\nPlease adhere to the allotted time slots to avoid overcrowding. Subject teachers will be available in their respective classrooms.",
    color: "bg-orange-100 text-orange-700"
  },
  {
    id: 5,
    title: "Admissions Open 2025-26",
    date: { day: "01", month: "MAR" },
    category: "Admissions",
    excerpt: "Registration forms for the new academic session are now available online and at the school reception.",
    details: "Admissions for the academic session 2025-26 are now open for Nursery to Class IX and Class XI. Registration forms can be filled out online on our website or collected from the school reception between 9:00 AM and 2:00 PM.\n\nKey Dates:\nForm Submission Deadline: March 20th\nEntrance Test (Class VI-IX): March 25th\nFirst List of Selected Candidates: March 30th\n\nFor queries, please contact the admissions office.",
    color: "bg-red-100 text-red-700"
  }
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);
  
  // Notice Data State
  const [noticesList, setNoticesList] = useState<Notice[]>(initialNotices);

  // Modal & Edit States
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotice, setEditedNotice] = useState<Partial<Notice>>({});

  // Admin Access State
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false); // Controls login in modal
  const [showSectionLogin, setShowSectionLogin] = useState(false); // Controls login in section header
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToNotices = () => {
    const element = document.getElementById('notices');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNoticeClick = (notice: Notice) => {
    setSelectedNotice(notice);
    setUploadFile(null);
    setUploadStatus('idle');
    setIsEditing(false);
    // Note: We do NOT reset isAdmin here to allow persistent admin session across notices
    setLoginError(false);
  };

  const handleAdminLogin = (source: 'modal' | 'section') => {
    if (adminPassword === '1515010') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setShowSectionLogin(false);
      setLoginError(false);
      setAdminPassword('');
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  };

  const handleEditClick = () => {
    if (selectedNotice) {
      setEditedNotice({ ...selectedNotice });
      setIsEditing(true);
    }
  };

  const handleSaveNotice = () => {
    if (!editedNotice.title || !editedNotice.details) return;

    if (selectedNotice?.id === 0) {
       // Create New
       const newId = Math.max(...noticesList.map(n => n.id)) + 1;
       const newNotice = { ...editedNotice, id: newId } as Notice;
       setNoticesList([newNotice, ...noticesList]);
       setSelectedNotice(newNotice);
    } else {
       // Update Existing
       const updatedList = noticesList.map(n => 
         n.id === selectedNotice?.id ? { ...n, ...editedNotice } as Notice : n
       );
       setNoticesList(updatedList);
       setSelectedNotice({ ...selectedNotice, ...editedNotice } as Notice);
    }
    setIsEditing(false);
  };

  const handleDeleteNotice = () => {
    if (selectedNotice) {
      setNoticesList(noticesList.filter(n => n.id !== selectedNotice.id));
      setSelectedNotice(null);
    }
  };

  const handleAddNewNotice = () => {
    const blankNotice: Notice = {
      id: 0, // 0 indicates new
      title: "",
      date: { day: new Date().getDate().toString(), month: new Date().toLocaleString('default', { month: 'short' }).toUpperCase() },
      category: "General",
      excerpt: "",
      details: "",
      color: "bg-gray-100 text-gray-700"
    };
    setSelectedNotice(blankNotice);
    setEditedNotice(blankNotice);
    setIsEditing(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!uploadFile) return;
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('success');
    }, 1500);
  };

  return (
    <div className="w-full overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* Background Carousel with Parallax */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0"
        >
          <AnimatePresence mode="popLayout">
            <motion.img 
              key={currentImageIndex}
              src={heroImages[currentImageIndex]} 
              alt="CM Shri School Campus" 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.4, scale: 1.05 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover grayscale"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80" />
        </motion.div>

        {/* 3D Scene Overlay */}
        <div className="absolute inset-0 z-10 opacity-70 pointer-events-none mix-blend-screen">
          <HeroScene />
        </div>

        <div className="relative z-20 text-center px-4 max-w-7xl mx-auto pt-20 flex flex-col items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-white mb-8 leading-[1.1]"
              animate={{
                textShadow: [
                  "0 -1px 1px rgba(255, 255, 255, 0.2), 0 2px 4px rgba(0, 0, 0, 0.4), 0 15px 30px rgba(0, 0, 0, 0.6)",
                  "0 -1px 3px rgba(255, 255, 255, 0.4), 0 4px 12px rgba(0, 0, 0, 0.5), 0 20px 40px rgba(0, 0, 0, 0.8)"
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              WELCOME TO <br />
              CM SHRI SCHOOL <br />
              PUNJABI BAGH
            </motion.h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="text-xl md:text-3xl text-[#86868b] mb-12 font-medium tracking-tight max-w-4xl mx-auto leading-relaxed"
          >
            A legacy of <span className="text-white">Education</span>, <span className="text-white">Discipline</span>, and <span className="text-white">Holistic Learning</span>.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full"
          >
            <Button 
              size="lg" 
              onClick={() => navigate('/admissions')} 
              className="w-full sm:w-auto min-w-[200px] !bg-white !text-black hover:!bg-gray-100 hover:!text-black border-none text-lg px-8 py-4 rounded-full font-bold tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              whileHover={{ 
                scale: 1.08, 
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255,255,255,0.6)",
                transition: { type: "spring", stiffness: 400, damping: 20 }
              }}
              whileTap={{ scale: 0.95, y: 0 }}
            >
              Apply Now
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto min-w-[200px] text-white border-white/40 hover:bg-white/10 hover:border-white text-lg px-8 py-4 rounded-full backdrop-blur-xl font-medium" 
              onClick={scrollToNotices}
              whileHover={{ 
                scale: 1.05, 
                y: -6,
                boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 1)",
                transition: { type: "spring", stiffness: 400, damping: 20 }
              }}
              whileTap={{ scale: 0.95, y: 0 }}
            >
              View Notices
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-32 bg-[#f5f5f7] text-[#1d1d1f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-4xl mx-auto mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-black mb-8">Redefining Education.</h2>
            <p className="text-xl md:text-2xl text-gray-500 font-normal leading-relaxed">
              We believe in a holistic approach where academic excellence meets character development. Located in the heart of Punjabi Bagh, our campus is a sanctuary for learning.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {[
              { icon: BookOpen, title: "World-Class Curriculum", desc: "Blending traditional wisdom with modern pedagogy." },
              { icon: Users, title: "Expert Faculty", desc: "Mentors who inspire, guide, and challenge." },
              { icon: Trophy, title: "Beyond Academics", desc: "Sports, arts, and robotics to fuel passion." }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeIn} className="group p-10 rounded-3xl bg-white shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-semibold text-black mb-4 tracking-tight">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed font-light text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Notice Board Section */}
      <section id="notices" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <span className="text-blue-600 font-bold uppercase tracking-wider text-xs mb-2 block flex items-center gap-2">
                <Bell size={14} /> Updates & Announcements
              </span>
              <div className="flex items-center gap-4">
                <h2 className="text-4xl md:text-5xl font-semibold text-black tracking-tight">Notice Board</h2>
                {!isAdmin ? (
                   <div className="relative">
                      <button 
                         onClick={() => setShowSectionLogin(!showSectionLogin)} 
                         className="p-2 rounded-full text-gray-300 hover:text-blue-600 hover:bg-gray-100 transition-all"
                         title="HOS/Admin Access"
                      >
                         <Lock size={18} />
                      </button>
                      <AnimatePresence>
                        {showSectionLogin && (
                           <motion.div
                              initial={{ opacity: 0, x: -10, scale: 0.95 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              exit={{ opacity: 0, x: -10, scale: 0.95 }}
                              className="absolute left-full top-0 ml-2 bg-white border border-gray-200 shadow-xl rounded-xl p-3 flex items-center gap-2 z-50 w-64"
                           >
                              <input 
                                type="password"
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                                placeholder="HOS Passcode"
                                autoFocus
                                className={`w-full text-xs px-3 py-2 border rounded-md focus:outline-none ${loginError ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                              />
                              <Button size="sm" onClick={() => handleAdminLogin('section')} className="px-3 py-1.5 text-xs h-auto whitespace-nowrap">Login</Button>
                           </motion.div>
                        )}
                      </AnimatePresence>
                   </div>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={handleAddNewNotice}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                  >
                    <Plus size={16} /> Add Notice
                  </Button>
                )}
              </div>
            </div>
            <Button variant="outline" className="rounded-full">View All Archives</Button>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {noticesList.map((notice) => (
              <motion.div 
                key={notice.id} 
                variants={fadeIn}
                whileHover={{ y: -8 }}
                onClick={() => handleNoticeClick(notice)}
                className="bg-[#fbfbfd] rounded-3xl p-6 md:p-8 border border-gray-100 hover:border-gray-300 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  {/* Date Tag */}
                  <div className="flex flex-col items-center bg-white border border-gray-200 rounded-2xl p-3 shadow-sm min-w-[70px]">
                    <span className="text-2xl font-bold text-black leading-none">{notice.date.day}</span>
                    <span className="text-xs font-bold text-gray-500 uppercase mt-1">{notice.date.month}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${notice.color}`}>
                    {notice.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {notice.title}
                </h3>
                <p className="text-gray-500 mb-6 text-sm leading-relaxed line-clamp-3">
                  {notice.excerpt}
                </p>
                
                <div className="flex items-center text-blue-600 font-semibold text-sm mt-auto group/link">
                  READ MORE 
                  <ArrowRight size={16} className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Section with Parallax Feel */}
      <section className="py-32 bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-500 font-semibold tracking-wider uppercase text-xs mb-2 block">Innovation</span>
            <h2 className="text-5xl md:text-7xl font-semibold mb-8 tracking-tighter leading-tight">
              Learning. <br /> Reimagined.
            </h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed font-medium">
              Our state-of-the-art labs and smart classrooms provide an immersive environment. From coding to creative writing, we equip students with tools for the digital age.
            </p>
            <Button variant="outline" className="text-white border-white/30 hover:bg-white hover:text-black rounded-full px-8 py-3" onClick={() => navigate('/academics')}>
              Explore Academics <ArrowRight size={16} className="ml-2" />
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
             <div className="absolute inset-0 bg-blue-900 blur-[120px] opacity-30 rounded-full"></div>
             <img 
              src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop" 
              alt="Classroom" 
              className="rounded-3xl shadow-2xl relative z-10 border border-white/10 grayscale hover:grayscale-0 transition-all duration-700"
             />
          </motion.div>
        </div>
      </section>

      {/* Notice Modal */}
      <AnimatePresence>
        {selectedNotice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedNotice(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2rem] w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-gray-100 flex justify-between items-start bg-white z-10 sticky top-0">
                <div className="flex-1 mr-8">
                  {isEditing ? (
                    <div className="space-y-3">
                       <input 
                         type="text" 
                         value={editedNotice.title || ''}
                         onChange={(e) => setEditedNotice({...editedNotice, title: e.target.value})}
                         placeholder="Notice Title"
                         className="w-full text-2xl font-bold border-b border-gray-200 focus:border-blue-500 outline-none pb-1"
                       />
                       <div className="flex gap-3">
                          <input 
                            type="text" 
                            value={editedNotice.category || ''}
                            onChange={(e) => setEditedNotice({...editedNotice, category: e.target.value})}
                            placeholder="Category (e.g., Event)"
                            className="text-sm border border-gray-200 rounded px-2 py-1 w-32"
                          />
                          <input 
                            type="text" 
                            value={editedNotice.date?.day || ''}
                            onChange={(e) => setEditedNotice({...editedNotice, date: { ...editedNotice.date!, day: e.target.value}})}
                            placeholder="Day"
                            className="text-sm border border-gray-200 rounded px-2 py-1 w-16"
                          />
                          <input 
                            type="text" 
                            value={editedNotice.date?.month || ''}
                            onChange={(e) => setEditedNotice({...editedNotice, date: { ...editedNotice.date!, month: e.target.value}})}
                            placeholder="Month"
                            className="text-sm border border-gray-200 rounded px-2 py-1 w-16"
                          />
                       </div>
                    </div>
                  ) : (
                    <>
                       <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${selectedNotice.color}`}>
                          {selectedNotice.category}
                        </span>
                        <span className="text-gray-400 text-sm font-medium">
                          {selectedNotice.date.day} {selectedNotice.date.month}, 2025
                        </span>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 leading-tight">{selectedNotice.title}</h2>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {isAdmin && (
                    <>
                       {isEditing ? (
                         <div className="flex gap-2">
                            <button 
                              onClick={handleSaveNotice}
                              className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                              title="Save Changes"
                            >
                              <Save size={20} />
                            </button>
                            {selectedNotice.id !== 0 && (
                              <button 
                                onClick={() => setIsEditing(false)}
                                className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                                title="Cancel"
                              >
                                <X size={20} />
                              </button>
                            )}
                         </div>
                       ) : (
                         <div className="flex gap-2">
                            <button 
                              onClick={handleEditClick}
                              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                              title="Edit Notice"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={handleDeleteNotice}
                              className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                              title="Delete Notice"
                            >
                              <Trash2 size={18} />
                            </button>
                         </div>
                       )}
                       <div className="w-px h-6 bg-gray-200 mx-1"></div>
                    </>
                  )}
                  <button 
                    onClick={() => setSelectedNotice(null)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
                {isEditing ? (
                  <div className="space-y-6">
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Short Excerpt</label>
                       <textarea 
                         value={editedNotice.excerpt || ''}
                         onChange={(e) => setEditedNotice({...editedNotice, excerpt: e.target.value})}
                         className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none h-24 text-sm"
                         placeholder="Brief description for the card..."
                       />
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-gray-700 mb-2">Full Details</label>
                       <textarea 
                         value={editedNotice.details || ''}
                         onChange={(e) => setEditedNotice({...editedNotice, details: e.target.value})}
                         className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none h-64 text-base"
                         placeholder="Full content of the notice..."
                       />
                    </div>
                  </div>
                ) : (
                  <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                    {selectedNotice.details}
                  </p>
                )}

                {/* Upload Image Section - HOS RESTRICTED */}
                {!isEditing && (
                  <div className="mt-10 pt-8 border-t border-gray-100">
                    {!isAdmin ? (
                      <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-100 border-dashed transition-all duration-300">
                          {!showAdminLogin ? (
                              <button 
                                  onClick={() => setShowAdminLogin(true)}
                                  className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors text-sm font-medium"
                              >
                                  <Lock size={16} />
                                  Head of School / Admin Access
                              </button>
                          ) : (
                              <div className="flex flex-col items-center gap-3 w-full max-w-xs animate-in fade-in zoom-in duration-200">
                                  <p className="text-sm font-semibold text-gray-700 mb-1">Enter HOS Passcode</p>
                                  <input 
                                      type="password" 
                                      value={adminPassword}
                                      onChange={(e) => setAdminPassword(e.target.value)}
                                      className={`w-full px-4 py-2 rounded-lg border ${loginError ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'} focus:ring-2 focus:border-transparent outline-none text-sm transition-all`}
                                      placeholder="Passcode"
                                      autoFocus
                                  />
                                  {loginError && <p className="text-xs text-red-500 font-medium">Incorrect Passcode.</p>}
                                  <div className="flex gap-2 w-full mt-1">
                                      <Button size="sm" onClick={() => { setShowAdminLogin(false); setLoginError(false); }} variant="outline" className="flex-1 text-xs">Cancel</Button>
                                      <Button size="sm" onClick={() => handleAdminLogin('modal')} className="flex-1 text-xs">Verify</Button>
                                  </div>
                              </div>
                          )}
                      </div>
                    ) : (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-gray-900 flex items-center gap-2">
                              <ImageIcon size={20} className="text-blue-600" />
                              Upload Related Document/Image
                          </h4>
                          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md border border-green-100 flex items-center gap-1">
                              <Lock size={10} /> HOS Unlocked
                          </span>
                        </div>
                        
                        {uploadStatus === 'success' ? (
                          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center text-green-700 animate-in fade-in zoom-in duration-300">
                              <CheckCircle size={40} className="mx-auto mb-3" />
                              <p className="font-semibold">Upload Successful!</p>
                              <p className="text-sm">Your file has been submitted to the admin office.</p>
                              <button 
                              onClick={() => { setUploadStatus('idle'); setUploadFile(null); }}
                              className="mt-4 text-xs font-semibold hover:underline"
                              >
                              Upload another file
                              </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                          <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 hover:border-blue-400 transition-all duration-300 cursor-pointer group">
                              <input 
                              type="file" 
                              accept="image/*,.pdf" 
                              onChange={handleFileChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                              />
                              <div className="pointer-events-none">
                              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                  <Upload size={24} />
                              </div>
                              {uploadFile ? (
                                  <div>
                                  <p className="text-gray-900 font-medium truncate max-w-[250px] mx-auto">{uploadFile.name}</p>
                                  <p className="text-xs text-gray-500 mt-1">{(uploadFile.size / 1024).toFixed(1)} KB</p>
                                  </div>
                              ) : (
                                  <div>
                                  <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
                                  <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or PDF (max. 5MB)</p>
                                  </div>
                              )}
                              </div>
                          </div>
                          
                          <div className="flex justify-end">
                              <Button 
                              onClick={handleUpload}
                              disabled={!uploadFile || uploadStatus === 'uploading'}
                              className={`w-full sm:w-auto ${!uploadFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                              {uploadStatus === 'uploading' ? 'Uploading...' : 'Submit File'}
                              </Button>
                          </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;