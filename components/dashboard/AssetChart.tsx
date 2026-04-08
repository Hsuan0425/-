"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { mockAssetCurve } from "@/constants/mock-data";

export default function AssetChart() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <h2 className="mb-4 text-xl font-semibold text-slate-100">資產走勢圖</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockAssetCurve}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
            <Line type="monotone" dataKey="equity" strokeWidth={2} stroke="#f43f5e" dot />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}