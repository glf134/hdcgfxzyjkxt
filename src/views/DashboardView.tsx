import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield,
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
  FileText,
  FileWarning
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend,
  BarChart, 
  Bar, 
  AreaChart,
  Area
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

const GAS_TREND_DATA = [
  { time: '10:00', ch4: 20, h2s: 15, co: 12, o2: 21 },
  { time: '11:00', ch4: 22, h2s: 18, co: 15, o2: 20.5 },
  { time: '12:00', ch4: 25, h2s: 20, co: 18, o2: 20 },
  { time: '13:00', ch4: 23, h2s: 19, co: 16, o2: 20.2 },
  { time: '14:00', ch4: 25, h2s: 20, co: 18, o2: 20 },
];
import { VitalSignsModal } from './VitalSignsView';
import { PersonnelArchiveModal } from './PersonnelArchiveView';
import { HelmetMonitoringModal } from './HelmetMonitoringView';
import { PersonnelPositioningModal } from './PersonnelPositioningView';
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
  { name: '#1锅炉房', count: 12 },
  { name: '#机房周转层', count: 28 },
  { name: '输煤栈桥', count: 15 },
  { name: '升压站区域', count: 8 },
  { name: '化水车间', count: 22 },
  { name: '脱硫区域', count: 10 },
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

            <div className="flex items-center gap-4 px-3 border-l border-slate-100 dark:border-slate-800 ml-2">
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

                <div 
                  onClick={() => navigate('/')}
                  className="p-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-800/50 shadow-sm cursor-pointer group"
                  title="退出登录"
                >
                    <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
            </div>
            </div>
        </header>
    );
};

export const DashboardView: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [showVitalSigns, setShowVitalSigns] = useState(false);
  const [showHelmetMonitoring, setShowHelmetMonitoring] = useState(false);
  const [showPersonnelPositioning, setShowPersonnelPositioning] = useState(false);
  const [showPersonArchive, setShowPersonArchive] = useState<string | null>(null);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState('WP-2024-001');
  const [videoGridMode, setVideoGridMode] = useState<2 | 4>(2);
  const [activeBottomTab, setActiveBottomTab] = useState<'alarm' | 'gas'>('gas');
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const renderNodeDetailContent = () => {
    if (!activeNode) return (
      <div className="h-full flex flex-col items-center justify-center text-slate-300 dark:text-slate-700 opacity-50">
        <LayoutDashboard size={40} className="mb-2" />
        <span className="text-xs font-bold">请选择上方节点查看详情</span>
      </div>
    );

    switch (activeNode) {
      case '人员培训':
        return (
          <div className="space-y-2 overflow-y-auto pr-1">
            {[
              { name: '张三', unit: '维护二班', group: '锅炉组', role: '焊工', trained: true },
              { name: '李四', unit: '维护二班', group: '锅炉组', role: '起重工', trained: true },
              { name: '王五', unit: '安环部', group: '监护组', role: '监护人', trained: true },
              { name: '赵六', unit: '外部单位', group: '施工组', role: '普工', trained: false },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <User size={14} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-slate-800 dark:text-slate-200">{p.name} <span className="text-[9px] font-bold text-slate-400">/ {p.role}</span></p>
                    <p className="text-[9px] text-slate-400 font-medium">{p.unit} - {p.group}</p>
                  </div>
                </div>
                <div className={`px-2 py-0.5 rounded text-[9px] font-black ${p.trained ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/10' : 'bg-red-50 text-red-600 dark:bg-red-900/10'}`}>
                  {p.trained ? '已培训' : '未培训'}
                </div>
              </div>
            ))}
          </div>
        );
      case '风险演练':
        return (
          <div className="grid grid-cols-1 gap-2">
            {[
              { title: '有限空间窒息应急模拟演练记录', type: 'DOCX', time: '2024-04-20' },
              { title: '高处作业坠落现场处置演练表', type: 'PDF', time: '2024-04-18' },
              { title: '演练现场音视频备份资料', type: 'MP4', time: '2024-04-20' },
            ].map((f, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-white dark:border-white/5 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group">
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-slate-400 group-hover:text-blue-500" />
                  <div>
                    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600">{f.title}</p>
                    <p className="text-[9px] text-slate-400 font-medium">{f.time} · {f.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case '安全管理文件':
        return (
          <div className="grid grid-cols-1 gap-2">
            {[
              { title: '三措两案：检修安全技术交底书', tag: '三措两案' },
              { title: '1-5号炉区域应急管理响应方案', tag: '应急管理' },
              { title: '锅炉内衬修复安全措施落实文件', tag: '安全措施' },
            ].map((f, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                   <Shield size={16} className="text-emerald-500" />
                   <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{f.title}</p>
                </div>
                <span className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[8px] font-black rounded">{f.tag}</span>
              </div>
            ))}
          </div>
        );
      case '管理人员到岗签到':
        return (
          <div className="space-y-2">
            {[
              { name: '李主任', role: '部门经理', time: '08:15', status: '已签到' },
              { name: '王专工', role: '技术主管', time: '08:22', status: '已签到' },
              { name: '赵监护', role: '安全监察', time: '08:30', status: '已签到' },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-white dark:bg-slate-800 border-l-4 border-blue-500 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center shrink-0">
                  <User size={18} className="text-slate-500" />
                </div>
                <div className="flex-1">
                   <div className="flex justify-between items-center">
                      <p className="text-[11px] font-black text-slate-800 dark:text-slate-100">{p.name}</p>
                      <span className="text-[9px] text-blue-500 font-bold">{p.time}</span>
                   </div>
                   <p className="text-[9px] text-slate-400 font-medium">{p.role}</p>
                </div>
                <div className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded uppercase tracking-tighter">
                   {p.status}
                </div>
              </div>
            ))}
          </div>
        );
      case '反违章报告':
        return (
          <div className="space-y-2">
            {[
              { id: 'REP-2024-001', type: '行为违章', level: '一般', time: '2024-04-20 14:30' },
              { id: 'REP-2024-002', type: '管理违章', level: '低风险', time: '2024-04-19 09:12' },
            ].map((r, i) => (
              <div key={i} className="p-3 bg-red-50/10 border border-red-100 dark:border-red-900/30 rounded-xl flex items-center justify-between cursor-pointer hover:bg-red-50/20 transition-all">
                <div className="flex gap-3 items-center">
                   <FileWarning size={16} className="text-red-500" />
                   <div>
                      <p className="text-[11px] font-black text-slate-800 dark:text-slate-200">{r.id}</p>
                      <p className="text-[9px] text-slate-400 font-medium">{r.type} · {r.time}</p>
                   </div>
                </div>
                <span className="text-[9px] font-black text-red-600">{r.level}</span>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div className="h-full flex flex-col items-center justify-center text-slate-300 dark:text-slate-700 opacity-50 italic">
            <span className="text-[10px] font-bold">该节点暂无详请数据内容</span>
          </div>
        );
    }
  };

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
                  { label: '今日总数', val: 128, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                  { label: '动火', val: 32, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
                  { label: '高空', val: 45, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
                  { label: '有限空间', val: 21, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' }
                ].map(stat => (
                  <div key={`stat-${stat.label}`} className={`${stat.bg} ${stat.color} p-2.5 rounded-xl border border-slate-50 dark:border-transparent flex flex-col items-center justify-center`}>
                    <span className="text-xl font-black leading-none mb-1">{stat.val}</span>
                    <span className="text-[10px] opacity-70 font-bold">{stat.label}</span>
                  </div>
                ))}
              </div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={AREA_STATS_DATA} layout="vertical" barSize={10} margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 10, fill: theme === 'dark' ? '#475569' : '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px', fontWeight: 'bold' }}
                      cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                    />
                    <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
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
            <div className="flex-1 overflow-y-auto p-3 space-y-4 scroll-smooth no-scrollbar flex flex-col">
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
                  <div className="col-span-12 lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm overflow-hidden min-h-[210px]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-lg">
                        <AlertTriangle size={15} />
                      </div>
                      <h3 className="text-[12px] font-black text-slate-800 dark:text-slate-100">风险提示</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        { t: '中毒风险', d: '磨煤机内可能积聚一氧化碳等有害气体，作业前须强制通风测气。' },
                        { t: '火灾风险', d: '油站区域易燃润滑油积聚，遇火花极易引发事故，严禁违规动火。' },
                        { t: '机械伤害', d: '转动部件及联锁动力若未物理断路，存在设备意外启动卷入风险。' }
                      ].map(item => (
                        <div key={`risk-${item.t}`} className="relative pl-3">
                          <div className="absolute left-0 top-1.5 w-1 h-1 bg-red-500 rounded-full" />
                          <p className="text-[11px] font-black text-red-600 mb-0.5 leading-none">{item.t}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight line-clamp-3">{item.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Safety Measures Card */}
                  <div className="col-span-12 lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm overflow-hidden min-h-[210px]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-lg">
                        <ShieldCheck size={15} />
                      </div>
                      <h3 className="text-[12px] font-black text-slate-800 dark:text-slate-100">安全措施</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        { t: '能量隔离', d: '电力、机械动力电源必须执行LOTO双重落锁，物理切断源头动力。' },
                        { t: '消防管控', d: '动火点配防火毯及4具灭火器，动火监护人需巡逻确认环境安全。' },
                        { t: '气体监测', d: '作业期间每2小时进行一次气体复测并在监控仪显示实时数据对比。' }
                      ].map(item => (
                        <div key={`measure-${item.t}`} className="relative pl-3">
                          <div className="absolute left-0 top-1.5 w-1 h-1 bg-emerald-500 rounded-full" />
                          <p className="text-[11px] font-black text-emerald-600 mb-0.5 leading-none">{item.t}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight line-clamp-3">{item.d}</p>
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
                         <div key={`video-${i}`} className="relative bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 group/video aspect-video">
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
                        {['安全帽', '气体检测仪', '移动摄像头'].map((label, idx) => (
                          <div key={`hw-${idx}`} className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded hover:border-blue-500/40 transition-all cursor-pointer whitespace-nowrap group">
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
                        {['人员跌倒', '人员越界', '违规抽烟', '未佩戴安全帽', '烟火检测'].map((label, idx) => (
                          <div key={`ai-${idx}`} className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded hover:border-red-500/40 transition-all cursor-pointer whitespace-nowrap group">
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
                           {['作业许可', '人员培训', '风险演练', '安全管理文件'].map(label => {
                              const isStatic = label === '作业许可';
                              return (
                                <div 
                                  key={label} 
                                  onClick={() => !isStatic && setActiveNode(label)}
                                  className={`w-14 h-14 rounded-full border shadow-xl flex items-center justify-center text-center p-1 shrink-0 transition-all group relative ${isStatic ? 'cursor-default opacity-80 grayscale-[0.2]' : 'cursor-pointer hover:scale-110'} ${activeNode === label ? 'bg-purple-600 border-purple-600 scale-110 shadow-purple-500/40' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'}`}
                                >
                                   <span className={`text-[10px] font-black leading-tight transition-colors ${activeNode === label ? 'text-white' : 'text-purple-600 group-hover:text-purple-500'}`}>{label}</span>
                                   {!isStatic && activeNode === label && <motion.div layoutId="node-glow" className="absolute inset-0 rounded-full bg-purple-400/20 animate-pulse" />}
                                </div>
                              );
                           })}
                        </div>
                     </div>

                     <div className="w-8 h-0.5 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 shrink-0" />

                     {/* Step 2: During Job */}
                     <div className="flex items-center gap-3 relative">
                        <div className="w-10 h-16 bg-[#3b82f6] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 relative z-10 shrink-0">
                           <span className="text-white font-black text-[11px] [writing-mode:vertical-lr] tracking-[0.05em]">作业中</span>
                        </div>
                        <div className="relative flex items-center gap-4 justify-center px-3 p-2 border border-dashed border-blue-100 dark:border-blue-900/40 rounded-2xl bg-blue-50/5">
                           <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex flex-col items-center justify-center text-white shadow-xl shadow-blue-500/40 border-2 border-white dark:border-slate-800 text-center p-1 relative z-10 group hover:scale-110 transition-transform cursor-pointer">
                              <Monitor size={16} />
                              <span className="text-[10px] font-black leading-tight mt-1">智能监控</span>
                           </div>
                           <div 
                             onClick={() => setActiveNode('管理人员到岗签到')}
                             className={`w-16 h-16 rounded-full flex flex-col items-center justify-center shadow-xl border-2 text-center p-1 relative z-10 cursor-pointer transition-all group ${activeNode === '管理人员到岗签到' ? 'bg-blue-600 border-blue-600 scale-110 text-white shadow-blue-500/40' : 'bg-white dark:bg-slate-800 border-blue-50 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 hover:scale-110'}`}
                           >
                              <User size={16} />
                              <span className={`text-[8px] font-black leading-tight mt-1 ${activeNode === '管理人员到岗签到' ? 'text-white' : ''}`}>管理人员到岗签到</span>
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
                           {['作业结束', '反违章报告'].map(label => {
                              const isStatic = label === '作业结束';
                              return (
                                <div 
                                  key={label} 
                                  onClick={() => !isStatic && setActiveNode(label)}
                                  className={`w-14 h-14 rounded-full border shadow-xl flex items-center justify-center text-center p-1 shrink-0 transition-all group relative ${isStatic ? 'cursor-default opacity-80 grayscale-[0.2]' : 'cursor-pointer hover:scale-110'} ${activeNode === label ? 'bg-emerald-600 border-emerald-600 scale-110 shadow-emerald-500/40' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'}`}
                                >
                                   <span className={`text-[10px] font-black leading-tight transition-colors ${activeNode === label ? 'text-white' : 'text-emerald-600 group-hover:text-emerald-500'}`}>{label}</span>
                                </div>
                              );
                           })}
                        </div>
                     </div>
                  </div>
               </div>

               {/* Bottom Panels: Node Monitoring & Alarms/Gas */}
               <div className="grid grid-cols-12 gap-4 pb-4 shrink-0">
                  {/* Left Column: Node Monitoring */}
                  <div className="col-span-12 lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm transition-colors flex flex-col overflow-hidden h-[320px]">
                     <div className="flex items-center justify-between mb-4 shrink-0">
                        <div className="flex items-center gap-2">
                           <div className="p-1.5 bg-orange-100 dark:bg-orange-900/20 text-orange-600 rounded-lg">
                              <LayoutDashboard size={14} />
                           </div>
                           <h3 className="text-[14px] font-black text-slate-800 dark:text-white uppercase tracking-tight">
                              节点详情 {activeNode && <span className="text-blue-500 ml-1">· {activeNode}</span>}
                           </h3>
                        </div>
                        <div className="px-2 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[8px] text-slate-400 font-bold uppercase tracking-widest shadow-sm">
                           NODE_STATUS
                        </div>
                     </div>
                     
                     <div className="flex-1 overflow-y-auto no-scrollbar">
                        {renderNodeDetailContent()}
                     </div>
                  </div>

                  {/* Right Column: Tab Switcher (Alarms / Gas) */}
                  <div className="col-span-12 lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm transition-colors flex flex-col overflow-hidden h-[320px]">
                     <div className="flex items-center gap-3 mb-1.5 border-b border-slate-100 dark:border-slate-800 shrink-0">
                        <button 
                          onClick={() => setActiveBottomTab('gas')}
                          className={`flex items-center gap-1 pb-1 transition-all relative ${activeBottomTab === 'gas' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                           <Activity size={10} className={activeBottomTab === 'gas' ? 'text-blue-600' : 'text-slate-400'} />
                           <h3 className="text-[14px] font-black uppercase tracking-tight">气体检测</h3>
                           {activeBottomTab === 'gas' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
                        </button>
                        <button 
                          onClick={() => setActiveBottomTab('alarm')}
                          className={`flex items-center gap-1 pb-1 transition-all relative ${activeBottomTab === 'alarm' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                           <Bell size={10} className={activeBottomTab === 'alarm' ? 'text-blue-600' : 'text-slate-400'} />
                           <h3 className="text-[14px] font-black uppercase tracking-tight">告警检测</h3>
                           {activeBottomTab === 'alarm' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
                        </button>
                     </div>

                     <div className="flex-1 overflow-hidden">
                        <AnimatePresence mode="wait">
                           {activeBottomTab === 'gas' ? (
                              <motion.div 
                                 key="gas"
                                 initial={{ opacity: 0, scale: 0.98 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 exit={{ opacity: 0, scale: 0.98 }}
                                 className="flex flex-col gap-3 h-full overflow-hidden"
                              >
                                 {/* 4-Block Gas Grid */}
                                 <div className="grid grid-cols-4 gap-2 shrink-0">
                                    {[
                                       { name: '甲烷', val: 25, unit: '0-100%LEL', bg: 'bg-rose-50 dark:bg-rose-500/10', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-100 dark:border-rose-900/30' },
                                       { name: '硫化氢', val: 20, unit: '0-100PPM', bg: 'bg-rose-50 dark:bg-rose-500/10', text: 'text-rose-600 dark:text-rose-400', border: 'border-rose-100 dark:border-rose-900/30' },
                                       { name: '一氧化碳', val: 18, unit: '0-100PPM', bg: 'bg-sky-50 dark:bg-sky-500/10', text: 'text-sky-600 dark:text-sky-400', border: 'border-sky-100 dark:border-sky-900/30' },
                                       { name: '氧气', val: 20, unit: '0-30%VOL', bg: 'bg-sky-50 dark:bg-sky-500/10', text: 'text-sky-600 dark:text-sky-400', border: 'border-sky-100 dark:border-sky-900/30' },
                                    ].map((item, idx) => (
                                       <div key={idx} className={`${item.bg} ${item.border} rounded-xl p-2 flex flex-col justify-center items-center h-[72px] shadow-sm border`}>
                                          <span className={`text-[10px] font-black opacity-80 uppercase tracking-wider ${item.text}`}>{item.name}</span>
                                          <span className={`text-[20px] font-black leading-none my-1 ${item.text}`}>{item.val}</span>
                                          <span className={`text-[7px] font-bold opacity-60 truncate w-full text-center ${item.text}`}>{item.unit}</span>
                                       </div>
                                    ))}
                                 </div>

                                 {/* Trend Chart Area */}
                                 <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 p-2 flex flex-col overflow-hidden">
                                    <div className="flex items-center justify-between mb-1.5 px-1">
                                       <h4 className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight flex items-center gap-1.5">
                                          <div className="w-1 h-3 bg-blue-500 rounded-full" />
                                          趋势分析 (Trend Analysis)
                                       </h4>
                                       <div className="flex gap-2">
                                          {['甲烷', '硫化氢', '一氧化碳', '氧气'].map((label, idx) => (
                                             <div key={label} className="flex items-center gap-1">
                                                <div className={`w-1.5 h-1.5 rounded-full ${['bg-red-500', 'bg-emerald-500', 'bg-yellow-500', 'bg-blue-500'][idx]}`} />
                                                <span className="text-[7px] text-slate-400 font-bold uppercase">{label}</span>
                                             </div>
                                          ))}
                                       </div>
                                    </div>
                                    <div className="flex-1 w-full">
                                       <ResponsiveContainer width="100%" height="100%">
                                          <LineChart data={GAS_TREND_DATA} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                                             <XAxis 
                                                dataKey="time" 
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{ fontSize: 7, fontWeight: 700, fill: '#64748b' }} 
                                             />
                                             <YAxis 
                                                axisLine={false} 
                                                tickLine={false} 
                                                tick={{ fontSize: 7, fontWeight: 700, fill: '#64748b' }} 
                                             />
                                             <Tooltip 
                                                contentStyle={{ 
                                                   backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                                                   border: 'none', 
                                                   borderRadius: '8px',
                                                   fontSize: '9px',
                                                   color: '#fff'
                                                }}
                                             />
                                             <Line type="monotone" dataKey="ch4" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={{ r: 4 }} isAnimationActive={false}/>
                                             <Line type="monotone" dataKey="h2s" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 4 }} isAnimationActive={false}/>
                                             <Line type="monotone" dataKey="co" stroke="#f59e0b" strokeWidth={2} dot={false} activeDot={{ r: 4 }} isAnimationActive={false}/>
                                             <Line type="monotone" dataKey="o2" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} isAnimationActive={false}/>
                                          </LineChart>
                                       </ResponsiveContainer>
                                    </div>
                                 </div>
                              </motion.div>
                           ) : (
                              <motion.div 
                                 key="alarm"
                                 initial={{ opacity: 0, scale: 0.98 }}
                                 animate={{ opacity: 1, scale: 1 }}
                                 exit={{ opacity: 0, scale: 0.98 }}
                                 className="grid grid-cols-1 gap-2 h-full overflow-y-auto no-scrollbar"
                              >
                                {[{ t: '违规入侵', time: '12:23', type: '异常', img: 'https://images.unsplash.com/photo-1542060717-d670f55cf55d?w=100' },
                                  { t: '安全帽违规', time: '12:45', type: '异常', img: 'https://images.unsplash.com/photo-1579309196904-11d619d02a3a?w=100' },
                                  { t: '有害气体超标', time: '13:05', type: '预警', img: 'https://images.unsplash.com/photo-1517089591965-c96301389474?w=100' }
                                 ].map((alarm, idx) => (
                                   <div key={`alarm-${idx}`} className="flex items-center justify-between p-2 bg-slate-50/50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800 transition-all hover:bg-white dark:hover:bg-slate-800 group">
                                      <div className="flex items-center gap-3">
                                         <div className="w-10 h-7 rounded border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0 shadow-sm">
                                            <img src={alarm.img} className="w-full h-full object-cover" alt="alarm" />
                                         </div>
                                         <div className="min-w-0">
                                            <h4 className="text-[10px] font-black text-slate-800 dark:text-slate-100 leading-none truncate mb-1">{alarm.t}</h4>
                                            <span className="text-[8px] text-slate-400 font-bold inline-block">{alarm.time}</span>
                                         </div>
                                      </div>
                                      <span className={`px-2 py-0.5 rounded text-[8px] font-black ${alarm.type === '异常' ? 'bg-red-100 text-red-500' : 'bg-orange-100 text-orange-500'}`}>
                                         {alarm.type}
                                      </span>
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
                <ActionBtn icon={Activity} label="人员生命体征" onClick={() => setShowVitalSigns(true)} />
                <ActionBtn icon={HardHat} label="安全帽" onClick={() => setShowHelmetMonitoring(true)} />
                <ActionBtn icon={MapPin} label="3D人员定位" onClick={() => setShowPersonnelPositioning(true)} />
             </div>
          </motion.div>

          <AnimatePresence>
            {showVitalSigns && (
              <VitalSignsModal 
                key="vital-signs-modal"
                onClose={() => setShowVitalSigns(false)} 
                onViewArchive={(id) => setShowPersonArchive(id)} 
              />
            )}
            {showPersonArchive && (
              <PersonnelArchiveModal 
                key="personnel-archive-modal"
                personId={showPersonArchive} 
                onClose={() => setShowPersonArchive(null)} 
              />
            )}
            {showHelmetMonitoring && (
              <HelmetMonitoringModal 
                key="helmet-monitoring-modal"
                onClose={() => setShowHelmetMonitoring(false)}
              />
            )}
            {showPersonnelPositioning && (
              <PersonnelPositioningModal 
                key="personnel-positioning-modal"
                onClose={() => setShowPersonnelPositioning(false)}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const ActionBtn = ({ icon: Icon, label, onClick }: any) => (
  <div onClick={onClick} className="flex flex-col items-center gap-1 cursor-pointer group w-full px-1 text-center">
    <div className="p-2 bg-white/50 dark:bg-slate-800/50 border border-white/50 dark:border-white/10 text-slate-500 dark:text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-lg transition-all shadow-md active:scale-95">
       <Icon size={16} />
    </div>
    <span className="text-[7px] font-black text-slate-500 dark:text-slate-400 group-hover:text-blue-600 transition-colors uppercase text-center leading-none mt-0.5 break-words max-w-[60px]">{label}</span>
  </div>
);
