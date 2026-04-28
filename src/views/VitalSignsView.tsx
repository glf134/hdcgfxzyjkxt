import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  LayoutGrid, 
  List, 
  Heart, 
  Activity, 
  Thermometer,
  ArrowLeft,
  Search,
  User,
  ShieldCheck
} from 'lucide-react';

interface PersonnelVitalSigns {
  id: string;
  name: string;
  role: string;
  unit: string;
  phone: string;
  status: 'working' | 'resting' | 'offline';
  heartRate: number;
  oxygen: number;
  temperature: number;
}

const MOCK_DATA: PersonnelVitalSigns[] = [
  { id: '1', name: '马艾敏', role: '作业人员', unit: '河北沧发发电有限公司', phone: '15803199154', status: 'working', heartRate: 78, oxygen: 98, temperature: 36.5 },
  { id: '2', name: '李安全', role: '监护人', unit: '甘肃电力建设一公司', phone: '139****6666', status: 'working', heartRate: 72, oxygen: 99, temperature: 36.4 },
  { id: '3', name: '王小明', role: '作业人员', unit: '外协单位-宏达检修', phone: '135****1234', status: 'working', heartRate: 85, oxygen: 97, temperature: 36.8 },
  { id: '4', name: '赵强', role: '技术员', unit: '甘肃电力建设一公司', phone: '137****2222', status: 'resting', heartRate: 0, oxygen: 0, temperature: 0 },
  { id: '5', name: '陈大勇', role: '作业人员', unit: '外协单位-宏达检修', phone: '136****3333', status: 'working', heartRate: 82, oxygen: 98, temperature: 36.6 },
  { id: '6', name: '刘洋', role: '作业人员', unit: '甘肃电力建设一公司', phone: '131****4444', status: 'offline', heartRate: 0, oxygen: 0, temperature: 0 },
  { id: '7', name: '孙伟', role: '作业人员', unit: '外协单位-宏达检修', phone: '132****5555', status: 'working', heartRate: 76, oxygen: 99, temperature: 36.3 },
  { id: '8', name: '周杰', role: '作业人员', unit: '甘肃电力建设一公司', phone: '133****6666', status: 'working', heartRate: 88, oxygen: 96, temperature: 37.1 },
  { id: '9', name: '吴磊', role: '作业人员', unit: '外协单位-宏达检修', phone: '134****7777', status: 'resting', heartRate: 0, oxygen: 0, temperature: 0 },
  { id: '10', name: '郑凯', role: '作业人员', unit: '甘肃电力建设一公司', phone: '135****8888', status: 'working', heartRate: 80, oxygen: 98, temperature: 36.7 },
];

interface VitalSignsModalProps {
  onClose: () => void;
  onViewArchive: (id: string) => void;
}

export const VitalSignsModal: React.FC<VitalSignsModalProps> = ({ onClose, onViewArchive }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-[#f8fafc] w-full max-w-[1200px] max-h-[90vh] rounded-[2.5rem] flex flex-col font-sans relative z-10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <ShieldCheck size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">作业人员实时监测</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5">Personnel Monitoring & Vital Signs</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
               <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-700 transition-all">
                  <LayoutGrid size={14} />
                  卡片视图
               </button>
               <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold bg-white text-blue-600 shadow-sm border border-blue-100 transition-all">
                  <List size={14} />
                  列表视图
               </button>
            </div>
            
            <button 
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-all border border-slate-200"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-all">
             {/* Filters */}
             <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-4">
                   <div className="relative">
                      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="搜索姓名、单位..." 
                        className="w-80 h-11 bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 mr-2">状态筛选:</span>
                      {['全部', '作业中', '休息中', '离线'].map(label => (
                        <button key={`filter-${label}`} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${label === '全部' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-500'}`}>
                          {label}
                        </button>
                      ))}
                   </div>
                </div>
             </div>

             {/* Table */}
             <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-50 text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                      <th className="px-8 py-5 font-bold">人员信息</th>
                      <th className="px-8 py-5 font-bold">所属单位</th>
                      <th className="px-8 py-5 font-bold text-center">状态</th>
                      <th className="px-8 py-5 font-bold text-center">实时体征</th>
                      <th className="px-8 py-5 font-bold text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {MOCK_DATA.map(item => (
                      <tr key={`person-${item.id}`} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 group-hover:bg-blue-100 group-hover:text-blue-500 transition-all">
                                <User size={24} />
                             </div>
                             <div>
                                <div className="text-base font-black text-slate-800 tracking-tight">{item.name}</div>
                                <div className="text-xs font-bold text-slate-400 mt-0.5">{item.role}</div>
                             </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-sm font-bold text-slate-700">{item.unit}</div>
                          <div className="text-xs text-slate-400 font-medium mt-1 tabular-nums">{item.phone}</div>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${
                            item.status === 'working' ? 'bg-blue-50 border-blue-200 text-blue-600' :
                            item.status === 'resting' ? 'bg-slate-50 border-slate-200 text-slate-500' :
                            'bg-red-50 border-red-200 text-red-500'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                               item.status === 'working' ? 'bg-blue-500 animate-pulse' :
                               item.status === 'resting' ? 'bg-slate-400' :
                               'bg-red-500'
                            }`} />
                            {item.status === 'working' ? '作业中' : item.status === 'resting' ? '休息中' : '离线'}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          {item.status === 'working' ? (
                            <div className="flex items-center justify-center gap-6">
                              <div className="flex items-center gap-2 group/vital">
                                <Heart size={16} className="text-red-500 group-hover/vital:scale-110 transition-transform" />
                                <span className="text-sm font-black text-slate-700 tabular-nums">{item.heartRate}</span>
                              </div>
                              <div className="flex items-center gap-2 group/vital">
                                <Activity size={16} className="text-blue-500 group-hover/vital:scale-110 transition-transform" />
                                <span className="text-sm font-black text-slate-700 tabular-nums">{item.oxygen}%</span>
                              </div>
                              <div className="flex items-center gap-2 group/vital">
                                <Thermometer size={16} className="text-orange-500 group-hover/vital:scale-110 transition-transform" />
                                <span className="text-sm font-black text-slate-700 tabular-nums">{item.temperature}℃</span>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center text-slate-300 font-bold">--</div>
                          )}
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button 
                            onClick={() => onViewArchive(item.id)}
                            className="px-5 py-2 rounded-xl bg-white border border-slate-200 text-blue-600 font-black text-xs hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm active:scale-95"
                          >
                            查看档案
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
