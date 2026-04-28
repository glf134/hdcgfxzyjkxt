import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Settings, 
  Briefcase, 
  Layout, 
  Bell, 
  Sun, 
  Moon, 
  LogOut, 
  Search,
  ChevronRight,
  TrendingUp,
  FileText,
  Video,
  Clock,
  CheckCircle2,
  AlertCircle,
  Home,
  ShieldAlert,
  Server,
  Database,
  PhoneCall,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';

export const BackendView: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: '个人工作台', active: true },
    { icon: Settings, label: '系统配置', hasSub: true },
    { icon: Briefcase, label: '例行安全工作', hasSub: true },
    { icon: Server, label: '特种设备管理', hasSub: true },
    { icon: ShieldAlert, label: '反违章管理', hasSub: true },
    { icon: Users, label: '承包商全链路管理', hasSub: true },
    { icon: Database, label: '基础数据', hasSub: true },
    { icon: PhoneCall, label: '应急管理', hasSub: true },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
           <span className="font-black text-slate-800 dark:text-white tracking-tight">后台管理系统</span>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto space-y-1">
          <div className="relative mb-6">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索功能..." 
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg py-2 pl-9 pr-3 text-xs outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest px-2 mb-2">系统导航</p>
          
          {menuItems.map((item) => (
            <div 
              key={item.label}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                item.active 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={16} />
                <span className="text-[12px]">{item.label}</span>
              </div>
              {item.hasSub && <ChevronDown size={14} className="opacity-40" />}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-800 dark:text-white">个人工作台</span>
          </div>

          <div className="flex items-center gap-6">
             <button onClick={toggleTheme} className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
               {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
             </button>
             <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors relative">
               <Bell size={20} />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
             </button>
             <button 
               onClick={() => navigate('/dashboard')}
               className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
             >
               <LogOut size={14} /> 退出后台
             </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
           {/* Tab bar */}
           <div className="flex gap-2">
              <div className="px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> 个人工作台
              </div>
           </div>

           {/* Hero Cards */}
           <div className="grid grid-cols-4 gap-6">
              <div className="col-span-1 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
                 <TrendingUp className="absolute right-[-10px] bottom-[-10px] w-32 h-32 opacity-10" />
                 <p className="text-xs font-medium opacity-80 mb-2">今日系统访问量</p>
                 <h2 className="text-4xl font-black mb-4">1,208</h2>
                 <div className="inline-flex items-center gap-1.2 px-2 py-1 bg-white/20 rounded-lg text-[10px] font-bold">
                   +12.4% 同比昨日
                 </div>
              </div>

              {[
                { label: '待办事项总数', val: '15', sub: '3 项任务即将逾期', color: 'bg-white', icon: Layout },
                { label: '未读消息通知', val: '8', sub: '其中包含 2 条紧急告警', color: 'bg-white', icon: Bell },
                { label: '当前在线硬件装备', val: '128', sub: '装备连接率 94.8%', color: 'bg-white', icon: Video },
              ].map((card, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                   <div>
                     <div className="flex justify-between items-start mb-4">
                       <p className="text-xs font-bold text-slate-400 dark:text-slate-500">{card.label}</p>
                       <card.icon size={18} className="text-slate-200 dark:text-slate-700" />
                     </div>
                     <h2 className="text-3xl font-black text-slate-900 dark:text-white">{card.val}</h2>
                   </div>
                   <p className="text-[10px] font-bold text-orange-500 mt-4">{card.sub}</p>
                </div>
              ))}
           </div>

           {/* Second Row */}
           <div className="grid grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 space-y-6">
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-xl"><FileText size={18} /></div>
                       <h3 className="font-bold text-slate-800 dark:text-white">我的待办</h3>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 cursor-pointer">查看全部任务</span>
                 </div>
                 <div className="space-y-4">
                    {[
                      { title: '1-CAM-05 区域入侵告警待处置', time: '告警处置 09:30', status: '待处理', color: 'text-orange-500 bg-orange-50' },
                      { title: '汽机房2号行车季度定期检验', time: '设备巡检 14:00', status: '进行中', color: 'text-blue-500 bg-blue-50' },
                      { title: '输煤皮带廊道异常高热告警跟进', time: '告警处置 11:15', status: '待处理', color: 'text-orange-500 bg-orange-50' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all cursor-pointer group">
                        <div className="flex items-center gap-4">
                           <div className="w-2 h-2 rounded-full bg-red-500" />
                           <div>
                              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.title}</p>
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{item.time}</p>
                           </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.color} dark:bg-opacity-10`}>{item.status}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 space-y-6">
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-500 rounded-xl"><Bell size={18} /></div>
                       <h3 className="font-bold text-slate-800 dark:text-white">消息通知</h3>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 cursor-pointer">标记已读</span>
                 </div>
                 <div className="space-y-6">
                    {[
                      { icon: AlertCircle, color: 'text-red-500 bg-red-50', title: '系统成功识别起高处作业未挂钩违章', time: '5分钟前', loc: '位置：1号炉32米层' },
                      { icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50', title: '您提交的“三措两案”已通过审核', time: '1小时前', loc: '流程已流转至设备部主任' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.color} dark:bg-opacity-10`}>
                           <item.icon size={18} />
                        </div>
                        <div className="flex-1">
                           <div className="flex justify-between items-start">
                              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-tight">{item.title}</p>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 italic">{item.time}</span>
                           </div>
                           <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{item.loc}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Useful Apps */}
           <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-xl"><Layout size={18} /></div>
                 <h3 className="font-bold text-slate-800 dark:text-white">常用功能应用</h3>
              </div>
              <div className="grid grid-cols-6 gap-4">
                {[
                  { icon: FileText, label: '项目信息' },
                  { icon: TrendingUp, label: '安全指标' },
                  { icon: ShieldAlert, label: '反违章分析' },
                  { icon: Bell, label: '例行公告' },
                  { icon: FileText, label: '我的培训' },
                  { icon: Search, label: '我的考试' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 group transition-all">
                    <item.icon size={24} className="text-slate-400 dark:text-slate-500 group-hover:text-blue-500" />
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-blue-600">{item.label}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};
