import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Activity, 
  MapPin, 
  User, 
  Clock, 
  LayoutGrid, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Tag, 
  HardHat, 
  Bell, 
  CheckCircle2,
  Camera,
  Monitor,
  Smartphone,
  Zap,
  HelpCircle,
  Scaling,
  ChevronDown,
  ExternalLink,
  Moon,
  Sun,
  Layout as LayoutIcon,
  LayoutDashboard,
  LogOut,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

// --- Mock Data ---
interface JobTicket {
  id: string;
  type: string;
  location: string;
  date: string;
  timeRange: string;
  manager: string;
  guardian: string;
  status: 'ongoing' | 'finished' | 'pending' | 'wait_audit';
  riskLevel: '重大' | '较大' | '一般' | '低';
  content?: string;
}

const MOCK_JOBS: JobTicket[] = [
  { id: 'WP-2024-001', type: '1#磨煤机', location: '1#磨煤机', manager: '张志刚', guardian: '李安全', date: '2024-12-08', timeRange: '08:30 ~ 17:30', status: 'ongoing', riskLevel: '较大', content: '1号机组磨煤机A侧润滑油站滤网清洗、油质采集化验及底部积泥清理作业' },
  { id: 'WP-2024-002', type: '6kV配电室', location: '6kV配电室', manager: '王建国', guardian: '赵强', date: '2024-12-08', timeRange: '09:00 ~ 15:00', status: 'ongoing', riskLevel: '重大' },
  { id: 'WP-2024-003', type: '2#煤仓', location: '2#煤仓', manager: '李安全', guardian: '孙伟', date: '2024-12-07', timeRange: '08:00 ~ 12:00', status: 'finished', riskLevel: '一般' },
  { id: 'WP-2024-004', type: '1#油站', location: '1#油站', manager: '赵敏', guardian: '钱多', date: '2024-12-07', timeRange: '10:00 ~ 16:00', status: 'finished', riskLevel: '一般' },
  { id: 'WP-2024-005', type: '集控室', location: '集控室', manager: '孙策', guardian: '周瑜', date: '2024-12-07', timeRange: '14:00 ~ 18:00', status: 'ongoing', riskLevel: '低' },
  { id: 'WP-2024-006', type: '脱硫塔', location: '脱硫塔', manager: '钱多多', guardian: '陈意', date: '2024-12-06', timeRange: '09:00 ~ 17:00', status: 'finished', riskLevel: '较大' },
  { id: 'WP-2024-007', type: '5#输煤皮带', location: '5#输煤皮带', manager: '周泰', guardian: '黄盖', date: '2024-12-06', timeRange: '08:30 ~ 12:30', status: 'wait_audit', riskLevel: '一般' },
  { id: 'WP-2024-008', type: '升压站区域', location: '升压站', manager: '陆逊', guardian: '诸葛', date: '2024-12-06', timeRange: '13:00 ~ 16:00', status: 'ongoing', riskLevel: '低' },
];

const AREA_STATS_DATA = [
  { name: '#1锅炉房', 重大: 5, 较大: 2, 一般: 8, 低: 15 },
  { name: '#机房周转层', 重大: 2, 较大: 1, 一般: 5, 低: 20 },
  { name: '输煤栈桥', 重大: 3, 较大: 2, 一般: 6, 低: 10 },
  { name: '升压站区域', 重大: 1, 较大: 1, 一般: 4, 低: 12 },
  { name: '化水车间', 重大: 0, 较大: 2, 一般: 8, 低: 15 },
  { name: '脱硫区域', 重大: 2, 较大: 3, 一般: 7, 低: 12 },
];

const MOCK_GAS_DATA = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  ch4: 0.04 + Math.random() * 0.02,
  h2s: 0.10 + Math.random() * 0.05,
}));

const RowHeader = ({ title, extra, icon: Icon }: any) => (
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center gap-2">
      {Icon ? <Icon size={16} className="text-blue-500" /> : <div className="w-1 h-3.5 bg-blue-500 rounded-full" />}
      <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">{title}</h2>
    </div>
    {extra}
  </div>
);

const Header = ({ jobId }: { jobId: string }) => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [now, setNow] = useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 z-50 shrink-0 transition-colors">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <ShieldCheck size={24} className="text-white" />
               </div>
               <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-widest font-sans">火电厂高风险作业监控系统</h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex flex-col items-end mr-4">
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300 tabular-nums">{now.toISOString().split('T')[0].replace(/-/g, '/')}</span>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tabular-nums">{now.toTimeString().split(' ')[0]}</span>
                </div>

                <div 
                  className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/40 group transition-all border border-blue-100 dark:border-blue-800/50"
                >
                    <span className="text-xs font-black">查看原件</span>
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={toggleTheme} className="p-2 text-slate-400 dark:text-slate-500 hover:text-blue-500 transition-colors bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
                        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                    </button>
                    <div className="relative p-2 text-slate-400 dark:text-slate-500 hover:text-blue-500 transition-colors cursor-pointer bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm">
                        <Bell size={18} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                    </div>
                    <div 
                      onClick={() => navigate('/backend')}
                      className="p-2 text-slate-400 dark:text-slate-500 hover:text-blue-500 transition-colors bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer"
                    >
                        <LayoutGrid size={18} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export const DashboardView: React.FC = () => {
  const { theme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState('WP-2024-001');
  const [videoGridMode, setVideoGridMode] = useState<2 | 4>(2);
  const [activeBottomTab, setActiveBottomTab] = useState<'alarm' | 'gas'>('alarm');

  const selectedJob = useMemo(() => MOCK_JOBS.find(j => j.id === selectedJobId) || MOCK_JOBS[0], [selectedJobId]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f4f7f9] dark:bg-slate-950 transition-colors duration-300">
      <Header jobId={selectedJobId} />
      
      <div className="flex-1 flex overflow-hidden p-4 gap-4">
        {/* Left Sidebar */}
        <aside className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl transition-all duration-300 flex flex-col relative shadow-sm ${sidebarCollapsed ? 'w-0 opacity-0 border-none' : 'w-[360px]'}`}>
          <div className="flex-1 flex flex-col min-w-[360px] overflow-hidden">
            {/* Area Statistics */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800">
              <RowHeader title="区域作业统计" icon={Scaling} extra={<LayoutGrid size={14} className="text-slate-300 dark:text-slate-600 cursor-pointer" />} />
              <div className="grid grid-cols-4 gap-2 mb-6">
                {[
                  { label: '重大', val: 5, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-500/10' },
                  { label: '较大', val: 4, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10' },
                  { label: '一般', val: 24, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
                  { label: '低', val: 42, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' }
                ].map(stat => (
                  <div key={stat.label} className={`${stat.bg} ${stat.color} p-2.5 rounded-xl border border-slate-50 dark:border-transparent flex flex-col items-center justify-center`}>
                    <span className="text-xl font-black leading-none mb-1">{stat.val}</span>
                    <span className="text-[10px] opacity-70 font-bold">{stat.label}</span>
                  </div>
                ))}
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={AREA_STATS_DATA} layout="vertical" barSize={10} margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 10, fill: theme === 'dark' ? '#475569' : '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Bar dataKey="重大" stackId="a" fill="#ef4444" radius={[2, 0, 0, 2]} />
                    <Bar dataKey="较大" stackId="a" fill="#f97316" />
                    <Bar dataKey="一般" stackId="a" fill="#3b82f6" />
                    <Bar dataKey="低" stackId="a" fill="#10b981" radius={[0, 2, 2, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Ticket List */}
            <div className="flex-1 flex flex-col min-h-0">
               <div className="p-5 border-b border-slate-100 dark:border-slate-800 space-y-4">
                  <RowHeader title="作业票清单" extra={<span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-full">CNT: 8</span>} />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-lg px-3 py-1.5 text-[11px] appearance-none focus:ring-0 outline-none text-slate-700 dark:text-slate-300 font-medium">
                        <option>区域: 全部</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                      <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-lg px-3 py-1.5 text-[11px] appearance-none focus:ring-0 outline-none text-slate-700 dark:text-slate-300 font-medium">
                        <option>类型: 全部</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="relative">
                     <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                     <input type="text" placeholder="搜索单号、负责人..." className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-lg py-1.5 pl-9 pr-3 text-[11px] outline-none text-slate-700 dark:text-slate-300" />
                  </div>
               </div>
               <div className="flex-1 overflow-y-auto">
                  <table className="w-full text-left text-[11px]">
                     <thead className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 z-10 text-slate-400 font-bold uppercase tracking-widest px-5">
                        <tr>
                           <th className="px-5 py-3 font-medium">单号/人</th>
                           <th className="px-1 py-3 font-medium">类型/区域</th>
                           <th className="px-1 py-3 font-medium">内容</th>
                           <th className="px-1 py-3 font-medium">时间</th>
                           <th className="px-5 py-3 font-medium text-right">状态</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {MOCK_JOBS.map(job => (
                           <tr 
                              key={job.id} 
                              onClick={() => setSelectedJobId(job.id)}
                              className={`cursor-pointer transition-colors ${selectedJobId === job.id ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                           >
                              <td className="px-5 py-3.5">
                                 <div className="font-bold text-slate-800 dark:text-slate-200 tracking-tight">{job.id}</div>
                                 <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{job.manager}</div>
                              </td>
                              <td className="px-1 py-3.5">
                                 <div className="text-slate-700 dark:text-slate-300 font-bold">{job.type}</div>
                                 <div className="text-[9px] text-slate-400 dark:text-slate-500">{job.location}</div>
                              </td>
                              <td className="px-1 py-3.5">
                                 <div className="text-slate-500 dark:text-slate-400 max-w-[80px] truncate">{job.content || '无详细内容'}</div>
                              </td>
                              <td className="px-1 py-3.5 text-slate-400 font-mono tracking-tighter whitespace-nowrap">
                                 <div>{job.date.slice(5)}</div>
                                 <div className="text-[9px]">{job.timeRange.split('~')[0]}</div>
                              </td>
                              <td className="px-5 py-3.5 text-right">
                                 <span className={`px-1 py-0.5 rounded font-bold text-[9px] ${
                                    job.status === 'ongoing' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600' :
                                    job.status === 'finished' ? 'bg-slate-100 dark:bg-slate-800 text-slate-400' : 
                                    job.status === 'wait_audit' ? 'bg-slate-100 dark:bg-slate-800 text-slate-400' : 'bg-red-50 dark:bg-red-500/10 text-red-500'
                                 }`}>
                                    {job.status === 'ongoing' ? '进行中' : job.status === 'finished' ? '已结束' : '待审核'}
                                 </span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          </div>
          
          {/* Collapse toggle */}
          <button 
            onClick={() => setSidebarCollapsed(true)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-blue-500 shadow-sm z-50 group transition-all"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
        </aside>

        {/* Adjuster Icon when closed */}
        <AnimatePresence>
            {sidebarCollapsed && (
                <motion.button 
                    initial={{ scale: 0, opacity: 0, x: -10 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    exit={{ scale: 0, opacity: 0, x: -10 }}
                    onClick={() => setSidebarCollapsed(false)} 
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-50 w-8 h-24 bg-blue-600 text-white rounded-r-2xl shadow-xl flex items-center justify-center hover:bg-blue-700 transition-all active:scale-95 group"
                >
                    <div className="flex flex-col items-center gap-2">
                      <ChevronRight size={18}/>
                      <span className="text-[9px] font-black [writing-mode:vertical-lr] tracking-widest">展开</span>
                    </div>
                </motion.button>
            )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative">
          <div className="h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col transition-colors">
            <div className="flex-1 overflow-hidden p-3 space-y-3 scroll-smooth no-scrollbar flex flex-col">
               {/* Info Toolbar Bar */}
               <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-2 px-4 shadow-sm flex items-center gap-4 relative overflow-hidden transition-colors min-h-[56px] shrink-0">
                  <div className="absolute top-1 right-8 z-10 opacity-30 dark:opacity-10 transform rotate-[15deg] pointer-events-none select-none scale-50">
                    <div className="border-[3px] border-red-500 rounded-lg px-2 py-0.5 flex flex-col items-center">
                      <span className="text-xl font-black text-red-500 uppercase leading-none">进行中</span>
                      <span className="text-[8px] font-black text-red-500 tracking-widest mt-0.5">IN PROGRESS</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 dark:text-slate-300 shrink-0">
                    <MapPin size={12} className="text-blue-500"/>
                    <span>1号机组 / 0米层 / A排</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 dark:text-slate-300 shrink-0">
                    <Tag size={12} className="text-blue-500"/>
                    <span>热力机械</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-md text-[9px] font-black border border-emerald-200 dark:border-emerald-800">受限空间</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 dark:text-slate-300 shrink-0">
                    <User size={12} className="text-blue-500"/>
                    <span>负责人: {selectedJob.manager}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 dark:text-slate-300 shrink-0">
                    <ShieldCheck size={12} className="text-emerald-500"/>
                    <span className="text-blue-600 dark:text-blue-400 border-b border-blue-200 dark:border-blue-800">监护: {selectedJob.guardian}</span>
                  </div>

                  <div className="px-1.5 py-0.5 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 rounded-md border border-orange-100 dark:border-orange-900 text-[9px] font-black shrink-0">较大风险</div>

                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 dark:text-slate-300 shrink-0">
                    <Clock size={12} className="text-blue-500"/>
                    <span>{selectedJob.date} 08:30 ~ 17:30</span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <HelpCircle size={12} className="text-blue-500 flex-shrink-0"/>
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate">内: {selectedJob.content}</span>
                  </div>

                  <div className="ml-auto pl-3 border-l border-slate-100 dark:border-slate-800 shrink-0">
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-black text-xs group">
                      <span>详情</span>
                      <ExternalLink size={12} className="group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
               </div>

               {/* Risk & Measures Grid */}
               <div className="grid grid-cols-12 gap-3 shrink-0">
                  {/* Risk Prediction Card */}
                  <div className="col-span-12 lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 shadow-sm overflow-hidden min-h-[180px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-lg">
                        <AlertTriangle size={14} />
                      </div>
                      <h3 className="text-[11px] font-black text-slate-800 dark:text-slate-100">风险提示</h3>
                    </div>
                    <div className="space-y-2">
                      {[
                        { t: '中毒风险', d: '磨煤机内可能积聚一氧化碳等有害气体，作业前须强制通风测气。' },
                        { t: '火灾风险', d: '油站区域易燃润滑油积聚，遇火花极易引发事故，严禁违规动火。' },
                        { t: '机械伤害', d: '转动部件及联锁动力若未物理断路，存在设备意外启动卷入风险。' }
                      ].map(item => (
                        <div key={item.t} className="relative pl-3">
                          <div className="absolute left-0 top-1.5 w-1 h-1 bg-red-500 rounded-full" />
                          <p className="text-[10px] font-black text-red-600 mb-0.5 leading-none">{item.t}</p>
                          <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-tight line-clamp-3">{item.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Safety Measures Card */}
                  <div className="col-span-12 lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 shadow-sm overflow-hidden min-h-[180px]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-lg">
                        <ShieldCheck size={14} />
                      </div>
                      <h3 className="text-[11px] font-black text-slate-800 dark:text-slate-100">安全措施</h3>
                    </div>
                    <div className="space-y-2">
                      {[
                        { t: '能量隔离', d: '电力、机械动力电源必须执行LOTO双重落锁，物理切断源头动力。' },
                        { t: '消防管控', d: '动火点配防火毯及4具灭火器，动火监护人需巡逻确认环境安全。' },
                        { t: '气体监测', d: '作业期间每2小时进行一次气体复测并在监控仪显示实时数据对比。' }
                      ].map(item => (
                        <div key={item.t} className="relative pl-3">
                          <div className="absolute left-0 top-1.5 w-1 h-1 bg-emerald-500 rounded-full" />
                          <p className="text-[10px] font-black text-emerald-600 mb-0.5 leading-none">{item.t}</p>
                          <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-tight line-clamp-3">{item.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Video Streams */}
                  <div className="col-span-12 lg:col-span-6 flex flex-col gap-2">
                    <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-1.5 font-black text-slate-800 dark:text-slate-100 text-[10px]">
                        <Camera size={12} className="text-blue-500" />
                        <span>多维监护视频</span>
                      </div>
                      <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                        <button 
                          onClick={() => setVideoGridMode(2)}
                          className={`px-1.5 py-0.5 text-[8px] font-black rounded-md transition-all ${videoGridMode === 2 ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-400'}`}
                        >
                          2宫格
                        </button>
                        <button 
                          onClick={() => setVideoGridMode(4)}
                          className={`px-1.5 py-0.5 text-[8px] font-black rounded-md transition-all ${videoGridMode === 4 ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-400'}`}
                        >
                          4宫格
                        </button>
                      </div>
                    </div>
                    <div className={`grid gap-2 flex-1 ${videoGridMode === 4 ? 'grid-cols-2 grid-rows-2' : 'grid-cols-2'}`}>
                       {[1, 2, 3, 4].slice(0, videoGridMode).map(i => (
                         <div key={i} className="relative bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 group/video aspect-video">
                            <img 
                              src={`https://images.unsplash.com/photo-1517089591965-c96301389474?w=800&q=80&idx=${i}`} 
                              className="w-full h-full object-cover opacity-60 transition-transform duration-[5s]" 
                              alt="stream" 
                            />
                            <div className="absolute inset-x-2 top-2 flex justify-between items-start">
                               <div className="px-1 py-0.5 bg-black/60 backdrop-blur-md text-[7px] font-black text-white rounded border border-white/10 uppercase">
                                  CAM-0{i} {i === 1 ? '作业主面' : i === 2 ? '侧面' : i === 3 ? '全景' : '细节'}
                               </div>
                               {i === 1 && (
                                 <div className="flex items-center gap-0.5 px-1 py-0.5 bg-emerald-500 text-white text-[7px] font-black rounded-full shadow-lg">
                                   <Activity size={8} /> LIVE
                                 </div>
                               )}
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>
               </div>


               {/* Ribbon Tabs */}
               <div className="grid grid-cols-2 gap-2 shrink-0">
                  <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-stretch overflow-hidden h-10">
                     <div className="w-20 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 relative shrink-0">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-emerald-500 rounded-r-full" />
                        <span className="text-[12px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-tighter">智能硬件</span>
                     </div>
                     <div className="flex-1 flex items-center gap-1.5 px-2 overflow-x-auto no-scrollbar">
                        {['监测仪', '安全带', '摄像头'].map((label, idx) => (
                          <div key={idx} className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded hover:border-blue-500/40 transition-all cursor-pointer whitespace-nowrap group">
                             <Tag size={8} className="text-emerald-500"/>
                             <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{label}</span>
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-stretch overflow-hidden h-10">
                     <div className="w-20 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800 relative shrink-0">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-red-500 rounded-r-full" />
                        <span className="text-[12px] font-black text-slate-800 dark:text-slate-100 uppercase tracking-tighter">AI算法</span>
                     </div>
                     <div className="flex-1 flex items-center gap-1.5 px-2 overflow-x-auto no-scrollbar">
                        {['倒地检测', '违章识别', '自动预警'].map((label, idx) => (
                          <div key={idx} className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded hover:border-red-500/40 transition-all cursor-pointer whitespace-nowrap group">
                             <Zap size={8} className="text-red-500"/>
                             <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{label}</span>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Workflow Progress */}
               <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 py-5 shadow-sm transition-colors relative overflow-hidden shrink-0">
                  <div className="flex items-center gap-1.5 mb-6">
                     <div className="w-1 h-5 bg-blue-600 rounded-full" />
                     <h2 className="text-sm font-black text-slate-800 dark:text-white tracking-tight uppercase">全流程监管态势</h2>
                  </div>

                  <div className="flex items-center justify-center gap-8 px-4">
                     {/* Step 1: Before Job */}
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-16 bg-[#a855f7] rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 relative z-10 shrink-0">
                           <span className="text-white font-black text-[11px] [writing-mode:vertical-lr] tracking-[0.05em]">作业前</span>
                        </div>
                        <div className="flex gap-2.5 p-2 px-3 border border-dashed border-purple-100 dark:border-purple-900/40 rounded-2xl bg-purple-50/5 transition-all">
                           {['作业许可', '人员培训', '风险演练', '技术交底'].map(label => (
                              <div key={label} className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl flex items-center justify-center text-center p-1 hover:scale-110 transition-transform cursor-default shrink-0 group">
                                 <span className="text-[10px] font-black text-purple-600 leading-tight group-hover:text-purple-500 transition-colors">{label}</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="w-8 h-0.5 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 shrink-0" />

                     {/* Step 2: During Job */}
                     <div className="flex items-center gap-3 relative">
                        <div className="w-10 h-16 bg-[#3b82f6] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 relative z-10 shrink-0">
                           <span className="text-white font-black text-[11px] [writing-mode:vertical-lr] tracking-[0.05em]">作业中</span>
                        </div>
                        <div className="relative flex items-center gap-4 justify-center px-3 p-2 border border-dashed border-blue-100 dark:border-blue-900/40 rounded-2xl bg-blue-50/5">
                           <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex flex-col items-center justify-center text-white shadow-xl shadow-blue-500/40 border-2 border-white dark:border-slate-800 text-center p-1 relative z-10 group hover:scale-110 transition-transform">
                              <Monitor size={16} />
                              <span className="text-[10px] font-black leading-tight mt-1">智能监控</span>
                           </div>
                           <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex flex-col items-center justify-center text-blue-600 dark:text-blue-400 shadow-xl border-2 border-blue-50 dark:border-blue-900/30 text-center p-1 relative z-10 group hover:scale-110 transition-transform">
                              <User size={16} />
                              <span className="text-[10px] font-black leading-tight mt-1">管理人员</span>
                           </div>
                        </div>
                     </div>

                     <div className="w-8 h-0.5 bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30 shrink-0" />

                     {/* Step 3: After Job */}
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-16 bg-[#10b981] rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 relative z-10 shrink-0">
                           <span className="text-white font-black text-[11px] [writing-mode:vertical-lr] tracking-[0.05em]">作业后</span>
                        </div>
                        <div className="flex gap-2.5 p-2 px-3 border border-dashed border-emerald-100 dark:border-emerald-900/40 rounded-2xl bg-emerald-50/5">
                           {['闭环解报', '文件归档'].map(label => (
                              <div key={label} className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl flex items-center justify-center text-center p-1 hover:scale-110 transition-transform cursor-default shrink-0 group">
                                 <span className="text-[10px] font-black text-emerald-600 leading-tight group-hover:text-emerald-500 transition-colors">{label}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>

               {/* Bottom Panels: Node Monitoring & Alarms/Gas */}
               <div className="grid grid-cols-12 gap-3 pb-1 flex-1 min-h-0">
                  {/* Left Column: Node Monitoring */}
                  <div className="col-span-12 lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-sm transition-colors flex flex-col overflow-hidden">
                     <div className="flex items-center justify-between mb-2 shrink-0">
                        <div className="flex items-center gap-1">
                           <LayoutDashboard size={12} className="text-orange-500" />
                           <h3 className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-tight">节点详情</h3>
                        </div>
                        <div className="px-1 px-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[7px] text-slate-400 font-bold">
                           CORE
                        </div>
                     </div>

                     <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-1.5 overflow-hidden">
                        {[
                           { t: '实时监控', d: 'AI引擎运行中', icon: CheckCircle2, color: 'text-emerald-500' },
                           { t: '监护到岗', d: '传感器验证通过', icon: CheckCircle2, color: 'text-emerald-500' },
                           { t: '气体监测', d: '数据回传正常', icon: CheckCircle2, color: 'text-emerald-500' },
                           { t: '违章识别', d: '全量算法加载', icon: CheckCircle2, color: 'text-emerald-500' },
                        ].map((item, idx) => (
                           <div key={idx} className="flex items-center gap-1.5 border-b border-slate-50 dark:border-slate-800/50 pb-1">
                              <div className={`p-0.5 rounded-full ${item.color} bg-opacity-10 shrink-0`}>
                                 <item.icon size={8} className={item.color} />
                              </div>
                              <div className="min-w-0">
                                 <h4 className="text-[9px] font-black text-slate-800 dark:text-slate-200 truncate leading-none">{item.t}</h4>
                                 <p className="text-[7px] text-slate-400 dark:text-slate-500 font-medium truncate mt-0.5">{item.d}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Right Column: Tab Switcher (Alarms / Gas) */}
                  <div className="col-span-12 lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-sm transition-colors flex flex-col overflow-hidden">
                     <div className="flex items-center gap-3 mb-1.5 border-b border-slate-100 dark:border-slate-800 shrink-0">
                        <button 
                          onClick={() => setActiveBottomTab('alarm')}
                          className={`flex items-center gap-1 pb-1 transition-all relative ${activeBottomTab === 'alarm' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                           <Bell size={10} className={activeBottomTab === 'alarm' ? 'text-blue-600' : 'text-slate-400'} />
                           <h3 className="text-[11px] font-black uppercase tracking-tight">告警</h3>
                           {activeBottomTab === 'alarm' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
                        </button>
                        <button 
                          onClick={() => setActiveBottomTab('gas')}
                          className={`flex items-center gap-1 pb-1 transition-all relative ${activeBottomTab === 'gas' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                           <Activity size={10} className={activeBottomTab === 'gas' ? 'text-blue-600' : 'text-slate-400'} />
                           <h3 className="text-[11px] font-black uppercase tracking-tight">气体</h3>
                           {activeBottomTab === 'gas' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
                        </button>
                     </div>

                     <div className="flex-1 overflow-hidden">
                        <AnimatePresence mode="wait">
                           {activeBottomTab === 'alarm' ? (
                              <motion.div 
                                 key="alarms"
                                 initial={{ opacity: 0, scale: 0.98 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 exit={{ opacity: 0, scale: 0.98 }}
                                 className="grid grid-cols-1 gap-1"
                              >
                                {[{ t: '违规入侵', time: '12:23', type: '异常', img: 'https://images.unsplash.com/photo-1542060717-d670f55cf55d?w=100' },
                                  { t: '安全帽', time: '12:45', type: '异常', img: 'https://images.unsplash.com/photo-1579309196904-11d619d02a3a?w=100' },
                                  { t: '气体超标', time: '13:05', type: '预警', img: 'https://images.unsplash.com/photo-1517089591965-c96301389474?w=100' }
                                 ].map((alarm, idx) => (
                                   <div key={idx} className="flex items-center justify-between p-1 bg-slate-50/50 dark:bg-slate-800/30 rounded-lg border border-slate-100 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-800 group">
                                      <div className="flex items-center gap-2">
                                         <div className="w-7 h-5 rounded border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0">
                                            <img src={alarm.img} className="w-full h-full object-cover" alt="alarm" />
                                         </div>
                                         <div className="min-w-0">
                                            <h4 className="text-[9px] font-black text-slate-800 dark:text-slate-100 leading-none truncate">{alarm.t}</h4>
                                            <span className="text-[7px] text-slate-400 font-bold inline-block mt-0.5">{alarm.time}</span>
                                         </div>
                                      </div>
                                      <span className={`px-1 py-0 px-0.5 rounded text-[7px] font-black ${alarm.type === '异常' ? 'bg-red-100 text-red-500' : 'bg-orange-100 text-orange-500'}`}>
                                         {alarm.type}
                                      </span>
                                   </div>
                                 ))}
                              </motion.div>
                           ) : (
                              <motion.div 
                                 key="gas"
                                 initial={{ opacity: 0, scale: 0.98 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 exit={{ opacity: 0, scale: 0.98 }}
                                 className="grid grid-cols-2 gap-2 h-full"
                              >
                                 {[
                                   { label: 'CH4', val: '0.05', unit: '%LEL', color: '#10b981', dataKey: 'ch4' },
                                   { label: 'H2S', val: '0.12', unit: 'ppm', color: '#3b82f6', dataKey: 'h2s' }
                                 ].map((gas) => (
                                    <div key={gas.label} className="bg-slate-50/50 dark:bg-slate-800/50 rounded-xl p-1 border border-slate-100/50 dark:border-slate-800 flex flex-col h-full">
                                       <div className="flex justify-between items-baseline mb-0.5">
                                         <p className="text-[7px] font-bold text-slate-400">{gas.label}</p>
                                         <span className="text-[8px] font-black" style={{ color: gas.color }}>{gas.val}</span>
                                       </div>
                                       <div className="flex-1 w-full min-h-[25px]">
                                         <ResponsiveContainer width="100%" height="100%">
                                           <AreaChart data={MOCK_GAS_DATA}>
                                             <Area 
                                               type="monotone" 
                                               dataKey={gas.dataKey} 
                                               stroke={gas.color} 
                                               fill={`${gas.color}33`}
                                               strokeWidth={1}
                                               isAnimationActive={false}
                                             />
                                           </AreaChart>
                                         </ResponsiveContainer>
                                       </div>
                                    </div>
                                 ))}
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Draggable Floating Action Column */}
          <motion.div 
            drag
            dragMomentum={false}
            whileDrag={{ scale: 1.05 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 cursor-grab active:cursor-grabbing"
          >
             <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[2rem] p-2 py-4 flex flex-col gap-4 shadow-2xl items-center min-w-[70px]">
                <ActionBtn icon={Activity} label="人员体征" />
                <ActionBtn icon={HardHat} label="安全帽" />
                <ActionBtn icon={MapPin} label="3D人员定位" />
             </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

const ActionBtn = ({ icon: Icon, label }: any) => (
  <div className="flex flex-col items-center gap-1 cursor-pointer group w-full px-1">
    <div className="p-2 bg-white/50 dark:bg-slate-800/50 border border-white/50 dark:border-white/10 text-slate-500 dark:text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-lg transition-all shadow-md active:scale-95">
       <Icon size={16} />
    </div>
    <span className="text-[7px] font-black text-slate-500 dark:text-slate-400 group-hover:text-blue-600 transition-colors uppercase text-center leading-none mt-0.5">{label}</span>
  </div>
);
