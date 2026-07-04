import { useState } from "react";
import { tasks, type Task } from "@/data/mockData";

function getDeadlineStatus(deadline: string): "overdue" | "today" | "upcoming" {
  const today = new Date("2026-07-04");
  const d = new Date(deadline);
  if (d < today) return "overdue";
  if (d.toDateString() === today.toDateString()) return "today";
  return "upcoming";
}

function DeadlineBadge({ deadline }: { deadline: string }) {
  const status = getDeadlineStatus(deadline);
  const [month, day] = deadline.slice(5).split("-").map(Number);
  const label = `${month}/${day}`;

  if (status === "overdue")
    return <span className="text-[11px] text-red-400 font-medium shrink-0">期限切れ {label}</span>;
  if (status === "today")
    return <span className="text-[11px] text-amber-500 font-medium shrink-0">今日 {label}</span>;
  return <span className="text-[11px] text-gray-400 shrink-0">{label}</span>;
}

export function TaskWidget() {
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  function toggle(id: number) {
    setTaskList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
          未完了タスク
        </p>
        <span className="text-[11px] text-gray-400">
          {taskList.filter((t) => !t.completed).length}件
        </span>
      </div>
      <div className="divide-y divide-gray-100">
        {taskList.map((task) => (
          <div key={task.id} className="flex items-center gap-3 py-2.5 hover:bg-gray-50 -mx-2 px-2 rounded transition-colors">
            <button
              onClick={() => toggle(task.id)}
              className={`w-[15px] h-[15px] rounded-sm border flex items-center justify-center shrink-0 transition-colors ${
                task.completed
                  ? "border-gray-300 bg-gray-200"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {task.completed && (
                <svg viewBox="0 0 10 8" className="w-2 h-1.5" fill="none">
                  <path d="M1 4l3 3 5-6" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <p
              className={`flex-1 text-[13px] leading-snug ${
                task.completed ? "line-through text-gray-400" : "text-gray-700"
              }`}
            >
              {task.title}
              {task.subtitle && (
                <span className="text-gray-400 ml-1">（{task.subtitle}）</span>
              )}
            </p>
            <DeadlineBadge deadline={task.deadline} />
          </div>
        ))}
      </div>
    </section>
  );
}
