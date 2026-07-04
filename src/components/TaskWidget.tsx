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

  if (status === "overdue") {
    return (
      <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 font-medium">
        期限切れ {label}
      </span>
    );
  }
  if (status === "today") {
    return (
      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 font-medium">
        今日 {label}
      </span>
    );
  }
  return (
    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200 font-medium">
      {label}
    </span>
  );
}

export function TaskWidget() {
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  function toggle(id: number) {
    setTaskList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  return (
    <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-card h-fit">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          未完了タスク
        </h2>
        <span className="text-xs text-gray-400">
          {taskList.filter((t) => !t.completed).length}件
        </span>
      </div>
      <ul className="space-y-3">
        {taskList.map((task) => (
          <li key={task.id} className="flex items-start gap-3">
            <button
              onClick={() => toggle(task.id)}
              className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                task.completed
                  ? "border-gray-300 bg-gray-200"
                  : "border-gray-300 hover:border-purple-400"
              }`}
              aria-label={task.completed ? "完了解除" : "完了にする"}
            >
              {task.completed && (
                <svg viewBox="0 0 10 8" className="w-2.5 h-2" fill="none">
                  <path
                    d="M1 4l3 3 5-6"
                    stroke="#6b7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium leading-snug ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {task.title}
                {task.subtitle && (
                  <span className="text-gray-400 font-normal ml-1">
                    （{task.subtitle}）
                  </span>
                )}
              </p>
            </div>
            <DeadlineBadge deadline={task.deadline} />
          </li>
        ))}
      </ul>
    </section>
  );
}
