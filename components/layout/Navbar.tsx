import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Bell, Info, AlertCircle, CheckCircle, Clock, Lock, Plus, Send, Trash2, LogOut, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'alert' | 'info' | 'success';
  read: boolean;
}

const notificationsData: Notification[] = [
  {
    id: 1,
    title: "Urgent: School Closed",
    message: "Due to heavy rainfall, school will remain closed tomorrow.",
    time: "1 hr ago",
    type: "alert",
    read: false
  },
  {
    id: 2,
    title: "New Assignment",
    message: "Physics Chapter 4 assignment has been uploaded.",
    time: "3 hrs ago",
    type: "info",
    read: false
  },
  {
    id: 3,
    title: "Fee Payment Received",
    message: "Transaction #TXN998877 confirmed successfully.",
    time: "1 day ago",
    type: "success",
    read: true
  },
  {
    id: 4,
    title: "Sports Day Registration",
    message: "Last date to register for track events is Jan 12th.",
    time: "2 days ago",
    type: "info",
    read: true
  }
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Admin / HOS States
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [newNotif, setNewNotif] = useState({ title: '', message: '', type: 'info' as 'alert' | 'info' | 'success' });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
        // Reset sensitive states on close for security
        setShowAdminLogin(false);
        setAdminPassword('');
        setIsComposeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === '1515010') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
      setIsComposeOpen(true);
    } else {
      // Simple shake animation trigger could go here
      setAdminPassword('');
    }
  };

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotif.title || !newNotif.message) return;

    const newId = Math.max(0, ...notifications.map(n => n.id)) + 1;
    const notificationToAdd: Notification = {
      id: newId,
      title: newNotif.title,
      message: newNotif.message,
      time: 'Just now',
      type: newNotif.type,
      read: false
    };

    setNotifications([notificationToAdd, ...notifications]);
    setNewNotif({ title: '', message: '', type: 'info' });
    setIsComposeOpen(false);
  };

  const handleDeleteNotification = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertCircle size={16} className="text-red-500" />;
      case 'success': return <CheckCircle size={16} className="text-green-500" />;
      default: return <Info size={16} className="text-blue-500" />;
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/70 backdrop-blur-xl border-b border-gray-200/50' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center space-x-2">
            <span className="text-lg md:text-xl font-bold tracking-tight text-black truncate max-w-[200px] md:max-w-none">
              CM SHRI SCHOOL PUNJABI BAGH
            </span>
          </NavLink>

          <div className="flex items-center gap-4 md:gap-8">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs font-medium tracking-wide transition-colors duration-200 ${
                      isActive ? 'text-black' : 'text-gray-500 hover:text-black'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden origin-top-right z-50"
                    >
                      {/* Header */}
                      <div className="p-4 border-b border-gray-50 bg-gray-50/50 backdrop-blur-sm flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <h3 className="font-bold text-gray-900">Notifications</h3>
                           {isAdmin && (
                             <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-200">ADMIN</span>
                           )}
                        </div>
                        <div className="flex items-center gap-3">
                          {!isAdmin && !showAdminLogin && (
                            <button 
                              onClick={() => setShowAdminLogin(true)}
                              className="text-gray-400 hover:text-blue-600 transition-colors"
                              title="HOS/Admin Access"
                            >
                              <Lock size={14} />
                            </button>
                          )}
                          
                          {isAdmin && (
                            <>
                              <button 
                                onClick={() => setIsComposeOpen(!isComposeOpen)}
                                className={`text-gray-500 hover:text-blue-600 transition-colors ${isComposeOpen ? 'text-blue-600' : ''}`}
                                title="New Notification"
                              >
                                <Plus size={16} />
                              </button>
                              <button 
                                onClick={() => { setIsAdmin(false); setIsComposeOpen(false); }}
                                className="text-gray-500 hover:text-red-600 transition-colors"
                                title="Logout Admin"
                              >
                                <LogOut size={14} />
                              </button>
                            </>
                          )}

                          {unreadCount > 0 && !isAdmin && (
                            <button 
                              onClick={markAllAsRead}
                              className="text-xs text-blue-600 font-medium hover:underline"
                            >
                              Mark all read
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Admin Login Form */}
                      <AnimatePresence>
                        {showAdminLogin && !isAdmin && (
                           <motion.div 
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: 'auto', opacity: 1 }}
                             exit={{ height: 0, opacity: 0 }}
                             className="bg-gray-50 border-b border-gray-100 overflow-hidden"
                           >
                              <form onSubmit={handleAdminLogin} className="p-4 flex items-center gap-2">
                                <div className="flex-1 relative">
                                  <Lock size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                  <input 
                                    type="password" 
                                    value={adminPassword}
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                    placeholder="Enter HOS Passcode"
                                    className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    autoFocus
                                  />
                                </div>
                                <button type="submit" className="text-xs bg-black text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors">
                                  Verify
                                </button>
                                <button type="button" onClick={() => setShowAdminLogin(false)} className="p-1 text-gray-400 hover:text-gray-600">
                                  <X size={14} />
                                </button>
                              </form>
                           </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Admin Compose Form */}
                      <AnimatePresence>
                        {isAdmin && isComposeOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-blue-50/50 border-b border-blue-100 overflow-hidden"
                          >
                             <form onSubmit={handleSendNotification} className="p-4 space-y-3">
                               <input 
                                 type="text" 
                                 value={newNotif.title}
                                 onChange={(e) => setNewNotif({...newNotif, title: e.target.value})}
                                 placeholder="Notification Title"
                                 className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                               />
                               <textarea 
                                 value={newNotif.message}
                                 onChange={(e) => setNewNotif({...newNotif, message: e.target.value})}
                                 placeholder="Message details..."
                                 rows={2}
                                 className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white resize-none"
                               />
                               <div className="flex items-center gap-2">
                                  <select 
                                    value={newNotif.type} 
                                    onChange={(e) => setNewNotif({...newNotif, type: e.target.value as any})}
                                    className="text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white focus:outline-none"
                                  >
                                    <option value="info">Info</option>
                                    <option value="alert">Alert (Urgent)</option>
                                    <option value="success">Success</option>
                                  </select>
                                  <div className="flex-1"></div>
                                  <button type="submit" className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors shadow-sm">
                                    <Send size={12} /> Send
                                  </button>
                               </div>
                             </form>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Notification List */}
                      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                        {notifications.length > 0 ? (
                          notifications.map((notif) => (
                            <div 
                              key={notif.id} 
                              className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-3 group/item ${!notif.read ? 'bg-blue-50/30' : ''}`}
                            >
                              <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                notif.type === 'alert' ? 'bg-red-100' : notif.type === 'success' ? 'bg-green-100' : 'bg-blue-100'
                              }`}>
                                {getIcon(notif.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                  <h4 className={`text-sm font-semibold truncate pr-2 ${!notif.read ? 'text-gray-900' : 'text-gray-600'}`}>
                                    {notif.title}
                                  </h4>
                                  <span className="text-[10px] text-gray-400 flex items-center gap-1 whitespace-nowrap flex-shrink-0">
                                    <Clock size={10} /> {notif.time}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed break-words">{notif.message}</p>
                              </div>
                              
                              {/* Read Indicator / Delete Button */}
                              <div className="flex flex-col items-end gap-2">
                                {!notif.read && !isAdmin && (
                                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                                )}
                                {isAdmin && (
                                  <button 
                                    onClick={(e) => handleDeleteNotification(notif.id, e)}
                                    className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover/item:opacity-100 p-1"
                                    title="Delete"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-400 text-sm flex flex-col items-center gap-2">
                            <Bell size={24} className="opacity-20" />
                            <p>No new notifications</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-3 bg-gray-50 border-t border-gray-100 text-center">
                        <button className="text-xs font-semibold text-gray-600 hover:text-black transition-colors">
                          View All Activity
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Portal Button (Desktop) */}
              <button className="hidden md:block bg-black text-white text-xs px-4 py-2 rounded-full hover:bg-gray-800 transition-all shadow-md hover:shadow-lg">
                Portal
              </button>

              {/* Mobile Toggle */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-800 hover:text-black focus:outline-none ml-2"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-200 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive ? 'bg-gray-100 text-black' : 'text-gray-600 hover:text-black hover:bg-gray-50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100">
                <button className="w-full bg-black text-white text-sm font-medium px-4 py-3 rounded-xl hover:bg-gray-800 transition-all shadow-md">
                  Student Portal Login
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;