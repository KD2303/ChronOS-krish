import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings, User, Edit3, Heart, LogOut, Palette,
    Moon, Sun, Bell, BellOff, Volume2, VolumeX, ZoomIn,
    Linkedin, Github, Mail, ExternalLink,
    Sparkles, TrendingUp, Target, AlertTriangle,
    ChevronDown, X, Flame, Clock, BarChart3, Crosshair
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// ─── Circular Progress Ring ─────────────────────────────────────────────────
const ProgressRing = ({ progress = 0, size = 56, strokeWidth = 4, color = '#4F46E5' }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg width={size} height={size} className="progress-ring -rotate-90">
            <circle
                cx={size / 2} cy={size / 2} r={radius}
                fill="none" stroke="currentColor"
                strokeWidth={strokeWidth}
                className="text-gray-200"
            />
            <circle
                cx={size / 2} cy={size / 2} r={radius}
                fill="none" stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="progress-ring-circle"
            />
            <text
                x={size / 2} y={size / 2}
                textAnchor="middle" dominantBaseline="central"
                className="fill-current text-text-main font-bold rotate-90 origin-center"
                style={{ fontSize: size * 0.22 }}
            >
                {progress}%
            </text>
        </svg>
    );
};

// ─── Main Right Panel ───────────────────────────────────────────────────────
const RightPanel = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // ── State ────────────────────────────────────────────────────────────
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [profileHover, setProfileHover] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [sound, setSound] = useState(true);
    const [sessionSeconds, setSessionSeconds] = useState(0);
    const [focusActive, setFocusActive] = useState(true);
    const [showAIInsight, setShowAIInsight] = useState(false);

    // ── Live Timer ───────────────────────────────────────────────────────
    useEffect(() => {
        if (!focusActive) return;
        const interval = setInterval(() => {
            setSessionSeconds(s => s + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [focusActive]);

    const formatTime = (totalSec) => {
        const h = Math.floor(totalSec / 3600);
        const m = Math.floor((totalSec % 3600) / 60);
        const s = totalSec % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // ── Mock Data ────────────────────────────────────────────────────────
    const streak = 7;
    const productivityScore = 78;
    const activeGoal = 'Complete Physics Ch.4';
    const scoreStatus = productivityScore >= 75 ? 'green' : productivityScore >= 50 ? 'yellow' : 'red';

    const statusColors = {
        green: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', label: 'On Track' },
        yellow: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', label: 'Needs Focus' },
        red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', label: 'Falling Behind' },
    };

    const status = statusColors[scoreStatus];

    const socialLinks = [
        { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
        { icon: Github, label: 'GitHub', href: 'https://github.com' },
        { icon: Mail, label: 'Email', href: 'mailto:user@example.com' },
        { icon: ExternalLink, label: 'Portfolio', href: 'https://portfolio.example.com' },
    ];

    // ─────────────────────────────────────────────────────────────────────
    return (
        <aside className="w-80 h-screen fixed right-0 top-0 z-40 flex flex-col py-5 px-4 gap-4 overflow-y-auto right-panel-scroll"
            style={{
                background: 'linear-gradient(180deg, #F8F9FE 0%, #F0F1FA 50%, #EEF0F8 100%)',
            }}
        >
            {/* ═══════════════════════════════════════════════════════════════
                SECTION 1 — Identity Block
            ════════════════════════════════════════════════════════════════ */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-5 relative"
            >
                {/* Settings Icon */}
                <button
                    onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                    className="absolute top-4 right-4 p-1.5 rounded-lg text-text-secondary hover:text-brand-primary hover:bg-brand-primary/10 transition-all duration-200"
                >
                    {showSettingsMenu ? <X size={18} /> : <Settings size={18} />}
                </button>

                {/* Profile Image */}
                <div className="flex flex-col items-center mb-3">
                    <div
                        className="relative cursor-pointer mb-3"
                        onMouseEnter={() => setProfileHover(true)}
                        onMouseLeave={() => setProfileHover(false)}
                    >
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-500 ${focusActive
                            ? 'profile-glow bg-linear-to-br from-brand-primary to-brand-secondary text-white'
                            : 'bg-brand-primary/15 text-brand-primary'
                            }`}>
                            {user?.username ? user.username[0].toUpperCase() : 'A'}
                        </div>

                        {/* Edit Overlay */}
                        <AnimatePresence>
                            {profileHover && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center gap-1"
                                >
                                    <Edit3 size={14} className="text-white" />
                                    <span className="text-[10px] font-semibold text-white">Edit</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Active Indicator */}
                        {focusActive && (
                            <span className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-[3px] border-white timer-pulse" />
                        )}
                    </div>

                    <h3 className="text-base font-bold text-text-main">
                        {user?.username || 'Arin GUPTA'}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[11px] font-semibold">
                        🎓 Level 1 Scholar
                    </span>
                </div>

                {/* Settings Dropdown */}
                <AnimatePresence>
                    {showSettingsMenu && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-2 border-t border-gray-100 pt-3 space-y-1">
                                {[
                                    { icon: User, label: 'Edit Profile', action: () => alert('Edit Profile coming soon!') },
                                    { icon: Heart, label: 'Preferences', action: () => alert('Preferences coming soon!') },
                                    { icon: Palette, label: 'Theme', action: () => alert('Theme settings coming soon!') },
                                    { icon: LogOut, label: 'Logout', action: handleLogout, danger: true },
                                ].map((item, i) => (
                                    <motion.button
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={item.action}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${item.danger
                                            ? 'text-red-500 hover:bg-red-50'
                                            : 'text-text-secondary hover:text-brand-primary hover:bg-brand-primary/5'
                                            }`}
                                    >
                                        <item.icon size={16} />
                                        {item.label}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 2 — Session Intelligence
            ════════════════════════════════════════════════════════════════ */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-2xl p-5"
            >
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Session Intel</h4>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${status.bg} ${status.text} ${status.border} border`}>
                        {status.label}
                    </span>
                </div>

                {/* Live Timer */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 }}
                    className="bg-linear-to-r from-brand-dark to-[#2a2a3d] rounded-xl p-4 mb-3 relative overflow-hidden"
                >
                    <div className="flex items-center justify-between relative z-10">
                        <div>
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">
                                {focusActive ? '● Live Session' : 'Session Paused'}
                            </p>
                            <p className="text-2xl font-bold text-white font-mono tracking-wider">
                                {formatTime(sessionSeconds)}
                            </p>
                        </div>
                        <button
                            onClick={() => setFocusActive(!focusActive)}
                            className={`p-2.5 rounded-xl transition-all duration-300 ${focusActive
                                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                                }`}
                        >
                            <Clock size={18} />
                        </button>
                    </div>
                    {focusActive && (
                        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/10 rounded-full blur-2xl" />
                    )}
                </motion.div>

                {/* Stat Cards Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                    {/* Streak */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/70 rounded-xl p-3 border border-gray-100/80 hover:border-brand-primary/20 hover:shadow-sm transition-all duration-300 group"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Flame size={14} className="text-orange-500" />
                            </div>
                            <span className="text-[10px] text-text-secondary font-medium">Streak</span>
                        </div>
                        <p className="text-lg font-bold text-text-main">{streak} <span className="text-[10px] font-medium text-text-secondary">days</span></p>
                    </motion.div>

                    {/* Productivity Score */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="bg-white/70 rounded-xl p-3 border border-gray-100/80 hover:border-brand-primary/20 hover:shadow-sm transition-all duration-300 flex flex-col items-center justify-center"
                    >
                        <ProgressRing progress={productivityScore} size={52} strokeWidth={4} />
                        <span className="text-[10px] text-text-secondary font-medium mt-1">Score</span>
                    </motion.div>

                    {/* Active Goal */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="col-span-2 bg-white/70 rounded-xl p-3 border border-gray-100/80 hover:border-brand-primary/20 hover:shadow-sm transition-all duration-300 group"
                    >
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                <Crosshair size={15} className="text-brand-primary group-hover:text-white transition-colors" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] text-text-secondary font-medium">Active Goal</p>
                                <p className="text-sm font-bold text-text-main truncate">{activeGoal}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 3 — Accessibility & Control Tools
            ════════════════════════════════════════════════════════════════ */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-2xl p-4"
            >
                <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-3">Controls</h4>
                <div className="flex items-center justify-between">
                    {[
                        {
                            active: darkMode,
                            toggle: () => setDarkMode(!darkMode),
                            iconOn: Moon, iconOff: Sun,
                            label: 'Theme',
                            activeColor: 'bg-indigo-100 text-indigo-600',
                        },
                        {
                            active: notifications,
                            toggle: () => setNotifications(!notifications),
                            iconOn: Bell, iconOff: BellOff,
                            label: 'Alerts',
                            activeColor: 'bg-emerald-100 text-emerald-600',
                        },
                        {
                            active: sound,
                            toggle: () => setSound(!sound),
                            iconOn: Volume2, iconOff: VolumeX,
                            label: 'Sound',
                            activeColor: 'bg-sky-100 text-sky-600',
                        },
                        {
                            active: false,
                            toggle: () => alert('Accessibility settings coming soon!'),
                            iconOn: ZoomIn, iconOff: ZoomIn,
                            label: 'Zoom',
                            activeColor: 'bg-violet-100 text-violet-600',
                        },
                    ].map((ctrl, i) => {
                        const Icon = ctrl.active ? ctrl.iconOn : ctrl.iconOff;
                        return (
                            <button
                                key={i}
                                onClick={ctrl.toggle}
                                className="flex flex-col items-center gap-1.5 group"
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${ctrl.active
                                    ? ctrl.activeColor
                                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                    } group-hover:scale-110 group-hover:shadow-sm`}>
                                    <Icon size={18} />
                                </div>
                                <span className="text-[9px] font-semibold text-text-secondary">{ctrl.label}</span>
                            </button>
                        );
                    })}
                </div>
            </motion.div>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 4 — Social & Professional Identity
            ════════════════════════════════════════════════════════════════ */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-2xl p-4"
            >
                <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-3">Connect</h4>
                <div className="flex items-center justify-between">
                    {socialLinks.map((link, i) => (
                        <a
                            key={i}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-1.5 group"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-brand-primary/10 group-hover:text-brand-primary group-hover:scale-110 group-hover:shadow-sm transition-all duration-300">
                                <link.icon size={18} />
                            </div>
                            <span className="text-[9px] font-semibold text-text-secondary">{link.label}</span>
                        </a>
                    ))}
                </div>
            </motion.div>

            {/* ═══════════════════════════════════════════════════════════════
                SECTION 5 — AI Study Insight (Bonus Premium)
            ════════════════════════════════════════════════════════════════ */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="glass-card rounded-2xl overflow-hidden"
            >
                <button
                    onClick={() => setShowAIInsight(!showAIInsight)}
                    className="w-full p-4 flex items-center justify-between group"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-brand-primary to-brand-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-brand-primary/20">
                            <Sparkles size={16} className="text-white" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-text-main">AI Study Insight</p>
                            <p className="text-[10px] text-text-secondary">Weekly performance summary</p>
                        </div>
                    </div>
                    <motion.div
                        animate={{ rotate: showAIInsight ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown size={16} className="text-text-secondary" />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {showAIInsight && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                        >
                            <div className="px-4 pb-4 space-y-3">
                                {/* Weekly Overview */}
                                <div className="bg-linear-to-r from-emerald-50 to-green-50 rounded-xl p-3 border border-emerald-100">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <TrendingUp size={13} className="text-emerald-600" />
                                        <span className="text-[11px] font-bold text-emerald-700">Weekly Overview</span>
                                    </div>
                                    <p className="text-[11px] text-emerald-600 leading-relaxed">
                                        You studied <span className="font-bold">18.5 hours</span> this week — <span className="font-bold">12% more</span> than last week. Great momentum!
                                    </p>
                                </div>

                                {/* Improvement Tips */}
                                <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Target size={13} className="text-blue-600" />
                                        <span className="text-[11px] font-bold text-blue-700">Improvement Tips</span>
                                    </div>
                                    <ul className="text-[11px] text-blue-600 space-y-1">
                                        <li>• Take 5-min breaks every 45 minutes</li>
                                        <li>• Try morning sessions for Physics</li>
                                        <li>• Use spaced repetition for formulas</li>
                                    </ul>
                                </div>

                                {/* Weak Subjects */}
                                <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-xl p-3 border border-amber-100">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <AlertTriangle size={13} className="text-amber-600" />
                                        <span className="text-[11px] font-bold text-amber-700">Needs Attention</span>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        {['Organic Chemistry', 'Calculus III'].map((subj, i) => (
                                            <span key={i} className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                                                {subj}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Bottom Spacer */}
            <div className="h-2 shrink-0" />
        </aside>
    );
};

export default RightPanel;
