import React from 'react';
import { LayoutDashboard, BookOpen, Calendar, Settings, LogOut, CheckSquare, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: BookOpen, label: 'Subjects', path: '/subjects' },
        { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
        { icon: Calendar, label: 'Schedule', path: '/schedule' },
        { icon: Clock, label: 'Focus Mode', path: '/focus' },
    ];

    const currentPath = window.location.pathname;

    return (
        <aside className="w-64 bg-brand-dark text-white h-screen fixed left-0 top-0 flex flex-col justify-between p-6 z-50">
            {/* Logo Area */}
            <div>
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-3 cursor-pointer"
                    >
                        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center font-bold text-white">
                            S
                        </div>
                        <span className="text-xl font-bold tracking-tight">StudyOS</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                    {navItems.map((item, index) => {
                        const isActive = currentPath === item.path;
                        return (
                            <button
                                key={index}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-white transition-colors'} />
                                <span className="font-medium text-sm">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Section */}
            <div>
                <div className="bg-white/5 rounded-xl p-4 mb-4">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Study Stats</h4>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-300">Daily Goal</span>
                        <span className="text-xs font-bold text-brand-primary">80%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-brand-primary h-1.5 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all duration-200"
                >
                    <LogOut size={20} />
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
