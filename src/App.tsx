import "./index.css";
import { Sidebar } from "@/components/Sidebar";
import { NewsWidget } from "@/components/NewsWidget";
import { TaskWidget } from "@/components/TaskWidget";
import { LinksWidget } from "@/components/LinksWidget";
import { WorkflowWidget } from "@/components/WorkflowWidget";

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar />

      {/* Divider */}
      <div className="w-px bg-gray-100 shrink-0" />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-4xl mx-auto px-12 py-10">
          {/* Page title */}
          <div className="mb-8">
            <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">ホーム</h1>
            <p className="text-[13px] text-gray-400 mt-0.5">2026年7月4日（土）</p>
          </div>

          {/* Row 1: News */}
          <div className="mb-10">
            <NewsWidget />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mb-10" />

          {/* Row 2: Tasks + Links */}
          <div className="grid grid-cols-3 gap-10 mb-10">
            <div className="col-span-2">
              <TaskWidget />
            </div>
            <div className="col-span-1">
              <LinksWidget />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mb-10" />

          {/* Row 3: Workflow */}
          <WorkflowWidget />
        </div>
      </main>
    </div>
  );
}

export default App;
