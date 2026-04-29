import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User, Lock, ArrowRight, Zap, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const LoginView: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('******');
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] dark:bg-blue-500/5" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] dark:bg-purple-500/5" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.4)] border border-white dark:border-slate-800 p-10 relative z-10"
      >
        <div className="flex flex-col items-center mb-10 relative">
          <button 
            onClick={toggleTheme} 
            className="absolute -top-4 -right-4 p-2.5 text-slate-400 hover:text-blue-500 transition-colors bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-500/20 mb-6">
            <ShieldCheck size={40} className="text-white" />
          </div>
          <p className="text-slate-900 dark:text-blue-400 font-black text-base lg:text-lg tracking-tighter uppercase text-center leading-tight">火电厂高风险作业监控系统</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">账号</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
                <User size={18} />
              </div>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-14 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl pl-12 pr-4 text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                placeholder="请输入账号"
              />
            </div>
          </div>

          <div className="space-y-2">
             <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">密码</label>
             <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl pl-12 pr-4 text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                placeholder="请输入密码"
              />
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
             <div className="flex items-center gap-2 cursor-pointer group">
               <div className="w-4 h-4 rounded border border-slate-200 dark:border-slate-700 group-hover:border-blue-500 transition-colors" />
               <span className="text-xs font-bold text-slate-500 dark:text-slate-400">记住我</span>
             </div>
             <span className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer">忘记密码?</span>
          </div>

          <button 
            type="submit"
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            立即登录 <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-10 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-tighter">
          <Zap size={10} fill="currentColor" />
          Powered by Smart Industry AI Engine
        </div>
      </motion.div>
    </div>
  );
};
