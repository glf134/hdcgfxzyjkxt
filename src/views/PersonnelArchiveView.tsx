import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  X, 
  Printer, 
  ArrowLeft,
  User,
  Building,
  Briefcase,
  IdCard,
  Phone,
  Calendar,
  CheckCircle2,
  FileDown,
  Edit2,
  Trash2,
  Plus,
  LayoutGrid
} from 'lucide-react';

interface PersonnelArchiveModalProps {
  personId: string | null;
  onClose: () => void;
}

export const PersonnelArchiveModal: React.FC<PersonnelArchiveModalProps> = ({ personId, onClose }) => {
  const [activeTab, setActiveTab] = useState('cert');

  // Hardcoded for demo as per screenshot
  const person = {
    name: '马艾敏',
    company: '河北沧发发电有限公司',
    dept: '工程部',
    subCompany: '广东火电',
    nature: '长协承包商',
    team: '检修一班',
    gender: '男',
    age: '47',
    idCard: '130521197901115279',
    phone: '15803199154',
    role: '作业人员',
    jobTitle: '普通工人',
    entryReq: 'RCSQ20251105007',
    expiry: '2026-04-25',
    status: '已入生产区',
    photo: 'https://images.unsplash.com/photo-1542060717-d670f55cf55d?w=400&q=80'
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-slate-50 w-full max-w-[1300px] max-h-[95vh] rounded-[2.5rem] flex flex-col font-sans relative z-10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Top Header */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-all rounded-lg hover:bg-slate-50">
              <X size={20} />
            </button>
            <h1 className="text-lg font-black text-slate-800 tracking-tight">人员档案详情</h1>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-black hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 active:scale-95">
              <Printer size={14} />
              打印档案
            </button>
            <button onClick={onClose} className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-sm font-black hover:bg-slate-200 transition-all active:scale-95">
              关闭
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Basic Info Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 px-6 border-b border-slate-100 flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-600 rounded-full" />
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">基本信息</h2>
            </div>
            
            <div className="p-8 flex gap-10">
               {/* Info Form */}
               <div className="flex-1 grid grid-cols-3 gap-y-6 gap-x-8">
                  <InfoItem label="人员姓名" value={person.name} />
                  <InfoItem label="公司" value={person.company} />
                  <InfoItem label="管理部门" value={person.dept} />
                  
                  <InfoItem label="所属外委单位" value={person.subCompany} />
                  <InfoItem label="承包商性质" value={person.nature} />
                  <InfoItem label="班组" value={person.team} />
                  
                  <InfoItem label="性别" value={person.gender} required />
                  <InfoItem label="年龄" value={person.age} />
                  <InfoItem label="身份证号" value={person.idCard} required />
                  
                  <InfoItem label="联系电话" value={person.phone} />
                  <InfoItem label="角色" value={person.role} />
                  <InfoItem label="工种" value={person.jobTitle} />
                  
                  <InfoItem label="入场申请" value={person.entryReq} />
                  <InfoItem label="有效期" value={person.expiry} />
                  <InfoItem label="人员状态" value={person.status} />
               </div>

               {/* Profile Image */}
               <div className="w-[180px] flex flex-col items-center gap-3">
                  <div className="w-full aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner group relative">
                     <img src={person.photo} className="w-full h-full object-cover" alt="profile" />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                        <button className="p-2 bg-white rounded-full text-slate-800 shadow-lg active:scale-95">
                           <Edit2 size={16} />
                        </button>
                     </div>
                  </div>
                  <button className="text-blue-600 text-sm font-black hover:underline">上传</button>
               </div>
            </div>
          </div>

          {/* Details Tabs Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col min-h-[400px]">
             <div className="border-b border-slate-200 flex items-center px-4">
                {[
                  { id: 'cert', label: '证明材料' },
                  { id: 'exam', label: '考试记录' },
                  { id: 'violation', label: '违章记录' },
                  { id: 'project', label: '项目信息' }
                ].map(tab => (
                  <button 
                     key={`archive-tab-${tab.id}`}
                     onClick={() => setActiveTab(tab.id)}
                     className={`px-8 py-4 text-sm font-black relative transition-all ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    {tab.label}
                    {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
                  </button>
                ))}
             </div>

             <div className="flex-1 p-6">
                {activeTab === 'cert' && (
                  <div className="overflow-x-auto border border-slate-100 rounded-xl bg-white shadow-sm">
                     <table className="w-full text-left text-xs min-w-[1000px]">
                        <thead className="bg-slate-50/80 text-slate-400 font-bold uppercase tracking-wider">
                           <tr>
                              <th className="px-6 py-4 border-r border-slate-100">身份证正面照片</th>
                              <th className="px-6 py-4 border-r border-slate-100">身份证背面照片</th>
                              <th className="px-6 py-4 border-r border-slate-100">人员保险证明</th>
                              <th className="px-6 py-4 border-r border-slate-100">人员保险证明有效期</th>
                              <th className="px-6 py-4 border-r border-slate-100">人员体检合格证明</th>
                              <th className="px-6 py-4 border-r border-slate-100">人员体检合格证明有效期</th>
                              <th className="px-6 py-4">安全管理/特种作业资格证</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                           <tr>
                              <td className="px-6 py-10 border-r border-slate-100 text-center">
                                 <div className="flex items-center justify-center gap-3">
                                    <button className="text-blue-600 font-bold hover:underline">编辑</button>
                                    <button className="text-blue-600 font-bold hover:underline">下载</button>
                                    <button className="text-red-500 font-bold hover:underline">删除</button>
                                 </div>
                              </td>
                              <td className="px-6 py-10 border-r border-slate-100 text-center">
                                 <div className="flex items-center justify-center gap-3">
                                    <button className="text-blue-600 font-bold hover:underline">编辑</button>
                                    <button className="text-blue-600 font-bold hover:underline">下载</button>
                                    <button className="text-red-500 font-bold hover:underline">删除</button>
                                 </div>
                              </td>
                              <td className="px-6 py-10 border-r border-slate-100 text-center">
                                 <div className="flex items-center justify-center gap-3">
                                    <button className="text-blue-600 font-bold hover:underline">编辑</button>
                                    <button className="text-blue-600 font-bold hover:underline">下载</button>
                                    <button className="text-blue-600 font-bold hover:underline">预览</button>
                                 </div>
                              </td>
                              <td className="px-6 py-10 border-r border-slate-100 text-center font-bold text-slate-800">2026-04-04</td>
                              <td className="px-6 py-10 border-r border-slate-100 text-center">
                                 <div className="flex items-center justify-center gap-3">
                                    <button className="text-blue-600 font-bold hover:underline">编辑</button>
                                    <button className="text-blue-600 font-bold hover:underline">下载</button>
                                    <button className="text-blue-600 font-bold hover:underline">预览</button>
                                 </div>
                              </td>
                              <td className="px-6 py-10 border-r border-slate-100 text-center font-bold text-slate-800">2026-08-17</td>
                              <td className="px-6 py-10 text-center">
                                 <button className="text-blue-600 font-bold hover:underline">新建</button>
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                )}
                {activeTab !== 'cert' && (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-4 py-20">
                     <div className="p-4 bg-slate-50 rounded-full">
                        <LayoutGrid size={40} className="opacity-20" />
                     </div>
                     <span className="text-sm font-bold tracking-widest uppercase">暂无相关记录</span>
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, required }: { label: string, value: string, required?: boolean }) => (
  <div className="flex items-center gap-4 group">
    <label className="w-24 text-right text-xs font-bold text-slate-400 whitespace-nowrap shrink-0">
      {required && <span className="text-red-500 mr-1">*</span>}
      {label}:
    </label>
    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 h-10 flex items-center text-sm font-bold text-slate-800 shadow-sm group-hover:border-blue-400 group-hover:bg-blue-50/30 transition-all cursor-default">
      {value}
    </div>
  </div>
);
