import "./index.css";
import { Sidebar } from "@/components/Sidebar";
import { NewsWidget } from "@/components/NewsWidget";
import { TaskWidget } from "@/components/TaskWidget";
import { LinksWidget } from "@/components/LinksWidget";
import { WorkflowWidget } from "@/components/WorkflowWidget";

function App() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f7f7fb" }}>
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-8 py-8 space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ホーム</h1>
            <p className="text-sm text-gray-400 mt-1">2026年7月4日（土）</p>
          </div>

          {/* Row 1: News */}
          <NewsWidget />

          {/* Row 2: Tasks + Links */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <TaskWidget />
            </div>
            <div className="col-span-1">
              <LinksWidget />
            </div>
          </div>

          {/* Row 3: Workflow quick access */}
          <WorkflowWidget />
        </div>
      </main>
    </div>
  );
}

export default App;
