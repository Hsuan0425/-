import { mockAgents } from "@/constants/mock-data";

export default function AgentPanel() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <h2 className="mb-4 text-xl font-semibold text-slate-100">Agent 狀態</h2>
      <div className="space-y-3">
        {mockAgents.map((agent) => (
          <div key={agent.name} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="flex items-center justify-between">
              <div className="font-medium text-slate-100">{agent.name}</div>
              <span className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-300">{agent.status}</span>
            </div>
            <div className="mt-2 text-sm text-slate-400">{agent.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}