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
  ChevronDown,
  ChevronLeft,
  X,
  Activity
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';

export const BackendView: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = React.useState('个人工作台');

  const menuGroups = [
    {
      group: '系统导航',
      items: [
        { icon: Home, label: '个人工作台' },
      ]
    },
    {
      group: '核心管理',
      items: [
        { icon: FileText, label: '作业票管理' },
        { icon: Briefcase, label: '供应商管理' },
        { icon: Users, label: '人员管理' },
        { icon: Clock, label: '培训管理' },
      ]
    },
    {
      group: '资源设备',
      items: [
        { icon: Video, label: '摄像头管理' },
        { icon: Activity, label: '气体检测配置' },
        { icon: Layout, label: '门禁管理' },
      ]
    },
    {
      group: '系统设置',
      items: [
        { icon: Settings, label: '用户管理' },
      ]
    }
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case '作业票管理':
        return <ManagementTable title="作业票管理" columns={['单号', '作业名称', '申请人', '审批状态', '时间', '风险等级']} />;
      case '供应商管理':
        return <ManagementTable title="供应商管理" columns={['供应商名称', '联系人', '类别', '资质状态', '人员总数', '信用评价']} />;
      case '人员管理':
        return <ManagementTable title="人员管理" columns={['姓名', '所属公司', '角色', '工种', '最近考试', '状态']} />;
      case '培训管理':
        return <ManagementTable title="培训管理" columns={['课程名称', '讲师', '已参加人数', '合格率', '发布日期', '状态']} />;
      case '摄像头管理':
        return <ManagementTable title="摄像头管理" columns={['设备号', '位置', '类型', '连接状态', '录制状态', 'IP地址']} />;
      case '气体检测配置':
        return <ManagementTable title="气体检测配置" columns={['传感器ID', '检测类型', '单位', '告警阈值', '当前状态', '上次巡检']} />;
      case '门禁管理':
        return <ManagementTable title="门禁管理" columns={['门口名称', '设备型号', '人流量', '在线状态', '固件版本', '最后活跃']} />;
      case '用户管理':
        return <ManagementTable title="用户管理" columns={['用户名', '真实姓名', '所属部门', '角色', '最后在线', '账号状态']} />;
      default:
        return (
          <>
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
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
           <span className="font-black text-slate-800 dark:text-white tracking-tight">后台管理系统</span>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          <div className="relative mb-2">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索功能..." 
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg py-2 pl-9 pr-3 text-xs outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {menuGroups.map((group) => (
            <div key={group.group} className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest px-2 mb-2">{group.group}</p>
              {group.items.map((item) => (
                <div 
                  key={item.label}
                  onClick={() => setActiveMenu(item.label)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                    activeMenu === item.label 
                      ? 'bg-blue-600 dark:bg-blue-600 text-white shadow-lg shadow-blue-500/20 font-bold' 
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={16} />
                    <span className="text-[12px]">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between shrink-0 shadow-sm relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-600 dark:text-slate-400">后台管理</span>
            <ChevronRight size={14} className="text-slate-300" />
            <span className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight">{activeMenu}</span>
          </div>

          <div className="flex items-center gap-5">
             <button onClick={toggleTheme} className="p-2 text-slate-400 hover:text-blue-500 transition-colors bg-slate-50 dark:bg-slate-800 rounded-lg">
               {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
             </button>
             <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors relative bg-slate-50 dark:bg-slate-800 rounded-lg">
               <Bell size={18} />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
             </button>
             <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
             <button 
               onClick={() => navigate('/dashboard')}
               className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-black hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-black/10"
             >
               <LogOut size={14} /> 退出后台
             </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50 dark:bg-slate-950/50">
           {/* Tab bar */}
           <div className="flex gap-2">
              <div className="px-4 py-1.5 bg-blue-600 text-white rounded-xl text-[10px] font-black flex items-center gap-2 shadow-md shadow-blue-500/20">
                <div className="w-1 h-1 bg-white rounded-full animate-pulse" /> {activeMenu}
              </div>
              <div className="px-4 py-1.5 bg-white dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-slate-800 rounded-xl text-[10px] font-bold cursor-pointer hover:bg-slate-50 transition-all flex items-center gap-2">
                个人工作台 <X size={10} />
              </div>
           </div>

           {renderContent()}
        </div>
      </main>
    </div>
  );
};

const ManagementTable = ({ title, columns }: { title: string, columns: string[] }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{title}</h2>
           <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">系统已加载 {title} 相关业务数据，共计 256 条记录</p>
        </div>
        <div className="flex gap-3">
           <div className="relative">
             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input type="text" placeholder="全局搜索..." className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-blue-500/20 w-64 shadow-sm" />
           </div>
           <button className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-black shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all">
             + 新建记录
           </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">序号</th>
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{col}</th>
              ))}
              <th className="px-6 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
              <tr key={row} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                <td className="px-6 py-4 text-[11px] font-bold text-slate-400 tabular-nums">#{row.toString().padStart(3, '0')}</td>
                {columns.map((_, i) => (
                  <td key={i} className="px-6 py-4">
                    {i === columns.length - 1 ? (
                      <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded text-[9px] font-black">已完成</span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">示例数据-{row}-{i}</span>
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 text-right">
                   <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-blue-600 dark:text-blue-400 text-[10px] font-black hover:underline underline-offset-4">查看</button>
                      <button className="text-slate-400 dark:text-slate-500 text-[10px] font-black hover:underline underline-offset-4">编辑</button>
                      <button className="text-red-500 dark:text-red-400 text-[10px] font-black hover:underline underline-offset-4">删除</button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 px-6 bg-slate-50/50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
           <span className="text-[10px] font-bold text-slate-400 tracking-tight">显示第 1-8 条，共 256 条记录</span>
           <div className="flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm"><ChevronLeft size={14} /></button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white font-black text-xs shadow-md shadow-blue-500/20">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-white dark:hover:bg-slate-800 font-bold text-xs transition-all shadow-sm">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm"><ChevronRight size={14} /></button>
           </div>
        </div>
      </div>
    </div>
  );
};
