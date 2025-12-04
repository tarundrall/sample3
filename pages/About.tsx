import React, { useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { Building2, Microscope, Trophy, BookOpen, ShieldCheck, LayoutDashboard, TrendingUp } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, OrbitControls } from '@react-three/drei';
import SchoolBuilding from '../components/3d/SchoolBuilding';

const highlights = [
  {
    icon: Building2,
    title: "Infrastructure",
    description: "State-of-the-art campus in Punjabi Bagh featuring smart classrooms, centralized air-conditioning, and ergonomic learning spaces designed for comfort and focus."
  },
  {
    icon: Microscope,
    title: "Advanced Labs",
    description: "Cutting-edge Physics, Chemistry, Biology, and Robotics laboratories equipped with the latest apparatus to foster scientific temper and innovation."
  },
  {
    icon: Trophy,
    title: "Sports Excellence",
    description: "Expansive playgrounds and specialized coaching for Cricket, Football, Basketball, and Lawn Tennis to nurture physical fitness and team spirit."
  },
  {
    icon: BookOpen,
    title: "Modern Library",
    description: "A vast resource center with over 15,000 books, digital archives, and quiet reading zones to cultivate a lifelong love for reading and research."
  },
  {
    icon: ShieldCheck,
    title: "Discipline",
    description: "We pride ourselves on instilling strong moral values, punctuality, and self-discipline, creating responsible citizens of tomorrow."
  },
  {
    icon: LayoutDashboard,
    title: "Digital Campus",
    description: "Fully integrated ERP systems for parents, high-speed Wi-Fi, and digital security surveillance ensuring a connected and safe environment."
  }
];

const facultyMembers = [
  {
    name: "Dr. Ananya Roy",
    role: "Principal",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    bio: "Education is the kindling of a flame, not the filling of a vessel."
  },
  {
    name: "Mr. Rajesh Malhotra",
    role: "Vice Principal",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    bio: "Discipline and dedication are the cornerstones of success."
  },
  {
    name: "Mrs. Sunita Kapoor",
    role: "Head of Sciences",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    bio: "Fostering scientific temper and curiosity in every young mind."
  },
  {
    name: "Mr. Vikram Oberoi",
    role: "Head of Sports",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=800&auto=format&fit=crop",
    bio: "Building character and resilience through the spirit of sportsmanship."
  }
];

const enrollmentData = [
  { year: '2020', students: 1240 },
  { year: '2021', students: 1380 },
  { year: '2022', students: 1550 },
  { year: '2023', students: 1720 },
  { year: '2024', students: 1890 },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Reusable Particle Background Component
const ParticleBackground = ({ colorClass = "bg-white" }: { colorClass?: string }) => {
  const particles = React.useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      moveX: Math.random() * 40 - 20,
      moveY: Math.random() * 40 - 20,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${colorClass}`}
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0,
          }}
          animate={{
            x: [0, p.moveX, 0],
            y: [0, p.moveY, 0],
            opacity: [0, 0.4, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const About: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"]
  });

  // Create a pronounced parallax effect mapped to scroll
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const parallaxYReverse = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  
  const maxEnrollment = 2000;

  return (
    <div className="pt-20 bg-white selection:bg-black selection:text-white">
      
      {/* Hero / History Section with 3D Model */}
      <section className="py-12 md:py-24 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1"
            >
                <span className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-4 block">About Us</span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-black mb-8 tracking-tighter">
                  Our Legacy.
                </h1>
                <p className="text-xl text-gray-500 leading-relaxed font-light mb-8">
                  Established in the heart of <span className="text-black font-medium">Punjabi Bagh</span>, CM SHRI SCHOOL has been a pioneer in education for over three decades. From humble beginnings to a premier institution, our journey is defined by an unwavering commitment to excellence and the holistic development of every child.
                </p>
                <div className="w-24 h-1 bg-black rounded-full"></div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="order-1 lg:order-2 h-[400px] lg:h-[500px] w-full bg-[#f5f5f7] rounded-[2.5rem] overflow-hidden relative shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] border border-gray-100"
            >
                <Canvas camera={{ position: [0, 5, 12], fov: 40 }} className="z-10">
                    <ambientLight intensity={0.6} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />
                    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                       <SchoolBuilding />
                    </Float>
                    <Environment preset="city" />
                    <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 3} />
                </Canvas>
                
                <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Interactive Campus Model</p>
                </div>
            </motion.div>
        </div>

        {/* Vision & Mission */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {/* Vision Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, rotateX: 2, rotateY: 2, scale: 1.01 }}
            style={{ perspective: "1000px" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative p-12 rounded-[2.5rem] overflow-hidden group h-full min-h-[500px] shadow-2xl shadow-gray-200/50 transform-gpu bg-white"
          >
            {/* Parallax Background Container */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem]">
               <motion.div 
                 style={{ y: parallaxY, height: "140%", top: "-20%" }} 
                 className="absolute w-full"
               >
                 <img 
                   src="https://images.unsplash.com/photo-1497250681960-ef048c0ab947?q=80&w=2070&auto=format&fit=crop" 
                   alt="Abstract Vision" 
                   className="w-full h-full object-cover opacity-10 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                 />
               </motion.div>
            </div>

            {/* Particle Effect */}
            <ParticleBackground colorClass="bg-blue-400" />

            <div className="relative z-10 pointer-events-none">
              <h3 className="text-3xl font-bold mb-4 text-black">Our Vision</h3>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                To be a global center of learning that nurtures intellectual curiosity and ethical leadership, preparing students not just for careers, but for life. We envision a community of thinkers who innovate and lead with compassion.
              </p>
            </div>
            {/* Subtle decorative element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gray-200 rounded-full blur-3xl opacity-50 group-hover:bg-blue-200 transition-colors duration-700 z-10"></div>
          </motion.div>

          {/* Mission Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, rotateX: -2, rotateY: 2, scale: 1.01 }}
            style={{ perspective: "1000px" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative p-12 rounded-[2.5rem] overflow-hidden group h-full min-h-[500px] text-white shadow-2xl shadow-black/20 transform-gpu bg-black"
          >
            {/* Parallax Background Container */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[2.5rem]">
               <motion.div 
                 style={{ y: parallaxYReverse, height: "140%", top: "-20%" }} 
                 className="absolute w-full"
               >
                 <img 
                   src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                   alt="Abstract Mission" 
                   className="w-full h-full object-cover opacity-40 mix-blend-screen group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                 />
               </motion.div>
            </div>

            {/* Particle Effect */}
            <ParticleBackground colorClass="bg-white" />

            {/* Content */}
            <div className="relative z-10 pointer-events-none">
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg text-gray-300 leading-relaxed font-medium">
                To provide a safe, inclusive, and stimulating environment where every child is encouraged to explore their potential. We blend academic rigor with rich extracurriculars to forge character, discipline, and success.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-700 z-10"></div>
          </motion.div>
        </div>

        {/* Life at CM SHRI SCHOOL Section - 3D Image */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-4xl md:text-5xl font-semibold text-black mb-6 tracking-tight">A Vibrant Community.</h2>
              <p className="text-xl text-gray-500 mb-6 leading-relaxed font-light">
                Life at CM SHRI SCHOOL PUNJABI BAGH extends far beyond textbooks. Our campus is a thriving ecosystem of art, culture, sports, and innovation. We believe in nurturing the unique talents of every student.
              </p>
              <p className="text-xl text-gray-500 leading-relaxed font-light">
                From our annual sports day to science exhibitions, every event is a celebration of student potential and spirit.
              </p>
            </motion.div>
            
            <motion.div 
              className="order-1 lg:order-2 perspective-[1500px] group" 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                whileHover={{ 
                  rotateY: -12, 
                  rotateX: 5, 
                  scale: 1.05,
                  boxShadow: "-30px 30px 60px -15px rgba(0,0,0,0.3)"
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative rounded-[2rem] overflow-hidden shadow-2xl transform-gpu cursor-pointer bg-gray-100"
                style={{ transformStyle: "preserve-3d" }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop" 
                  alt="Campus Life" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none opacity-80" />
                <motion.div 
                  className="absolute bottom-8 left-8 text-white pointer-events-none"
                  initial={{ z: 0 }}
                  whileHover={{ z: 30 }}
                  style={{ transform: "translateZ(30px)" }}
                >
                  <p className="font-semibold text-lg tracking-wide">Campus Life</p>
                  <p className="text-sm text-white/80">Experience the energy</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </section>

      {/* Highlights Grid */}
      <section className="bg-[#fbfbfd] py-32 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-semibold text-black tracking-tight mb-6">World-Class Facilities</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Designed to inspire. Our campus provides the perfect ecosystem for learning, creativity, and growth.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {highlights.map((item, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 1)", boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}
                className="bg-white p-8 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-gray-100/50 flex flex-col h-full transition-all duration-300"
              >
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                  <item.icon size={24} strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed flex-grow">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-32 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-black mb-6 tracking-tight">Mentors & Guides</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Meet the dedicated educators who inspire excellence and shape the future of our students.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {facultyMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col items-center text-center"
              >
                <div className="w-full aspect-[3/4] overflow-hidden rounded-2xl mb-8 relative shadow-lg">
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500 mix-blend-multiply z-10"></div>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1 tracking-tight">{member.name}</h3>
                <p className="text-blue-600 font-semibold text-sm mb-4 uppercase tracking-wide">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed italic opacity-80 px-4">
                  "{member.bio}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Stats Section */}
      <section className="py-32 bg-[#fbfbfd] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-black mb-6 tracking-tight flex items-center justify-center gap-3">
              <TrendingUp size={40} className="text-blue-600" /> Growing Trust
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Our consistent growth reflects the trust parents place in our educational philosophy and the results we deliver year after year.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto bg-white p-8 md:p-16 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100/50">
             <div className="flex items-end justify-between h-80 gap-3 md:gap-8 px-2">
                {enrollmentData.map((data, idx) => (
                    <div key={idx} className="flex flex-col items-center w-full group relative">
                        {/* Tooltip-style number above bar */}
                        <div className="mb-4 text-sm md:text-lg font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 absolute -top-10">
                            {data.students}
                        </div>
                        
                        {/* Bar */}
                        <motion.div
                           initial={{ height: 0 }}
                           whileInView={{ height: `${(data.students / maxEnrollment) * 100}%` }}
                           viewport={{ once: true }}
                           transition={{ duration: 1.2, delay: idx * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                           className="w-full max-w-[80px] bg-gray-100 rounded-t-2xl rounded-b-lg relative overflow-hidden cursor-pointer shadow-inner"
                        >
                            {/* Gradient Overlay for 3D effect */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 1 + idx * 0.1 }}
                                className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-50 opacity-0 group-hover:opacity-0 transition-opacity"
                            />
                            
                            {/* Active State Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-800 to-gray-600 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Shine effect */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                        </motion.div>
                        
                        {/* Year Label */}
                        <div className="mt-6 text-gray-400 font-medium text-xs md:text-sm group-hover:text-black transition-colors duration-300">{data.year}</div>
                    </div>
                ))}
             </div>
             <div className="mt-16 text-center border-t border-gray-100 pt-8">
                <p className="text-xs md:text-sm text-gray-400 uppercase tracking-widest font-semibold">Total Students Enrolled per Year</p>
             </div>
          </div>
        </div>
      </section>

      {/* Footer Quote */}
      <section className="py-24 bg-white text-center px-4">
        <div className="max-w-4xl mx-auto">
          <blockquote className="text-3xl md:text-4xl font-semibold leading-tight text-gray-900 mb-8">
            "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
          </blockquote>
          <p className="text-gray-500 font-medium tracking-wide uppercase text-sm">Malcolm X</p>
        </div>
      </section>
      
    </div>
  );
};

export default About;