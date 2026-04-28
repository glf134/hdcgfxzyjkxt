import React from 'react';
import { X, Camera, Mic, Activity } from 'lucide-react';
import { motion } from 'motion/react';

interface HelmetMonitoringModalProps {
  onClose: () => void;
}

const MOCK_STREAMS = [
  { id: '01', type: '作业主面', title: '锅炉检修专工：张三', live: true },
  { id: '02', type: '侧面', title: '锅炉检修专工：张三', live: false },
  { id: '01', type: '作业主面', title: '锅炉检修专工：张三', live: true },
  { id: '02', type: '侧面', title: '锅炉检修专工：张三', live: false },
];

export const HelmetMonitoringModal: React.FC<HelmetMonitoringModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white dark:bg-slate-900 w-full max-w-[1200px] max-h-[90vh] rounded-[2rem] flex flex-col font-sans relative z-10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <header className="h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Camera size={18} className="text-white" />
            </div>
            <h1 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">安全帽实时监控</h1>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 p-6 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50">
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 max-w-[1000px] mx-auto">
            {MOCK_STREAMS.map((stream, idx) => (
              <div key={idx} className="space-y-2">
                <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 pl-1">{stream.title}</h3>
                <div className="relative aspect-video bg-slate-900 rounded-[1.5rem] overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 group">
                  <img 
                    src={`https://images.unsplash.com/photo-1517089591965-c96301389474?w=800&q=80&idx=${idx}`} 
                    className="w-full h-full object-cover opacity-60"
                    alt="helmet stream"
                  />
                  
                  {/* Overlay labels */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="px-2 py-1 bg-black/60 backdrop-blur-md text-[10px] font-black text-white rounded-lg border border-white/10 uppercase">
                      CAM-{stream.id} {stream.type}
                    </div>
                    {stream.live && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500 text-white text-[10px] font-black rounded-lg shadow-lg">
                        <Activity size={10} /> LIVE
                      </div>
                    )}
                  </div>

                  {/* Bottom Controls (Indicators) */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-3">
                    <div className="p-2 bg-black/40 backdrop-blur-sm rounded-full text-white/80 border border-white/10">
                      <Camera size={20} />
                    </div>
                    <div className="p-2 bg-black/40 backdrop-blur-sm rounded-full text-white/80 border border-white/10">
                      <Mic size={20} />
                    </div>
                  </div>

                  {/* Scan line effect or similar could be added here */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-10 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
