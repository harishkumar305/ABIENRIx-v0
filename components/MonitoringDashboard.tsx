import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Activity, Zap, AlertTriangle, ArrowUpRight } from 'lucide-react';

const latencyData = [
  { time: '10:00', value: 120 },
  { time: '10:05', value: 132 },
  { time: '10:10', value: 101 },
  { time: '10:15', value: 85 },
  { time: '10:20', value: 45 },
  { time: '10:25', value: 42 },
  { time: '10:30', value: 40 },
];

const costData = [
  { name: 'Stripe', value: 400 },
  { name: 'R2', value: 120 },
  { name: 'Auth0', value: 250 },
  { name: 'UIR-X', value: 80 },
];

const MonitoringDashboard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden w-full max-w-5xl mx-auto flex flex-col md:flex-row">
      {/* Sidebar / InfraReferee */}
      <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-6 flex flex-col">
        <div className="flex items-center space-x-2 text-slate-900 font-bold mb-8">
            <Activity className="text-blue-600" />
            <span>InfraReferee™</span>
        </div>
        
        <div className="space-y-4 mb-auto">
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-sm">
                <div className="font-semibold text-slate-800 mb-1">Razorpay Latency Spike</div>
                <div className="text-slate-500 text-xs mb-2">10:15 AM · Mumbai Region</div>
                <div className="flex items-center text-green-600 text-xs font-medium">
                    <ArrowUpRight size={12} className="mr-1" />
                    Rerouted to Stripe
                </div>
            </div>
            
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-sm">
                 <div className="font-semibold text-slate-800 mb-1">S3 Cost Alert</div>
                 <div className="text-slate-500 text-xs mb-2">Projected +15% vs last month</div>
                 <div className="flex items-center text-blue-600 text-xs font-medium cursor-pointer hover:underline">
                    Apply R2 Savings Rule
                </div>
            </div>
        </div>

        <div className="mt-8 text-xs text-slate-400">
            System Status: <span className="text-green-600 font-semibold">Operational</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900">Global Overview</h3>
            <div className="flex space-x-2">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">Last 1 Hour</span>
                <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-medium">All Regions</span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart 1: Latency Optimization */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <Zap size={16} className="text-amber-500" />
                        <span className="font-semibold text-slate-700 text-sm">Avg. Request Latency</span>
                    </div>
                    <span className="text-green-500 text-xs font-bold">↓ 32% Improved</span>
                </div>
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={latencyData}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="time" hide />
                            <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                itemStyle={{ color: '#0f172a', fontSize: '12px' }} 
                            />
                            <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Chart 2: Cost Distribution */}
             <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                         <Activity size={16} className="text-purple-500" />
                        <span className="font-semibold text-slate-700 text-sm">Monthly Spend (Projected)</span>
                    </div>
                    <span className="text-green-500 text-xs font-bold">Savings Active</span>
                </div>
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={costData} layout="vertical">
                             <XAxis type="number" hide />
                             <YAxis dataKey="name" type="category" width={50} tick={{fontSize: 10, fill: '#64748b'}} />
                             <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                             <Bar dataKey="value" barSize={16} radius={[0, 4, 4, 0]}>
                                {costData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 3 ? '#22c55e' : '#cbd5e1'} />
                                ))}
                             </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
        
        {/* Bottom Alert Strip */}
        <div className="mt-6 flex items-center justify-between bg-yellow-50 p-3 rounded-lg border border-yellow-100">
             <div className="flex items-center space-x-3">
                 <AlertTriangle size={16} className="text-yellow-600" />
                 <span className="text-sm text-yellow-800 font-medium">3 anomalous spikes detected in AP-South-1</span>
             </div>
             <button className="text-xs font-bold text-yellow-700 hover:text-yellow-900">View Analysis →</button>
        </div>
      </div>
    </div>
  );
};

export default MonitoringDashboard;
