import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronRight, Book, FlaskConical, Calculator, X, FileText, ArrowLeft, Layers, GraduationCap } from 'lucide-react';
import Button from '../components/ui/Button';

interface SyllabusModule {
  title: string;
  topics: string[];
}

interface SampleResource {
  title: string;
  type: string;
  size: string;
}

interface GradeSyllabus {
  label: string;
  modules: SyllabusModule[];
  samples: SampleResource[];
}

interface Subject {
  name: string;
  desc: string;
  color: string;
  details?: string;
  images?: string[];
  syllabus?: GradeSyllabus[];
}

const subjects: Subject[] = [
  { 
    name: 'Sciences', 
    desc: 'Physics, Chemistry, Biology with modern labs.', 
    color: 'bg-blue-50',
    details: 'Our Science stream offers a comprehensive journey into the world of empirical evidence and innovation. We provide a rigorous foundation in Physics, Chemistry, and Biology, supported by state-of-the-art laboratories where students conduct advanced experiments. The curriculum is tailored to develop analytical thinking and problem-solving skills, serving as an excellent launchpad for careers in Medicine, Engineering, Research, and Astrophysics.',
    images: [
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop'
    ],
    syllabus: [
      {
        label: 'Class IX',
        modules: [
          { title: 'Matter - Nature & Behaviour', topics: ['States of Matter', 'Atoms & Molecules', 'Structure of Atom'] },
          { title: 'The Living World', topics: ['Cell - Basic Unit of Life', 'Tissues', 'Diversity in Living Organisms'] },
          { title: 'Motion, Force & Work', topics: ['Laws of Motion', 'Gravitation', 'Work and Energy', 'Sound'] }
        ],
        samples: [
          { title: 'Class 9 Science Lab Manual', type: 'PDF', size: '2.4 MB' },
          { title: 'Mid-Term Question Paper', type: 'PDF', size: '1.1 MB' }
        ]
      },
      {
        label: 'Class X',
        modules: [
          { title: 'Chemical Substances', topics: ['Chemical Reactions', 'Acids, Bases & Salts', 'Metals & Non-Metals', 'Carbon Compounds'] },
          { title: 'World of Living', topics: ['Life Processes', 'Control & Coordination', 'Reproduction', 'Heredity'] },
          { title: 'Natural Phenomena', topics: ['Light - Reflection & Refraction', 'Human Eye', 'Electricity', 'Magnetic Effects'] }
        ],
        samples: [
          { title: 'Class 10 Board Sample Paper', type: 'PDF', size: '3.1 MB' },
          { title: 'Science Practical Guide', type: 'PDF', size: '1.8 MB' }
        ]
      },
      {
        label: 'Class XI',
        modules: [
          { title: 'Physics', topics: ['Kinematics', 'Laws of Motion', 'Thermodynamics', 'Gravitation', 'Solids & Fluids'] },
          { title: 'Chemistry', topics: ['Structure of Atom', 'Chemical Bonding', 'Thermodynamics', 'Redox Reactions', 'Organic Chemistry Basics'] },
          { title: 'Biology', topics: ['Biological Classification', 'Plant Kingdom', 'Animal Kingdom', 'Cell Cycle', 'Plant Physiology'] }
        ],
        samples: [
          { title: 'Physics Numerical Problem Set', type: 'PDF', size: '2.5 MB' },
          { title: 'Chemistry Lab Manual XI', type: 'PDF', size: '3.0 MB' }
        ]
      },
      {
        label: 'Class XII',
        modules: [
          { title: 'Physics', topics: ['Electrostatics', 'Current Electricity', 'Magnetism', 'Optics', 'Dual Nature of Matter'] },
          { title: 'Chemistry', topics: ['Solutions', 'Electrochemistry', 'Chemical Kinetics', 'd- and f-Block Elements', 'Coordination Compounds'] },
          { title: 'Biology', topics: ['Reproduction', 'Genetics & Evolution', 'Biotechnology', 'Ecology & Environment'] }
        ],
        samples: [
          { title: 'Class 12 Previous Year Papers', type: 'ZIP', size: '15 MB' },
          { title: 'Investigatory Project Ideas', type: 'DOCX', size: '1.2 MB' }
        ]
      }
    ]
  },
  { 
    name: 'Mathematics', 
    desc: 'Advanced problem solving and analytical thinking.', 
    color: 'bg-green-50',
    details: 'Mathematics at CM SHRI School goes beyond formulas. We focus on developing logical reasoning and analytical capabilities through Algebra, Geometry, Calculus, and Statistics. Our approach encourages students to see patterns in the world around them, preparing them for fields like Data Science, Economics, Architecture, and Pure Mathematics.',
    images: [
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=800&auto=format&fit=crop'
    ],
    syllabus: [
      {
        label: 'Class IX',
        modules: [
          { title: 'Number Systems', topics: ['Irrational Numbers', 'Real Numbers', 'Exponents'] },
          { title: 'Algebra', topics: ['Polynomials', 'Linear Equations in Two Variables'] },
          { title: 'Geometry', topics: ['Lines and Angles', 'Triangles', 'Quadrilaterals', 'Circles'] }
        ],
        samples: [
          { title: 'Maths Worksheet IX', type: 'PDF', size: '1.2 MB' }
        ]
      },
      {
        label: 'Class X',
        modules: [
          { title: 'Number Systems', topics: ['Real Numbers', 'Euclid’s Division Lemma'] },
          { title: 'Algebra', topics: ['Polynomials', 'Pair of Linear Equations', 'Quadratic Equations', 'Arithmetic Progressions'] },
          { title: 'Trigonometry', topics: ['Introduction to Trigonometry', 'Trigonometric Identities', 'Heights and Distances'] }
        ],
        samples: [
          { title: 'Standard Math Sample Paper', type: 'PDF', size: '2.8 MB' },
          { title: 'Basic Math Sample Paper', type: 'PDF', size: '2.5 MB' }
        ]
      },
      {
        label: 'Class XI',
        modules: [
          { title: 'Sets and Functions', topics: ['Sets', 'Relations & Functions', 'Trigonometric Functions'] },
          { title: 'Algebra', topics: ['Complex Numbers', 'Permutations & Combinations', 'Binomial Theorem', 'Sequence & Series'] },
          { title: 'Calculus', topics: ['Limits and Derivatives'] }
        ],
        samples: [
          { title: 'Class XI Math Exemplar', type: 'PDF', size: '4.1 MB' }
        ]
      },
      {
        label: 'Class XII',
        modules: [
          { title: 'Relations and Functions', topics: ['Types of Relations', 'Inverse Trigonometric Functions'] },
          { title: 'Calculus', topics: ['Continuity & Differentiability', 'Applications of Derivatives', 'Integrals', 'Differential Equations'] },
          { title: 'Vectors & 3D', topics: ['Vectors', 'Three Dimensional Geometry', 'Linear Programming', 'Probability'] }
        ],
        samples: [
          { title: 'Calculus Revision Notes', type: 'PDF', size: '1.5 MB' },
          { title: 'Mock Test Series 2024', type: 'PDF', size: '3.5 MB' }
        ]
      }
    ]
  },
  { 
    name: 'Humanities', 
    desc: 'History, Geography, and Political Science.', 
    color: 'bg-orange-50',
    details: 'The Humanities stream explores the complexities of human society, culture, and history. Through History, Political Science, Geography, and Psychology, students cultivate critical thinking, empathy, and a global perspective. This stream is ideal for aspiring civil servants, lawyers, journalists, and policy makers.',
    images: [
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551817958-c1b011403db7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555449372-b91c70fb9054?q=80&w=800&auto=format&fit=crop'
    ],
    syllabus: [
      {
        label: 'Class IX',
        modules: [
          { title: 'History', topics: ['French Revolution', 'Socialism in Europe', 'Nazism'] },
          { title: 'Geography', topics: ['India - Size and Location', 'Physical Features of India', 'Drainage', 'Climate'] },
          { title: 'Pol. Science', topics: ['What is Democracy?', 'Constitutional Design', 'Electoral Politics'] }
        ],
        samples: [{ title: 'Map Work Practice', type: 'PDF', size: '5.0 MB' }]
      },
      {
        label: 'Class X',
        modules: [
          { title: 'History', topics: ['Rise of Nationalism in Europe', 'Nationalism in India', 'Making of a Global World'] },
          { title: 'Geography', topics: ['Resources and Development', 'Water Resources', 'Agriculture', 'Manufacturing Industries'] },
          { title: 'Pol. Science', topics: ['Power Sharing', 'Federalism', 'Gender, Religion and Caste', 'Political Parties'] }
        ],
        samples: [{ title: 'Social Science Sample Paper', type: 'PDF', size: '2.2 MB' }]
      },
      {
        label: 'Class XI',
        modules: [
          { title: 'History', topics: ['Writing and City Life', 'An Empire Across Three Continents', 'Nomadic Empires'] },
          { title: 'Political Science', topics: ['Constitution at Work', 'Political Theory', 'Rights', 'Citizenship'] },
          { title: 'Psychology', topics: ['What is Psychology?', 'Methods of Enquiry', 'Human Development'] }
        ],
        samples: [{ title: 'Political Theory Notes', type: 'DOCX', size: '1.2 MB' }]
      },
      {
        label: 'Class XII',
        modules: [
          { title: 'History', topics: ['Bricks, Beads and Bones', 'Kings, Farmers and Towns', 'Kinship, Caste and Class', 'Rebels and the Raj'] },
          { title: 'Political Science', topics: ['End of Bipolarity', 'New Centres of Power', 'South Asia and the Contemporary World'] },
          { title: 'Psychology', topics: ['Variations in Psychological Attributes', 'Self and Personality', 'Psychological Disorders'] }
        ],
        samples: [{ title: 'Case Study Collection', type: 'PDF', size: '2.1 MB' }]
      }
    ]
  },
  { 
    name: 'The Arts', 
    desc: 'Fine arts, music, and dramatic expression.', 
    color: 'bg-purple-50',
    details: 'We believe creativity is intelligence having fun. Our Arts program covers visual arts, music, dance, and theatre. Students are encouraged to express themselves freely, mastering techniques while finding their unique voice. This holistic approach supports emotional development and fosters appreciation for aesthetics and culture.',
    images: [
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507838153414-b4b713384ebd?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop'
    ],
    syllabus: [
      {
        label: 'Middle School',
        modules: [
           { title: 'Visual Arts', topics: ['Color Theory', 'Perspective Drawing', 'Watercolor Basics'] },
           { title: 'Performing Arts', topics: ['Introduction to Rhythm', 'Folk Dance Basics', 'Roleplay and Skits'] }
        ],
        samples: [{ title: 'Art Project Themes', type: 'PDF', size: '1.5 MB' }]
      },
      {
        label: 'Secondary',
        modules: [
           { title: 'Visual Arts', topics: ['Canvas Painting', 'Portrait Study', 'Indian Folk Art'] },
           { title: 'Music', topics: ['Raag Bhairav', 'Taal System', 'Group Singing'] }
        ],
        samples: [{ title: 'Music Theory Notes', type: 'PDF', size: '800 KB' }]
      },
      {
        label: 'Senior Secondary',
        modules: [
           { title: 'Fine Arts', topics: ['Rajasthani & Pahari Schools of Painting', 'Mughal & Deccan Schools', 'Modern Indian Art'] },
           { title: 'Sculpture', topics: ['Clay Modeling', 'Study of Famous Sculptures', '3D Composition'] }
        ],
        samples: [{ title: 'Fine Arts Portfolio Guidelines', type: 'PDF', size: '4.2 MB' }]
      }
    ]
  },
  { 
    name: 'Technology', 
    desc: 'Coding, Robotics, and AI fundamentals.', 
    color: 'bg-gray-100',
    details: 'In an increasingly digital world, our Technology stream equips students with essential skills for the future. From the basics of coding and algorithm design to advanced Robotics and Artificial Intelligence, students get hands-on experience in our tech labs, fostering innovation and computational thinking.',
    images: [
      'https://images.unsplash.com/photo-1531297461136-2f566066be5b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop'
    ],
    syllabus: [
      {
        label: 'Class IX-X',
        modules: [
          { title: 'Computer Applications', topics: ['Basics of Information Technology', 'Cyber Safety', 'Office Tools', 'Scratch/Python Basics'] },
          { title: 'Artificial Intelligence', topics: ['Introduction to AI', 'AI Project Cycle', 'Neural Networks Basics', 'Python for AI'] }
        ],
        samples: [{ title: 'Python Programs for Beginners', type: 'ZIP', size: '500 KB' }]
      },
      {
        label: 'Class XI',
        modules: [
          { title: 'Computer Science', topics: ['Computer Systems and Organisation', 'Computational Thinking and Programming - 1', 'Society, Law and Ethics'] },
          { title: 'Informatics Practices', topics: ['Introduction to Computer System', 'Introduction to Python', 'Data Handling using NumPy'] }
        ],
        samples: [{ title: 'CS Practical Manual XI', type: 'PDF', size: '2.1 MB' }]
      },
      {
        label: 'Class XII',
        modules: [
          { title: 'Computer Science', topics: ['Computational Thinking and Programming - 2', 'Computer Networks', 'Database Management (SQL)'] },
          { title: 'Robotics', topics: ['Microcontrollers', 'Sensor Interfacing', 'Automated Line Follower', 'Wireless Communication'] }
        ],
        samples: [{ title: 'SQL Queries Question Bank', type: 'PDF', size: '1.3 MB' }]
      }
    ]
  },
  { 
    name: 'Languages', 
    desc: 'English, Hindi, and foreign languages.', 
    color: 'bg-red-50',
    details: 'Language is the key to communication. Our curriculum emphasizes mastery of English and Hindi, along with options for foreign languages like French. We focus on literature, creative writing, and oral communication to build articulate, confident speakers and writers who can connect across cultures.',
    images: [
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1471970471555-19d4b113e9ed?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop'
    ],
    syllabus: [
      {
        label: 'Class IX',
        modules: [
          { title: 'English', topics: ['Reading Skills', 'Writing & Grammar', 'Literature Textbooks (Beehive, Moments)'] },
          { title: 'Hindi', topics: ['Sparsh', 'Sanchayan', 'Vyakaran', 'Rachana'] },
          { title: 'French', topics: ['Comprehension', 'Written Expression', 'Grammar', 'Culture & Civilization'] }
        ],
        samples: [{ title: 'English Language Practice Papers', type: 'PDF', size: '1.9 MB' }]
      },
      {
        label: 'Class X',
        modules: [
          { title: 'English', topics: ['Discursive Passages', 'Formal Letters', 'Analytical Paragraphs', 'First Flight', 'Footprints Without Feet'] },
          { title: 'Hindi', topics: ['Padbandh', 'Vakya Roopantaran', 'Samas', 'Muhavare'] }
        ],
        samples: [{ title: 'Class X English Sample Paper', type: 'PDF', size: '2.0 MB' }]
      },
      {
        label: 'Class XI-XII',
        modules: [
          { title: 'English Core', topics: ['Advanced Reading Skills', 'Creative Writing Skills', 'Literature (Flamingo, Vistas)'] },
          { title: 'Elective English', topics: ['Short Stories', 'Poetry', 'Non-Fiction', 'Drama'] }
        ],
        samples: [{ title: 'Creative Writing Prompts', type: 'PDF', size: '800 KB' }]
      }
    ]
  }
];

const curriculumLevels = [
  {
    id: 'middle',
    grade: 'Middle School (VI - VIII)',
    focus: 'Foundational Strength & Discovery',
    description: 'Transitioning from primary to secondary, the focus shifts to experiential learning and critical thinking. We encourage curiosity through project-based tasks.',
    subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Third Language (French/Sanskrit)', 'Computer Science'],
    objectives: [
      'Developing inquiry-based learning habits.',
      'Strengthening core concepts in Mathematics and Sciences.',
      'Introduction to coding and digital literacy.'
    ]
  },
  {
    id: 'secondary',
    grade: 'Secondary School (IX - X)',
    focus: 'Academic Rigor & Core Competencies',
    description: 'A crucial phase preparing students for board examinations. The curriculum becomes more structured, emphasizing deep understanding and application of knowledge.',
    subjects: ['Mathematics', 'Science (Phy, Chem, Bio)', 'Social Science (Hist, Geog, Pol Sci, Eco)', 'English', 'Second Language'],
    objectives: [
      'Preparation for CBSE Board Examinations.',
      'Rigorous lab work to understand scientific principles.',
      'Holistic development through social awareness projects.'
    ]
  },
  {
    id: 'senior',
    grade: 'Senior Secondary (XI - XII)',
    focus: 'Specialization & Career Readiness',
    description: 'Students choose specialized streams to align with their career aspirations. The approach is research-oriented, preparing them for higher education and competitive exams.',
    streams: [
      { name: 'Science', subjects: 'Physics, Chemistry, Math/Bio, CS/PE, English' },
      { name: 'Commerce', subjects: 'Accountancy, Business Studies, Economics, Math/IP, English' },
      { name: 'Humanities', subjects: 'History, Pol. Sci, Psychology, Economics, English' }
    ],
    objectives: [
      'Advanced conceptual understanding and analytical skills.',
      'Targeted preparation for JEE, NEET, CUET, and other entrance exams.',
      'Leadership roles and career counseling.'
    ]
  }
];

const Academics: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [viewSyllabus, setViewSyllabus] = useState(false);
  const [activeGrade, setActiveGrade] = useState<string>("");

  const openModal = (sub: Subject) => {
    setSelectedSubject(sub);
    setViewSyllabus(false);
    setActiveGrade("");
  };

  const closeModal = () => {
    setSelectedSubject(null);
    setViewSyllabus(false);
    setActiveGrade("");
  };

  const handleExploreSyllabus = () => {
    setViewSyllabus(true);
    if (selectedSubject?.syllabus && selectedSubject.syllabus.length > 0) {
      setActiveGrade(selectedSubject.syllabus[0].label);
    }
  };

  // Helper to get current syllabus content based on active grade
  const currentSyllabus = selectedSubject?.syllabus?.find(s => s.label === activeGrade);

  return (
    <div className="pt-20 pb-20 bg-white">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 mt-10 tracking-tight"
        >
          Academic Excellence
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Our curriculum is designed to challenge and inspire. We follow the CBSE board with an integrated approach to global learning standards, nurturing intellect and character.
        </motion.p>
      </div>

      {/* Subjects Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
        {subjects.map((sub, idx) => (
          <motion.div
            key={idx}
            onClick={() => sub.details ? openModal(sub) : null}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`p-8 rounded-3xl ${sub.color} border border-transparent hover:border-gray-200 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden group ${sub.details ? 'cursor-pointer' : ''}`}
          >
            <h3 className="text-2xl font-bold mb-3 tracking-tight">{sub.name}</h3>
            <p className="text-gray-600 font-medium relative z-10">{sub.desc}</p>
            
            {sub.details && (
              <motion.div 
                className="mt-6 flex items-center text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-4 group-hover:translate-x-0"
              >
                Learn More <ChevronRight size={16} className="ml-1" />
              </motion.div>
            )}
            
            {/* Visual hint for interactable cards */}
            {sub.details && (
               <div className="absolute top-4 right-4 text-gray-300 group-hover:text-blue-500 transition-colors">
                 <ChevronRight size={20} />
               </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Subject Detail Modal */}
      <AnimatePresence>
        {selectedSubject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2rem] w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col"
            >
              <button 
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-30"
              >
                <X size={20} />
              </button>

              <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {!viewSyllabus ? (
                    // OVERVIEW VIEW
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col h-full"
                    >
                      <div className="p-8 md:p-12 pb-6">
                        <span className="text-blue-600 font-bold uppercase tracking-wider text-xs mb-2 block">Stream Focus</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">{selectedSubject.name}</h2>
                        <p className="text-xl text-gray-500 leading-relaxed font-light mb-10 max-w-3xl">
                          {selectedSubject.details}
                        </p>
                      </div>

                      {selectedSubject.images && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 h-[300px] md:h-[400px] w-full">
                          {selectedSubject.images.map((img, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 + idx * 0.1 }}
                              className="relative h-full overflow-hidden group"
                            >
                              <img 
                                src={img} 
                                alt={`${selectedSubject.name} highlight ${idx + 1}`} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                          ))}
                        </div>
                      )}
                      
                      <div className="p-8 md:p-12 bg-gray-50 mt-auto">
                         <div className="flex flex-wrap gap-4">
                           <Button onClick={handleExploreSyllabus}>Explore Syllabus & Samples</Button>
                           <Button variant="outline" onClick={closeModal}>Close View</Button>
                         </div>
                      </div>
                    </motion.div>
                  ) : (
                    // SYLLABUS VIEW
                    <motion.div
                      key="syllabus"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col h-full"
                    >
                      {/* Header */}
                      <div className="p-8 pb-4 border-b border-gray-100 bg-white sticky top-0 z-20">
                        <div className="flex items-center mb-6">
                           <button 
                             onClick={() => setViewSyllabus(false)}
                             className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors group"
                           >
                             <ArrowLeft size={24} className="text-gray-500 group-hover:text-black" />
                           </button>
                           <div>
                             <span className="text-blue-600 font-bold uppercase tracking-wider text-xs mb-1 block">Curriculum</span>
                             <h2 className="text-3xl font-bold text-gray-900">{selectedSubject.name} Syllabus</h2>
                           </div>
                        </div>

                        {/* Class Selector Tabs */}
                        {selectedSubject.syllabus && selectedSubject.syllabus.length > 0 && (
                          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                            {selectedSubject.syllabus.map((grade) => (
                              <button
                                key={grade.label}
                                onClick={() => setActiveGrade(grade.label)}
                                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                                  activeGrade === grade.label
                                    ? 'bg-black text-white shadow-lg scale-105'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {grade.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
                        {currentSyllabus ? (
                          <motion.div
                            key={activeGrade}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-10"
                          >
                            {/* Left: Modules */}
                            <div className="lg:col-span-2 space-y-6">
                              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
                                <Layers size={20} className="text-blue-600" /> 
                                {activeGrade} Curriculum Modules
                              </h3>
                              {currentSyllabus.modules.map((mod, idx) => (
                                <motion.div 
                                  key={idx}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                                >
                                  <h4 className="font-bold text-lg mb-3 text-gray-900">{mod.title}</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {mod.topics.map((topic, tIdx) => (
                                      <span key={tIdx} className="px-3 py-1 bg-gray-50 rounded-md text-sm text-gray-600 border border-gray-200">
                                        {topic}
                                      </span>
                                    ))}
                                  </div>
                                </motion.div>
                              ))}
                            </div>

                            {/* Right: Samples */}
                            <div className="lg:col-span-1">
                              <div className="sticky top-4">
                                <h3 className="text-xl font-semibold flex items-center gap-2 mb-6 text-gray-800">
                                  <FileText size={20} className="text-blue-600" /> 
                                  Sample Resources
                                </h3>
                                <div className="space-y-4">
                                  {currentSyllabus.samples.map((sample, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.3 + idx * 0.1 }}
                                      className="group bg-blue-50 hover:bg-blue-600 p-5 rounded-2xl transition-all duration-300 cursor-pointer border border-blue-100 hover:border-blue-600"
                                    >
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <p className="font-bold text-gray-900 group-hover:text-white transition-colors">{sample.title}</p>
                                          <p className="text-xs text-gray-500 mt-1 uppercase font-semibold group-hover:text-blue-100">{sample.type} • {sample.size}</p>
                                        </div>
                                        <div className="bg-white p-2 rounded-full text-blue-600 group-hover:scale-110 transition-transform shadow-sm">
                                          <Download size={16} />
                                        </div>
                                      </div>
                                    </motion.div>
                                  ))}
                                  {(!currentSyllabus.samples || currentSyllabus.samples.length === 0) && (
                                    <p className="text-gray-400 italic text-sm">No sample papers available for this class yet.</p>
                                  )}
                                </div>
                                
                                <div className="mt-8 p-6 bg-gray-900 rounded-2xl text-white text-center shadow-xl">
                                  <GraduationCap className="mx-auto mb-3 text-blue-400" size={32} />
                                  <p className="font-semibold mb-2">Need Guidance?</p>
                                  <p className="text-sm text-gray-400 mb-4">Schedule a one-on-one session with our academic counselors.</p>
                                  <Button size="sm" className="bg-white text-black hover:bg-gray-200 w-full">Book Session</Button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <Layers size={48} className="mb-4 opacity-20" />
                            <p>Select a class to view the syllabus.</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detailed Curriculum Section (6-12) */}
      <section className="bg-[#f5f5f7] py-24 rounded-[3rem] mx-4 mb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-black">Curriculum Overview</h2>
            <p className="text-gray-500 text-lg">Comprehensive learning pathways for Grades 6 to 12</p>
          </div>

          <div className="space-y-12">
            {curriculumLevels.map((level, index) => (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100/50 hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
                  
                  {/* Left Column: Title & Desc */}
                  <div className="lg:w-1/3">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-wider uppercase mb-4">
                      {level.id === 'middle' ? 'Phase 1' : level.id === 'secondary' ? 'Phase 2' : 'Phase 3'}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{level.grade}</h3>
                    <p className="text-lg font-medium text-gray-400 mb-4">{level.focus}</p>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {level.description}
                    </p>
                  </div>

                  {/* Right Column: Details */}
                  <div className="lg:w-2/3 bg-gray-50 rounded-2xl p-6 md:p-8">
                    {/* Specific handling for streams in Senior Secondary */}
                    {level.streams ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {level.streams.map((stream, sIdx) => (
                          <div key={sIdx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">{stream.name}</h4>
                            <p className="text-xs text-gray-500 leading-snug">{stream.subjects}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Book size={18} className="mr-2" /> Key Subjects
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {level.subjects?.map((subj, sIdx) => (
                            <span key={sIdx} className="bg-white px-3 py-1 rounded-md text-sm text-gray-600 border border-gray-200 shadow-sm">
                              {subj}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <ChevronRight size={18} className="mr-2" /> Learning Objectives
                      </h4>
                      <ul className="space-y-2">
                        {level.objectives.map((obj, oIdx) => (
                          <li key={oIdx} className="flex items-start text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Download Button */}
          <div className="mt-16 text-center">
             <motion.div
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="inline-block"
             >
                <Button 
                  size="lg" 
                  className="bg-black text-white px-8 py-4 rounded-full flex items-center gap-3 text-lg shadow-xl hover:bg-gray-800"
                >
                  <Download size={20} />
                  Download Complete Syllabus (PDF)
                </Button>
             </motion.div>
             <p className="mt-4 text-sm text-gray-400">Updated for Academic Session 2024-25</p>
          </div>
        </div>
      </section>

      {/* Beyond Classroom (Footer-ish area) */}
      <div className="mt-20 bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-10 md:mb-0 max-w-md">
             <h2 className="text-4xl font-bold mb-4">Beyond the Classroom</h2>
             <p className="text-gray-400 text-lg font-light leading-relaxed">
               Education involves more than just books. Our clubs, societies, and sports teams help build character and leadership.
             </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
             {[
               { name: 'Robotics', icon: Calculator }, 
               { name: 'Debate', icon: Book }, 
               { name: 'Science Club', icon: FlaskConical }, 
               { name: 'Theatre', icon: ChevronRight }
             ].map((activity) => (
               <div key={activity.name} className="flex flex-col items-center group cursor-pointer">
                 <div className="w-20 h-20 bg-gray-800 rounded-2xl mb-4 flex items-center justify-center text-gray-300 group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-2xl">
                    <activity.icon size={32} />
                 </div>
                 <span className="text-base font-medium text-gray-300 group-hover:text-white transition-colors">{activity.name}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academics;