import { useState } from "react";
import "./index.css";
import { Sidebar } from "@/components/Sidebar";
import { NewsWidget } from "@/components/NewsWidget";
import { TaskWidget } from "@/components/TaskWidget";
import { LinksWidget } from "@/components/LinksWidget";
import { WorkflowWidget } from "@/components/WorkflowWidget";
import { FileAgentPage } from "@/pages/FileAgentPage";
import { ChatPage } from "@/pages/ChatPage";
import { DocumentPage } from "@/pages/DocumentPage";
import { AnalysisPage } from "@/pages/AnalysisPage";
import { AudioPage } from "@/pages/AudioPage";
import { WebResearchPage } from "@/pages/WebResearchPage";

export type Page = "home" | "chat" | "document" | "analysis" | "audio" | "web-research" | "file-agent";

function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar currentPage={page} onNavigate={setPage} />
      <div className="w-px bg-gray-100 shrink-0" />
      <main className="flex-1 overflow-y-auto bg-white">
        {page === "home" && (
          <div className="max-w-4xl mx-auto px-12 py-10">
            <div className="mb-8">
              <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">ホーム</h1>
              <p className="text-[13px] text-gray-400 mt-0.5">2026年7月4日（土）</p>
            </div>
            <div className="mb-10"><NewsWidget /></div>
            <div className="border-t border-gray-100 mb-10" />
            <div className="grid grid-cols-3 gap-10 mb-10">
              <div className="col-span-2"><TaskWidget /></div>
              <div className="col-span-1"><LinksWidget /></div>
            </div>
            <div className="border-t border-gray-100 mb-10" />
            <WorkflowWidget onNavigate={setPage} />
          </div>
        )}
        {page === "chat"         && <ChatPage />}
        {page === "document"     && <DocumentPage />}
        {page === "analysis"     && <AnalysisPage />}
        {page === "audio"        && <AudioPage />}
        {page === "web-research" && <WebResearchPage />}
        {page === "file-agent"   && <FileAgentPage />}
      </main>
    </div>
  );
}

export default App;
