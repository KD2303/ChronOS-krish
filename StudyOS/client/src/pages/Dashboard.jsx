import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import RightPanel from '../components/RightPanel';
import { Search, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleFeatureClick = (feature) => {
        alert(`${feature} feature is coming soon!`);
    };

    return (
        <div className="min-h-screen bg-brand-light flex font-sans text-text-main">
            {/* Sidebar */}
            <Sidebar />

            {/* Right Panel */}
            <RightPanel />

            <main className="flex-1 ml-64 mr-80 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-10">
                    <div className="relative w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                        <input
                            type="text"
                            placeholder="Search tasks, notes, or subjects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-text-main focus:outline-none focus:ring-2 focus:ring-brand-primary/20 shadow-sm transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => handleFeatureClick('Notifications')}
                            className="relative p-2 text-text-secondary hover:text-brand-primary transition-colors"
                        >
                            <Bell size={24} />
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-brand-light"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-text-main">{user?.username || 'Arin GUPTA'}</p>
                                <p className="text-xs text-text-secondary">Level 1 Scholar</p>
                            </div>
                            <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary font-bold cursor-pointer hover:bg-brand-primary/20 transition-all">
                                {user?.username ? user.username[0].toUpperCase() : 'A'}
                            </div>
                        </div>
                    </div>
                </header>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden flex flex-col md:flex-row items-center justify-between"
                >
                    <div className="relative z-10 max-w-xl">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">Hi {user?.username || 'Arin GUPTA'},</h1>
                        <p className="text-text-secondary leading-relaxed mb-6">
                            Welcome back to your personalized study workspace. You have <span className="font-bold text-brand-primary">4 tasks</span> pending for today. Let's make this session count!
                        </p>
                        <button
                            onClick={() => navigate('/focus')}
                            className="bg-brand-dark text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-gray-800 transition-colors transform hover:-translate-y-0.5"
                        >
                            Go to Focus Mode
                        </button>
                    </div>
                    <div className="hidden md:block w-64 h-48 relative">
                        <div className="absolute top-0 right-10 w-20 h-20 bg-brand-primary/20 rounded-full blur-xl animate-pulse"></div>
                        <div className="absolute bottom-10 left-10 w-32 h-32 bg-brand-secondary/20 rounded-full blur-xl"></div>
                    </div>
                    <div className="absolute right-0 top-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                </motion.div>

                <div className="flex justify-between items-end mb-6">
                    <h3 className="text-lg font-bold text-text-main">Overview</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'Study Hours', value: '42.5h', icon: '⏱️', trend: '+12%' },
                        { label: 'Tasks Done', value: '18', icon: '✅', trend: '+5%' },
                        { label: 'Current Streak', value: '7 Days', icon: '🔥', trend: 'Best' },
                        { label: 'Focus Score', value: '85', icon: '🧠', trend: '+2' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => handleFeatureClick(stat.label)}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 hover:shadow-md transition-shadow group cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{stat.icon}</span>
                                <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">{stat.trend}</span>
                            </div>
                            <h4 className="text-2xl font-bold text-text-main mb-1">{stat.value}</h4>
                            <p className="text-xs text-text-secondary font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-text-main">Today's Focus</h3>
                                <button
                                    onClick={() => navigate('/subjects')}
                                    className="text-sm font-medium text-brand-primary hover:underline"
                                >
                                    View All
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {['Advanced Mathematics', 'Physics - Quantum Mechanics'].map((subject, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -5 }}
                                        onClick={() => navigate('/subjects')}
                                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 group cursor-pointer hover:border-brand-primary/30 transition-all"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                            {i === 0 ? '📐' : '⚛️'}
                                        </div>
                                        <h4 className="font-bold text-gray-800 mb-2">{subject}</h4>
                                        <p className="text-xs text-text-secondary mb-4">Chapter 4 • 2 Tasks Pending</p>
                                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                                            <div className="bg-brand-secondary h-1.5 rounded-full" style={{ width: i === 0 ? '60%' : '30%' }}></div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-brand-dark p-6 rounded-3xl text-white relative overflow-hidden shadow-lg group">
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold mb-1">Upcoming Quiz</h3>
                                <p className="text-sm text-gray-400 mb-6">Physics: Wave Motion</p>
                                <div className="flex justify-between items-end">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full bg-gray-600 border-2 border-brand-dark flex items-center justify-center text-xs">P{i}</div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => handleFeatureClick('Quiz Prep')}
                                        className="bg-white text-brand-dark px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors"
                                    >
                                        Prepare
                                    </button>
                                </div>
                            </div>
                            <div className="absolute right-0 bottom-0 w-32 h-32 bg-brand-primary rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        </div>

                        <div
                            onClick={() => handleFeatureClick('Weekly Analytics')}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 cursor-pointer hover:shadow-md transition-all"
                        >
                            <h3 className="font-bold text-gray-800 mb-4">Weekly Activity</h3>
                            <div className="h-32 flex items-end justify-between px-2">
                                {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                    <div key={i} className="w-2 bg-brand-primary/20 rounded-t-sm relative group cursor-pointer">
                                        <div className="absolute bottom-0 w-full bg-brand-primary rounded-t-sm transition-all duration-500 group-hover:bg-brand-secondary" style={{ height: `${h}%` }}></div>
                                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded transition-opacity pointer-events-none">
                                            {h}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
