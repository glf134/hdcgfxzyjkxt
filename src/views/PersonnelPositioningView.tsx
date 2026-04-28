import React from 'react';
import { X, MapPin, Box, Users, Activity, Layers, Target } from 'lucide-react';
import { motion } from 'motion/react';

interface PersonnelPositioningModalProps {
  onClose: () => void;
}

const MOCK_WORKERS = [
  { id: '1', name: '张三', role: '监护人', pos: { x: '45%', y: '30%' }, status: 'online', heartRate: 78 },
  { id: '2', name: '李四', role: '作业人员', pos: { x: '62%', y: '58%' }, status: 'online', heartRate: 82 },
  { id: '3', name: '王五', role: '作业人员', pos: { x: '30%', y: '75%' }, status: 'warning', heartRate: 105 },
];

export const PersonnelPositioningModal: React.FC<PersonnelPositioningModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="bg-slate-950 w-full max-w-[1400px] h-[85vh] rounded-[3rem] flex flex-col font-sans relative z-10 shadow-2xl border border-white/5 overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Technical Header */}
        <header className="h-16 bg-slate-900/50 border-b border-white/5 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <MapPin size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black text-white tracking-widest uppercase">3D Personnel Positioning</h1>
              <p className="text-[10px] text-blue-400 font-bold tracking-tighter uppercase opacity-60">Confined Space Monitoring System v2.4</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-6 px-6 py-2 bg-white/5 rounded-full border border-white/5 mr-4">
                <StatusItem label="在线人数" val="12" color="bg-emerald-500" />
                <StatusItem label="预警提醒" val="01" color="bg-orange-500" />
                <StatusItem label="系统状态" val="NORMAL" color="bg-blue-500 text-[10px]" />
             </div>
             <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-all rounded-full hover:bg-white/5">
                <X size={24} />
             </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar: Space Info */}
          <div className="w-80 border-r border-white/5 p-6 space-y-8 flex flex-col overflow-y-auto no-scrollbar">
             <section className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                   <Box size={12} /> 当前作业区域
                </h3>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                   <p className="text-sm font-black text-white mb-1">#1 炉膛有限空间</p>
                   <p className="text-[10px] text-slate-400 font-medium">作业类型：高处/受限空间作业</p>
                   <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                      <div>
                         <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">深度</p>
                         <p className="text-xs font-black text-blue-400">12.5m</p>
                      </div>
                      <div>
                         <p className="text-[9px] text-slate-500 font-bold uppercase mb-1">温度</p>
                         <p className="text-xs font-black text-white">28.4°C</p>
                      </div>
                   </div>
                </div>
             </section>

             <section className="space-y-4 flex-1">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                   <Users size={12} /> 实时人员列表
                </h3>
                <div className="space-y-2">
                   {MOCK_WORKERS.map(worker => (
                      <div key={worker.id} className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 hover:bg-white/5 transition-all cursor-pointer group">
                         <div className="flex justify-between items-start mb-2">
                            <div>
                               <p className="text-xs font-black text-white group-hover:text-blue-400 transition-colors">{worker.name}</p>
                               <p className="text-[9px] text-slate-500 font-bold uppercase">{worker.role}</p>
                            </div>
                            <div className={`p-1 rounded-full ${worker.status === 'warning' ? 'bg-red-500' : 'bg-emerald-500'} animate-pulse`} />
                         </div>
                         <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center gap-1">
                               <Activity size={10} className="text-blue-500" />
                               <span className="text-[10px] font-black text-white/60">{worker.heartRate} bpm</span>
                            </div>
                            <div className="flex items-center gap-1">
                               <Target size={10} className="text-orange-500" />
                               <span className="text-[10px] font-black text-white/60">POS-A2</span>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </section>

             <button className="w-full py-4 bg-blue-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-blue-500/10 hover:bg-blue-700 transition-all uppercase tracking-widest active:scale-95">
                展开详细看板
             </button>
          </div>

          {/* Main 3D View Container */}
          <div className="flex-1 relative bg-slate-900 group">
             {/* 3D Wireframe Mockup */}
             <div className="absolute inset-0 flex items-center justify-center p-20 select-none">
                <div className="relative w-full h-full max-w-4xl aspect-square flex items-center justify-center">
                   {/* Central Wireframe Cylinder */}
                   <div className="absolute inset-0 border-2 border-blue-500/20 rounded-[4rem] rotate-45 transform skew-x-12 animate-pulse" />
                   <div className="absolute inset-10 border border-blue-500/10 rounded-[4rem] -rotate-[15deg] transform -skew-x-6" />
                   
                   {/* Vertical Grid Lines */}
                   <div className="absolute inset-0 flex justify-around pointer-events-none opacity-20">
                      {[1,2,3,4,5,6].map(i => <div key={i} className="w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent" />)}
                   </div>
                   
                   {/* Floor Grid */}
                   <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[120%] h-[120px] bg-blue-500/5 [transform:perspective(1000px)_rotateX(60deg)] rounded-[3rem] border border-blue-500/20 flex items-center justify-center">
                      <div className="w-full h-full grid grid-cols-6 grid-rows-6">
                         {Array.from({length: 36}).map((_, i) => <div key={i} className="border-[0.5px] border-blue-500/10" />)}
                      </div>
                   </div>

                   {/* Worker Points */}
                   {MOCK_WORKERS.map(worker => (
                      <motion.div
                         key={worker.id}
                         initial={{ opacity: 0, scale: 0 }}
                         animate={{ opacity: 1, scale: 1 }}
                         style={{ left: worker.pos.x, top: worker.pos.y }}
                         className="absolute z-20 group/point cursor-pointer"
                      >
                         <div className="relative">
                            <div className={`w-4 h-4 rounded-full ${worker.status === 'warning' ? 'bg-red-500' : 'bg-blue-500'} shadow-[0_0_15px_rgba(59,130,246,0.5)] border-2 border-white`} />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-blue-500/30 animate-ping" />
                            
                            {/* Hover Tag */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-slate-900 border border-white/10 p-2 rounded-xl text-center min-w-[100px] opacity-0 group-hover/point:opacity-100 transition-all translate-y-2 group-hover/point:translate-y-0 shadow-2xl">
                               <p className="text-[10px] font-black text-white">{worker.name}</p>
                               <div className="w-full h-px bg-white/10 my-1.5" />
                               <div className="flex items-center justify-center gap-2">
                                  <Activity size={8} className={worker.status === 'warning' ? 'text-red-500' : 'text-blue-500'} />
                                  <span className="text-[8px] font-bold text-white/60">{worker.heartRate} bpm</span>
                               </div>
                            </div>
                         </div>
                      </motion.div>
                   ))}

                   {/* Tech Decorative Elements */}
                   <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-blue-500/20 rounded-tr-[3rem]" />
                   <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-blue-500/20 rounded-bl-[3rem]" />
                </div>
             </div>

             {/* View Controls Overlay */}
             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/40 backdrop-blur-xl p-2 px-6 rounded-full border border-white/5 shadow-2xl">
                <ViewBtn icon={Box} label="模型视图" active />
                <ViewBtn icon={Layers} label="分层解析" />
                <ViewBtn icon={MapPin} label="坐标校准" />
             </div>

             {/* HUD Overlay Details */}
             <div className="absolute top-8 right-8 text-right space-y-2">
                <div className="bg-black/20 backdrop-blur-md p-3 rounded-2xl border border-white/5">
                   <p className="text-[9px] font-black text-blue-400 tracking-widest uppercase">Current Projection</p>
                   <p className="text-lg font-black text-white tabular-nums tracking-tighter">RENDER_ID: 8824-A</p>
                </div>
                <div className="bg-black/20 backdrop-blur-md p-3 rounded-2xl border border-white/5 flex gap-4">
                   <div>
                      <p className="text-[8px] font-bold text-slate-500 uppercase">FPS</p>
                      <p className="text-[10px] font-black text-emerald-500">120.0</p>
                   </div>
                   <div>
                      <p className="text-[8px] font-bold text-slate-500 uppercase">Latency</p>
                      <p className="text-[10px] font-black text-white">4ms</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusItem = ({ label, val, color }: { label: string, val: string, color: string }) => (
  <div className="flex items-center gap-3">
     <div className={`w-2 h-2 rounded-full ${color}`} />
     <div>
        <p className="text-[8px] font-black text-slate-500 uppercase tracking-tighter leading-none">{label}</p>
        <p className="text-xs font-black text-white mt-0.5">{val}</p>
     </div>
  </div>
);

const ViewBtn = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <button className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all group ${active ? 'bg-blue-600 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
     <Icon size={14} className={active ? 'text-white' : 'group-hover:text-blue-400'} />
     <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </button>
);
